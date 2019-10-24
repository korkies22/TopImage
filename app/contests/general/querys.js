let ObjectId = require("mongodb").ObjectID;

const path = require("path"),
  rootDir = path.dirname(process.mainModule.filename),
  db = require(path.join(rootDir, "util", "db", "mongo")).db(),
  contests = db.collection("contests"),
  users = db.collection("users");

const getImages=(imageData)=>{
  return [];
  if(!imageData)
    return getUnsplashImages();
  
  return getCloudinaryImages(imageData);
}

exports.findAll = async () => {
  return await contests.find().toArray();
};

exports.newContest = async (userId,contest) => {
  let mongoId = 0;
  console.log("USER ID",userId);
  try {
    mongoId = ObjectId(userId);
  } catch (e) {
    console.log(e);
    return null;
  }
  let user = await users.findOne({ _id: mongoId });
  console.log("USER",user);
  if(user==null)
    return null;

  let images=getImages(contest.imageData);
  if(images==null)
    return null;

  contest.username=user.email;
  contest.images=images;
  contest.imageData=null;

  return await contests.insertOne(contest);
};

exports.deleteContest = async (userId,contestId) => {
  let mongoId = 0;
  console.log("USER ID",userId);
  try {
    mongoId = ObjectId(userId);
  } catch (e) {
    console.log(e);
    return null;
  }
  let user = await users.findOne({ _id: mongoId });
  console.log("USER",user);
  if(user==null)
    return null;
  
    try {
      mongoId = ObjectId(contestId);
    } catch (e) {
      console.log(e);
      return null;
    }

  return await contests.findOneAndDelete({_id:mongoId,username:user.email});
};


