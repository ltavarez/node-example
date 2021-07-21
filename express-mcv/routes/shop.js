const express = require("express");
const path = require("path");

const router = express.Router();

const ShopController = require("../controllers/ShopController");


router.get("/", ShopController.GetIndex);
router.get("/products", ShopController.GetProducts);
router.get("/cart", ShopController.GetCart);
router.get("/orders", ShopController.GetOrders);
router.get("/checkout", ShopController.GetCheckout);
router.post("/add-cart", ShopController.AddCart);
 
module.exports = router;