const express = require("express");
const router = express.Router();
const controller = require("../controllers/product.controller");

router.post("/", controller.create);
router.get("/", controller.findAll);
router.put("/:id", controller.update);
router.delete("/:id", controller.softDelete);

module.exports = router;