"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../controllers/user-controller");
const auth = require("../middlewares/authenctication");
const { check } = require("express-validator");

const _ctrl = new controller();

router.get(
  "/auth",
  [
    check("email", "E-mail inválido!").isEmail(),
    check("senha", "Senha não pode ser nula").exists()
  ],
  _ctrl.auth
);
router.get("/", _ctrl.getAll);
router.get("/:id", auth, _ctrl.getById);
router.post(
  "/",
  [
    check("email", "E-mail inválido!").isEmail(),
    check("senha", "Senha não pode ser nula").exists(),
    check("senha", "Senha não pode ser vazia")
      .not()
      .isEmpty()
  ],
  _ctrl.post
);
router.put(
  "/:id",
  [
    auth,
    check("email", "E-mail inválido!").isEmail(),
    check("senha", "Senha não pode ser nula").exists(),
    check("senha", "Senha não pode ser vazia")
      .not()
      .isEmpty()
  ],
  _ctrl.update
);
router.delete("/:id", auth, _ctrl.delete);

module.exports = router;
