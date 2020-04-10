const mongoose = require("mongoose");
const Schema = mongoose.Sechema;

const Computer = new Schema({
  pos: Number,
  isPower: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, defulat: Date.now },
  programList: [
    {
      name: String,
      createdAt: { type: Date, default: Date.now },
    },
  ],
});
