"use strict";

const Formation = require("../models/formation-model");
const { validationResult } = require("express-validator");

function formationController() {}

formationController.prototype.getAll = async (req, res) => {
  let response = await Formation.find();

  return res.status(200).send(response);
};

formationController.prototype.getById = async (req, res) => {
  let response = await Formation.findOne({ _id: req.params.id });

  if (!response)
    return res.status(404).json({
      errors: [{ msg: "Formação não encontrada" }]
    });

  return res.status(200).send(response);
};

formationController.prototype.post = async (req, res) => {
  let errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let verifyName = await Formation.findOne({ nome: req.body.nome });

  if (verifyName)
    return res.status(404).json({
      errors: [{ msg: "Formação já cadastrada" }]
    });

  let formation = new Formation(req.body);
  let response = await formation.save();
  return res.status(201).send(response);
};

formationController.prototype.put = async (req, res) => {
  let errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let verifyName = await Formation.findOne({ _id: req.params.id });

  if (!verifyName)
    return res.status(404).json({
      errors: [{ msg: "Formação não encontrada" }]
    });

  req.body.nome = verifyName.nome;

  await Formation.findOneAndUpdate({ _id: req.params.id }, { $set: req.body });

  let response = await Formation.findOne({ _id: req.params.id });

  res.status(202).send(response);
};

formationController.prototype.delete = async (req, res) => {
  let verifyId = await Formation.findOne({ _id: req.params.id });

  if (!verifyId)
    return res.status(404).json({
      errors: [{ msg: "Formação não encontrada" }]
    });

  await Formation.findOneAndRemove({ _id: req.params.id });

  res.status(200).send("Formação excluida com sucesso!");
};

module.exports = formationController;
