const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullName: String,
  id: {
    type: Number,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  profileImage: String,
  confirmCode: {
    type: Number,
    required: true,
  },
  confirmCodeExpDate: {
    type: Date,
    required: true,
  },
  isConfirm: {
    type: Boolean,
    default: false,
  },
});

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;