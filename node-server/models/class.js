const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Class = new Schema({
  name: String,
  userId: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  childId: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  buildingId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Building" }],
  classRoomId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Classroom" }]
});

Class.statics.create = function (name, userId, buildingId, classRoomId) {
  const classN = new this({
    name,
    userId,
    buildingId,
    classRoomId
  });

  return classN
    .save()
    .then(
      classN
        .populate("userId", "username _id")
        .populate("buildingId", "name _id")
        .populate("classRoomId", "name _id")
        .execPopulate()
    );
};

Class.statics.update = function (_id, name) {
  return this.findOneAndUpdate({ _id }, { name: name }, { new: true });
};

Class.statics.findNameById = function (_id) {
  return this.findOne({
    _id
  }).exec();
};

Class.statics.findClassByName = function (name) {
  return this.findOne({
    name
  }).exec();
};

Class.statics.insertUser = function (_id, userId) {
  return this.findByIdAndUpdate({ _id }, { $push: { userId: userId } });
};

module.exports = mongoose.model("Class", Class);
