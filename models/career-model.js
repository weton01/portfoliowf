"use strict";

const mongoose = require("mongoose");
const schema = mongoose.Schema;

const careerModel = new schema({
  nome: { type: String, required: true, trim: true, index: true },
  tipo: { type: String, required: true },
  corporacao: { type: String, required: true },
  periodo: { type: String, required: true },
  foto: { type: String },
  info: { type: Array, required: true },
  dataCreate: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Career", careerModel);
