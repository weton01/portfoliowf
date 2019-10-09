const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const auth = require("../middlewares/authenctication");
const controller = require("../controllers/formation-controller");

const _ctrl = new controller();

router.get("/", _ctrl.getAll);
router.get("/:id", _ctrl.getById);
router.post(
  "/",
  [
    auth,
    check("nome", "Nome é obrigatório")
      .not()
      .isEmpty(),
    check("instituicao", "Instituicao é obrigatória")
      .not()
      .isEmpty(),
    check("formacao", "Formação é obrigatória")
      .not()
      .isEmpty(),
    check("periodo", "Periodo é obrigatório!")
      .not()
      .isEmpty(),
    check("info", "Informações são obrigatórias")
      .not()
      .isEmpty()
  ],
  _ctrl.post
);

router.put(
  "/:id",
  [
    check("instituicao", "Instituicao é obrigatória")
      .not()
      .isEmpty(),
    check("formacao", "Formação é obrigatória")
      .not()
      .isEmpty(),
    check("periodo", "Periodo é obrigatório!")
      .not()
      .isEmpty(),
    check("info", "Informações são obrigatórias")
      .not()
      .isEmpty()
  ],
  _ctrl.put
);

router.delete("/:id", auth, _ctrl.delete);

module.exports = router;
