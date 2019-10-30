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
const { CONTEST_ADD_EVENT, CONTEST_DELETE_EVENT, CONTEST_DETAIL_EVENT } = require("../../../util/socketio/events");
// Define change stream
const changeStream = contests.watch();
// start listen to changes
changeStream.on("change", function (event) {

  console.log("Change", JSON.stringify(event));
  let data = { "error": "There was no registered CRUD change" };
  let id;
  let channel;

  if (event.fullDocument) {
    channel = CONTEST_ADD_EVENT;
    data = event.fullDocument;
    id = data._id;
  }
  else if (event.documentKey) {
    channel = CONTEST_DELETE_EVENT;
    data = event.documentKey;
    id = data._id;
  }

  emitEvent(channel, data);
  if (id)
    emitEvent(`${CONTEST_DETAIL_EVENT}-${id}`, data);
});

//------------
// METHODS
//------------
<<<<<<< HEAD
const getImages=async (id,topic,images)=>{
  if(!images)
    return await getUnsplashImages(topic);
  if (images.length>=1 && images.length<=4)
    return await getCloudinaryImages(id,images);

  return null;
=======
const getImages = async (id, topic, images) => {
  if (!images || images.length < 4)
    return await getUnsplashImages(topic);

  return await getCloudinaryImages(id, images);
>>>>>>> 1e765959e4002480b855f1c502452a778ee99c55
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

exports.likeContest = async (userId, contestId, index) => {
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

  image.likes = image.likes ? image.likes + 1 : 1;
  image.likedBy = image.likedBy ? image.likedBy : [];
  console.log(image.likedBy);

  let el = {};
  for (let i = 0; i < image.likedBy.length; i++) {
    el = image.likedBy[i];
    if (el === user.email) {
      return null;
    }
  }

  image.likedBy.push(user.email);

  console.log(contest.images, image);

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


