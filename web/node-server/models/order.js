const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Order = new Schema({
  command: String,
  lockSecond: Number,
  start: String,
  end: String,
  second: String,
  isDone: { type: Boolean, default: false },
  isProgress: { type: Boolean, default: false },
  isError: { type: Boolean, default: false },
  orderNum: Number,
  createdAt: { type: Date, default: Date.now },
  finishedAt: { type: Date, default: null },
  mac: String,
  computerId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Computer" }]
});

Order.statics.findByMac = function (mac) {
  return this.find(
    {
      mac,
      isDone: false
    },
    {
      mac: false,
      isError: false,
      finishedAt: false,
      computerId: false,
      _id: false,
      createdAt: false,
      __v: false
    }
  ).exec();
};

Order.statics.findByMacCheck = function (mac) {
  return this.find(
    {
      mac,
      isProgress: false
    },
    {
      isDone: false,
      isProgress: false,
      isError: false,
      finishedAt: false,
      computerId: false,
      _id: false,
      createdAt: false,
      __v: false
    }
  ).exec();
};

Order.statics.check = function (mac) {
  return this.update({ mac }, { $set: { isProgress: true } });
};

Order.statics.done = function (mac, _id) {
  return this.findAndUpdate({ computerId: mac, _id: _id }, { isDone: true });
};

Order.statics.createStartApp = function ({ command, mac }) {
  console.log(command, mac, 1234);
  const order = new this({
    command,
    mac
  });
  return order.save();
};

Order.statics.createLockSec = function ({ command, mac, second }) {
  const order = new this({
    command,
    mac,
    second
  });
  return order.save();
};

Order.statics.createLockSec = function ({ command, mac, second }) {
  const order = new this({
    command,
    mac,
    second
  });
  return order.save();
};

Order.statics.createLock = function ({ command, mac, start, end }) {
  const order = new this({
    command,
    mac,
    start,
    end
  });
  return order.save();
};

module.exports = mongoose.model("Order", Order);
