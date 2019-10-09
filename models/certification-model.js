const mongoose = require("mongoose");
const schema = mongoose.Schema;

const certificationModel = new schema({
  nome: { type: String, required: true, trim: true, index: true },
  info: { type: String, required: true },
  tempo: { type: String, required: true },
  plataforma: { type: String, required: true },
  certificado: { type: String },
  foto: { type: String },
  dataCreate: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Certification", certificationModel);
