const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authenctication");
const { check } = require("express-validator");
const controller = require("../controllers/career-controller");

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
    check("tipo", "O tipo é obrigatório!")
      .not()
      .isEmpty(),
    check("corporacao", "Corporação é obrigatória!")
      .not()
      .isEmpty(),
    check("periodo", "Periodo é obrigatório")
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
    check("tipo", "O tipo é obrigatório!")
      .not()
      .isEmpty(),
    check("corporacao", "Corporação é obrigatória!")
      .not()
      .isEmpty(),
    check("periodo", "Periodo é obrigatório")
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
