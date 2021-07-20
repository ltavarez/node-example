const express = require("express");
const path = require("path");

const router = express.Router();

const ShopController = require("../controllers/ShopController");


router.get("/", ShopController.GetIndex);
router.get("/products", ShopController.GetProducts);
router.get("/cart", ShopController.GetCart);
router.get("/checkout", ShopController.GetCheckout);
 
module.exports = router;