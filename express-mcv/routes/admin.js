const express = require("express");
const path = require("path");
const router = express.Router();

const productController = require("../controllers/ProductsController");


router.get("/add-product", productController.GetAddProduct);
router.post("/add-product", productController.PostAddProduct);

module.exports = router;