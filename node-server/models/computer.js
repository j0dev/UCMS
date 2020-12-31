const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Computer = new Schema({
  mac: String,
  ip: String,
  pcNumber: Number,
  isPower: { type: Boolean, default: false },
  isLock: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, defulat: Date.now },
  classRoomId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Classroom" }],
  programList: [
    {
      name: String,
      createdAt: { type: Date, default: Date.now }
    }
  ],
  startProgramList: [
    {
      name: String,
      createdAt: { type: Date, default: Date.now }
    }
  ]
});

Computer.statics.create = function (mac, ip, pcNumber, classRoomId) {
  const computer = new this({
    mac,
    ip,
    pcNumber,
    classRoomId,
    isPower: true
  });
  return computer.save();
};

Computer.statics.findByMac = function (mac) {
  return this.findOne({
    mac
  }).exec();
};

Computer.statics.delete = function (mac) {
  return this.remove({ mac: mac });
};

module.exports = mongoose.model("Computer", Computer);
