const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const crypto = require("crypto");
const config = require("../config");

const User = new Schema({
  userid: String,
  password: String,
  username: String,
  type: Number,
  classRoomId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Classroom" }],
  parentId: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  childId: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  // 0 -> less admin
  // 1 -> professor
  // 2 -> student
  isActive: { type: Boolean, default: false },
  // 0 -> no use
  // 1 -> use
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, defulat: Date.now },
  isAdmin: { type: Boolean, default: false },
  // 0 -> not admin
  // 1 -> admin
});

User.statics.create = function (userid, password, username, type) {
  const encrypted = crypto
    .createHmac("sha512", config.secret)
    .update(password)
    .digest("base64");
  // password hash

  const user = new this({
    userid,
    username,
    type,
    password: encrypted,
  });
  //create user

  return user.save();
};

User.statics.findOneByUserid = function (userid) {
  //userid 값을 사용하여 유저를 찾음
  return this.findOne({
    userid,
  }).exec();
};

User.methods.verify = function (password) {
  //비밀번호가 일치하지 확인
  const encrypted = crypto
    .createHmac("sha512", config.secret)
    .update(password)
    .digest("base64");

  return this.password === encrypted;
};

User.methods.assignAdmin = function () {
  this.isAdmin = true;
  return this.save();
};

module.exports = mongoose.model("User", User);
