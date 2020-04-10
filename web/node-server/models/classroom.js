const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Classroom = new Schema({
  name: String,
  row: Number,
  col: Number,
  computerId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Computer" }],
});

Classroom.statics.create = function (name, row, col) {
  const classroom = new this({
    name,
    row,
    col,
  });

  return classroom.save();
};

Classroom.statics.findNameByClassroom = function (name) {
  return this.findOne({
    name,
  }).exec();
};

module.exports = mongoose.model("Classroom", Classroom);
