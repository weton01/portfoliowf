"use strict";
const User = require("../models/user-model");
const md5 = require("md5");
const variables = require("../bin/configuration/variables");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

function userController() {}

userController.prototype.auth = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let authResponse = await User.findOne({
    email: req.body.email,
    senha: md5(req.body.senha)
  });

  if (authResponse) {
    return res.status(200).send({
      usuario: authResponse,
      token: jwt.sign({ user: authResponse }, variables.Security.secretKey)
    });
  } else {
    return res.status(404).json({
      errors: [{ msg: "Usuario e senha informado não foi encontrado" }]
    });
  }
};

userController.prototype.getAll = async (req, res) => {
  let response = await User.find();
  res.status(200).send(response);
};

userController.prototype.getById = async (req, res) => {
  let response = await User.findById(req.params.id);
  res.status(200).send(response);
};

userController.prototype.post = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let validEmail = await User.findOne({ email: req.body.email });

  if (validEmail)
    return res.status(400).json({ errors: [{ msg: "E-mail já cadastrado" }] });

  let user = new User(req.body);
  user.senha = md5(user.senha);
  let response = await user.save();
  res.status(201).send(response);
};

userController.prototype.update = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let validEmail = await User.findOne({ _id: req.params.id });

  let user = req.body;

  if (validEmail) user.email = validEmail.email;
  else
    return res
      .status(400)
      .json({ errors: [{ msg: "Usuário não encontrado" }] });

  user.senha = md5(user.senha);
  await User.findByIdAndUpdate(req.params.id, { $set: req.body });

  let response = await User.findById(req.params.id);
  res.status(202).send(response);
};

userController.prototype.delete = async (req, res) => {
  let response = await User.findOne({ _id: req.params.id });

  if (!response)
    return res
      .status(400)
      .json({ errors: [{ msg: "Usuário não encontrado" }] });

  await User.findByIdAndRemove(req.params.id);

  res.status(200).send("Usuário excluido com sucesso!");
};

module.exports = userController;
