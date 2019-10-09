"use strict";

const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userModel = new schema({
  email: { type: String, required: true, trim: true, index: true },
  senha: { type: String, required: true },
  dataCreate: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", userModel);
