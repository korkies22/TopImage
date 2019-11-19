// Libs
let ObjectId = require("mongodb").ObjectID;
const path = require("path"),
  rootDir = path.dirname(process.mainModule.filename),
  db = require(path.join(rootDir, "util", "db", "mongo")).db(),
  contests = db.collection("contests"),
  users = db.collection("users");

const { getUnsplashImages } = require("../../../util/images/unsplash");
const { getCloudinaryImages } = require("../../../util/images/cloudinary");

const { emitEvent } = require("../../../util/socketio/socketio");
const { CONTEST_EVENT, CONTEST_DETAIL_EVENT } = require("../../../util/socketio/events");
const { ACTION_INSERT, ACTION_DELETE, ACTION_UPDATE } = require("../../../util/socketio/events");
// Define change stream
const changeStream = contests.watch();
// start listen to changes
changeStream.on("change", function (event) {

  console.log("Change", JSON.stringify(event));
  let data = { "error": "There was no registered CRUD change" };
  let id;

  switch (event.operationType) {
    case "delete":
      data = {
        action: ACTION_DELETE,
        payload: event.documentKey
      };
      id = data._id;
      break;
    case "insert":
      data = {
        action: ACTION_INSERT,
        payload: event.fullDocument
      }
      id = data._id;
      break;
    case "update":
      data = {
        action: ACTION_UPDATE,
        payload: {
          id: event.documentKey._id,
          ...event.updateDescription.updatedFields
        }
      };
      id = data._id;
      break;
    default:
      break;
  }

  emitEvent(CONTEST_EVENT, data);
  if (id)
    emitEvent(`${CONTEST_DETAIL_EVENT}-${id}`, data);
});

//------------
// METHODS
//------------
const getImages = async (id, topic,limit, images) => {
  let list=[];
  if (images.length >= 1)
  {
    list=list.concat(await getCloudinaryImages(id,images));
  }

  if(limit && topic && !isNaN(limit))
  {
    list=list.concat(await getUnsplashImages(limit,topic));
  }

  return list;
}

const addUserToAction = (action, index, email) => {
  if (index !== -1) {
    action.splice(index, 1);
  }
  else {
    action.push(email);
  }
  return action;
}

const isLater = (endDate) => {
  let newDate = new Date();
  return endDate.getTime() <= newDate.getTime();
}

const setupImage = (image, email, isDislike) => {
  let index;
  console.log('IMAGE',image)
  console.log('EMAIL',email)
  if (isDislike) {
    if (!image.dislikedBy) image.dislikedBy = [];
    if (!image.dislikes) image.dislikes = 0;

    index = image.dislikedBy.findIndex(el => el === email)
    image.dislikes = index !== -1 ? image.dislikes - 1 : image.dislikes + 1;
    image.dislikedBy = addUserToAction(image.dislikedBy, index, email);

    const index2 = (image.likedBy || []).findIndex(el => el === email)
    if (index2 !== -1) {
      image.likes--;
      image.likedBy.splice(index, 1);
    }
  }
  else {
    if (!image.likedBy) image.likedBy = [];
    if (!image.likes) image.likes = 0;

    index = image.likedBy.findIndex(el => el === email)
    image.likes = index !== -1 ? image.likes - 1 : image.likes + 1;
    image.likedBy = addUserToAction(image.likedBy, index, email);

    const index2 = (image.dislikedBy || []).findIndex(el => el === email)
    if (index2 !== -1) {
      image.dislikes--;
      image.dislikedBy.splice(index, 1);
    }
  }

  return image;
}

exports.findAll = async () => {
  return await contests.find().sort({ endDate: 1 }).toArray();
};

exports.findContest = async (id) => {
  return await contests.findOne({ "_id": new ObjectId(id) });
};

exports.newContest = async (userId, contest) => {
  let mongoId = 0;
  console.log("USER ID", userId);
  try {
    mongoId = ObjectId(userId);
  } catch (e) {
    console.log(e);
    return null;
  }

  let user = await users.findOne({ _id: mongoId });
  console.log("USER", user);
  if (user == null)
    return null;


  let images = await getImages(userId + Date.now(), contest.topic, contest.limit, contest.images);
  if (images == null)
    return null;

  console.log("IMG");
  contest.username = user.email;
  contest.images = images;
  contest.endDate = new Date(contest.endDate);

  return await contests.insertOne(contest);
};

exports.likeContest = async (userId, contestId, index, isDislike) => {
  let mongoId = 0;
  console.log("USER ID", userId);
  try {
    mongoId = ObjectId(userId);
  } catch (e) {
    console.log(e);
    return null;
  }
  let user = await users.findOne({ _id: mongoId });
  console.log("USER", user);
  if (user == null)
    return null;

  try {
    mongoId = ObjectId(contestId);
  } catch (e) {
    console.log(e);
    return null;
  }

  let contest = await contests.findOne({ _id: mongoId });
  if (!contest.endDate || isLater(contest.endDate)) {
    console.log("Se está intentando darle like/dislike a una imagen después de que el concurso se acabara");
    return null;
  }

  contest.images[index] = setupImage(contest.images[index], user.email, isDislike);

  return await contests.findOneAndUpdate({ _id: mongoId }, {
    $set: {
      images: contest.images
    }
  }, { returnOriginal: false });

}

exports.deleteContest = async (userId, contestId) => {
  let mongoId = 0;
  console.log("USER ID", userId);
  try {
    mongoId = ObjectId(userId);
  } catch (e) {
    console.log(e);
    return null;
  }
  let user = await users.findOne({ _id: mongoId });
  console.log("USER", user);
  if (user == null)
    return null;

  try {
    mongoId = ObjectId(contestId);
  } catch (e) {
    console.log(e);
    return null;
  }

  return await contests.findOneAndDelete({ _id: mongoId, username: user.email });
};


