const express = require("express");
const path = require("path");

const router = express.Router();

const productController = require("../controllers/ProductsController");

router.get("/", productController.GetProducts);

module.exports = router;