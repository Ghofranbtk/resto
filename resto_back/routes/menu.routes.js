const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menu.controller");

router.post("/add-menu", menuController.create);
router.get("/", menuController.findAll);
router.get("/:id", menuController.findOne);
router.put("/:id", menuController.update);
router.delete("/:id", menuController.delete);

module.exports = router;
