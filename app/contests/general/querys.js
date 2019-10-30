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

  switch(event.operationType)
  {
    case "delete":
      data={
        action:ACTION_DELETE,
        payload:event.documentKey
      };
      id=data._id;
      break;
    case "insert":
      data={
        action:ACTION_INSERT,
        payload:event.fullDocument
      }
      id=data._id;
      break;
    case "update":
      data={
        action:ACTION_UPDATE,
        payload:{
          _id:event.documentKey._id,
          updatedFields:event.updateDescription.updatedFields  
        }
      };
      id=data._id;
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
const getImages=async (id,topic,images)=>{
  console.log("IMG",images);
  if(!images || images.length===0)
    return await getUnsplashImages(topic);
  if (images.length>=1 && images.length<=4)
    return await getCloudinaryImages(id,images);

  return null;
}

const addUserToAction=(action,email)=>{
  action=action ? action : [];
  let index=image.findIndex(el=>el===email);
  if(index!==-1)
  {
    action.splice(index,1);
  }
  else
  {
    action.push(email);
  }
  return action;
}

const isLater = (newDate, endDate) => {
  return newDate.getTime() <= endDate.getTime();
}

exports.findAll = async () => {
  return await contests.find().toArray();
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


  let images = await getImages(userId + Date.now(), contest.topic, contest.images);
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
  if (!contest.endDate || isLater(new Date(), contest.endDate)) {
    console.log("The given date happened after the endDate");
    return null;
  }

  let image = contest.images[index];
  if(isDislike)
  {
    image.dislikes = image.dislikes ? image.dislikes + 1 : 1;
    image.dislikedBy = addUserToAction(image.dislikedBy,user.email);  
  }
  else
  {
    image.likes = image.likes ? image.likes + 1 : 1;
    image.likedBy = addUserToAction(image.likedBy,user.email);   
  }

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


