const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Building = new Schema({
  name: String,
  classRoomId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Classroom" }],
});

Building.statics.create = function (name) {
  const building = new this({
    name,
  });
  //create user

  return building.save();
};

Building.statics.update = function (_id, name) {
  return this.findOneAndUpdate({ _id }, { name: name }, { new: true });
};

Building.statics.insertClassroom = function (_id, classroom) {
  return this.findByIdAndUpdate(
    { _id: _id },
    { $push: { classRoomId: classroom } }
  );
};

Building.statics.delete = function (_id) {
  return this.remove({ _id: _id });
};

Building.statics.findOneByBuilding = function (name) {
  return this.findOne({
    name,
  }).exec();
};

Building.statics.findOneByBuildingId = function (_id) {
  return this.findOne({
    _id: _id,
  }).exec();
};

module.exports = mongoose.model("Building", Building);
