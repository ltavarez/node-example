const express = require("express");
const path = require("path");

const router = express.Router();

const ShopController = require("../controllers/ShopController");
const isAuth = require("../middleware/is-auth");

router.get("/", ShopController.GetIndex);
router.get("/products", ShopController.GetProducts);
router.get("/products/:productId", ShopController.GetProduct);
router.get("/cart", isAuth, ShopController.GetCart);
router.post("/cart", isAuth, ShopController.PostCart);
router.get("/orders", isAuth, ShopController.GetOrders);
router.post("/create-order", isAuth, ShopController.PostOrder);
router.get("/checkout", isAuth, ShopController.GetCheckout);
router.post("/add-cart", isAuth, ShopController.AddCart);
router.post("/cart-delete-item", isAuth, ShopController.postCartDeleteProduct);
 
module.exports = router;