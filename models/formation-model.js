"use strict";

const mongoose = require("mongoose");
const schema = mongoose.Schema;

const formationModel = new schema({
  nome: { type: String, required: true, trim: true, index: true },
  instituicao: { type: String, required: true },
  formacao: { type: String, required: true },
  periodo: { type: String, required: true },
  foto: { type: String },
  info: { type: Array },
  dataCreate: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Formation", formationModel);
