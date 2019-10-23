let ObjectId = require("mongodb").ObjectID;
const path = require("path"),
  rootDir = path.dirname(process.mainModule.filename),
  db = require(path.join(rootDir, "util", "db", "mongo")).db(),
  users = db.collection("users");

  exports.findAll = async (userId) => {
    let mongoId = 0;
    try {
      mongoId = ObjectId(userId);
    } catch (e) {
      return null;
    }
    let user = await users.findOne({ _id: mongoId });

    let schedules = user.schedules;
    if (!schedules) schedules = [];
    return schedules
  }

exports.newSchedule = async (userId, newSchedule) => {
  let mongoId = 0;
  try {
    mongoId = ObjectId(userId);
  } catch (e) {
    return null;
  }
  let user = await users.findOne({ _id: mongoId });

  let schedules = user.schedules;
  if (!schedules) schedules = [];
  if (schedules.some(el => el.title === newSchedule.title)) return null;

  newSchedule._id = ObjectId();
  schedules.push(newSchedule);
  schedules.forEach(schedule => {
    if (schedule.collegeEvents) {
      schedule.collegeEvents.forEach(event => {
        if(!event._id)
          event._id = new ObjectId();
      });
    }
  });

  return users.findOneAndUpdate(
    { _id: mongoId },
    { $set: { schedules: schedules } },
    { returnOriginal:false, timestamps: true }
  );
};

exports.updateSchedule = async (userId, scheduleId, newSchedule) => {
  let mongoId = 0;
  try {
    mongoId = ObjectId(userId);
  } catch (e) {
    return null;
  }

  let user = await users.findOne({ _id: mongoId });
  if (!users) return null;

  let schedules = user.schedules;
  if (!schedules) return null;

  let index = schedules.findIndex(el => {
    return el._id.equals(ObjectId(scheduleId));
  });

  if (index === -1) return null;

  newSchedule._id = ObjectId(scheduleId);
  schedules[index] = newSchedule;
  
  let events = schedules[index].collegeEvents;
  if (events) {
    schedules[index].collegeEvents.forEach(event => {
      if(!event._id)
        event._id = new ObjectId();
    });
  }

  console.log("EVENTS",events);

  return users.findOneAndUpdate(
    { _id: mongoId },
    { $set: { schedules: schedules } },
    { returnOriginal:false, timestamps: true }
  );
};

exports.deleteSchedule = async (userId, scheduleId) => {
  let mongoId = 0;
  try {
    mongoId = ObjectId(userId);
  } catch (e) {
    return null;
  }
  let user = await users.findOne({ _id: mongoId });
  if (!users) return null;

  let schedules = user.schedules;
  if (!schedules) return null;

  let index = schedules.findIndex(el => {
    return el._id.equals(ObjectId(scheduleId));
  });
  if (index === -1) return null;

  schedules.splice(index, 1);

  return users.findOneAndUpdate(
    { _id: mongoId },
    { $set: { schedules: schedules } },
    { timestamps: true }
  );
};

exports.deleteAll = async userId => {
  let mongoId = 0;
  try {
    mongoId = ObjectId(userId);
  } catch (e) {
    return null;
  }
  let user = await users.findOne({ _id: mongoId });
  if (!users) return null;

  let schedules = user.schedules;
  if (!schedules) return null;

  return users.findOneAndUpdate(
    { _id: mongoId },
    { $set: { schedules: [] } },
    { timestamps: true }
  );
};
