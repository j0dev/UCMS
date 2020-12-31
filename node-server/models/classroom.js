const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Classroom = new Schema({
  name: String,
  row: Number,
  col: Number,
  comCount: Number,
  computerId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Computer" }]
});

Classroom.statics.create = function (name, row, col, comCount) {
  const classroom = new this({
    name,
    row,
    col,
    comCount
  });

  return classroom.save();
};

Classroom.statics.update = function (_id, name, row, col, comCount) {
  return this.findOneAndUpdate(
    { _id },
    { name: name, row: row, col: col, comCount: comCount },
    { new: true }
  );
};

Classroom.statics.findNameById = function (_id) {
  return this.findOne({
    _id
  }).exec();
};

Classroom.statics.findNameByIdComputerList = function (_id) {
  return this.findOne(
    {
      _id
    },
    { __v: false }
  )
    .populate("computerId")
    .populate("classRoomId")
    .exec();
};

Classroom.statics.findComputerProgramList = function (_id) {
  return this.find(
    {
      _id
    },
    { computerId: True }
  )
    .populate("computerId")
    .populate("classRoomId")
    .exec();
};
Classroom.statics.insertComputer = function (_id, computer) {
  return this.findByIdAndUpdate(
    { _id: _id },
    { $push: { computerId: computer } }
  );
};

module.exports = mongoose.model("Classroom", Classroom);
