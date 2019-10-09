const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authenctication");
const { check } = require("express-validator");
const controller = require("../controllers/certification-controller");

const _ctrl = new controller();

router.get("/", _ctrl.getAll);
router.get("/:id", _ctrl.getById);
router.post(
  "/",
  [
    auth,
    check("nome", "Nome é obrigatório!")
      .not()
      .isEmpty(),
    check("plataforma", "Plataforma é obrigatória!")
      .not()
      .isEmpty(),
    check("tempo", "Tempo é obrigatório")
      .not()
      .isEmpty(),
    check("info", "Informação é obrigatória")
      .not()
      .isEmpty()
  ],
  _ctrl.post
);
router.put(
  "/:id",
  [
    auth,
    check("plataforma", "Plataforma é obrigatória!")
      .not()
      .isEmpty(),
    check("tempo", "Tempo é obrigatório")
      .not()
      .isEmpty(),
    check("info", "Informação é obrigatória")
      .not()
      .isEmpty()
  ],
  _ctrl.put
);
router.delete("/:id", auth, _ctrl.delete);

module.exports = router;
