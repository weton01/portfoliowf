"use strict";

const Career = require("../models/career-model");
const { validationResult } = require("express-validator");

function careerControler() {}

careerControler.prototype.getAll = async (req, res) => {
  let response = await Career.find();

  return res.status(200).send(response);
};

careerControler.prototype.getById = async (req, res) => {
  let response = await Career.findOne({ _id: req.params.id });

  if (!response)
    return res.status(404).json({
      errors: [{ msg: "Carreira não encontrada" }]
    });

  return res.status(200).send(response);
};

careerControler.prototype.post = async (req, res) => {
  let errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let verifyName = await Career.findOne({ nome: req.body.nome });

  if (verifyName)
    return res.status(404).json({
      errors: [{ msg: "Carreira já cadastrada" }]
    });

  let career = new Career(req.body);
  let response = await career.save();
  return res.status(201).send(response);
};

careerControler.prototype.put = async (req, res) => {
  let errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let verifyName = await Career.findOne({ _id: req.params.id });

  if (!verifyName)
    return res.status(404).json({
      errors: [{ msg: "Carreira não encontrada" }]
    });

  req.body.nome = verifyName.nome;

  await Career.findByIdAndUpdate(req.params.id, { $set: req.body });

  let response = await Career.findOne({ _id: req.params.id });

  return res.status(202).send(response);
};

careerControler.prototype.delete = async (req, res) => {
  let response = await Career.findOne({ _id: req.params.id });

  if (!response)
    return res.status(404).json({
      errors: [{ msg: "Carreira não encontrada" }]
    });

  await Career.findByIdAndRemove(req.params.id);

  return res.status(200).send("Carreira excluida com sucesso!");
};

module.exports = careerControler;
