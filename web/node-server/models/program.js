const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Program = new Schema({
  name: String,
  createdAt: { type: Date, default: Date.now }
});

Program.statics.create = function (name) {
  const program = new this({
    name
  });
  return program.save();
};

Program.statics.list = function () {
  return this.find().exec();
};

Program.statics.delete = function (_id) {
  return this.remove({ _id });
};

Program.statics.update = function (_id, name) {
  return this.findOneAndUpdate({ _id }, { name: name }, { new: true });
};

module.exports = mongoose.model("Program", Program);
