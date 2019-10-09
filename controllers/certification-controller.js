"use strict";

const Certification = require("../models/certification-model");
const { validationResult } = require("express-validator");

function certificationController() {}

certificationController.prototype.getAll = async (req, res) => {
  let response = await Certification.find({
    $query: {},
    $orderby: { dataCreate: 1 }
  });

  return res.status(200).send(response);
};

certificationController.prototype.getById = async (req, res) => {
  let response = await Certification.findOne({ _id: req.params.id });

  if (!response)
    return res.status(404).json({
      errors: [{ msg: "Certificação não encontrada" }]
    });

  return res.status(200).send(response);
};

certificationController.prototype.post = async (req, res) => {
  let errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let verifyName = await Certification.findOne({ nome: req.body.nome });

  if (verifyName)
    return res.status(404).json({
      errors: [{ msg: "Certificação já cadastrada" }]
    });

  let certification = new Certification(req.body);
  let response = await certification.save();
  return res.status(201).send(response);
};

certificationController.prototype.put = async (req, res) => {
  let errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let verifyName = await Certification.findOne({ _id: req.params.id });

  if (!verifyName)
    return res.status(404).json({
      errors: [{ msg: "Certificação não encontrada" }]
    });

  req.body.nome = verifyName.nome;

  await Certification.findByIdAndUpdate(req.params.id, { $set: req.body });

  let response = await Certification.findOne({ _id: req.params.id });

  return res.status(202).send(response);
};

certificationController.prototype.delete = async (req, res) => {
  let response = await Certification.findOne({ _id: req.params.id });

  if (!response)
    return res.status(404).json({
      errors: [{ msg: "Certificação não encontrada" }]
    });

  await Certification.findByIdAndRemove(req.params.id);

  return res.status(200).send("Certificação excluida com sucesso!");
};

module.exports = certificationController;
