const express = require("express");
const path = require("path");
const router = express.Router();

const adminController = require("../controllers/AdminController");

router.get("/add-product", adminController.GetAddProduct);
router.post("/add-product", adminController.PostAddProduct);
router.get("/products", adminController.GetAdminProducts);
router.get("/edit-product/:productId", adminController.GetEditProduct);
router.post("/edit-product", adminController.PostEditProduct);
router.post("/delete-product", adminController.DeleteProduct);

module.exports = router;
