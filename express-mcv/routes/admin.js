const express = require("express");
const path = require("path");
const router = express.Router();

const adminController = require("../controllers/AdminController");


router.get("/add-product", adminController.GetAddProduct);
router.post("/add-product", adminController.PostAddProduct);
router.get("/products", adminController.GetAdminProducts);
router.get("/edit-product", adminController.EditProduct);
router.post("/delete-product", adminController.DeleteProduct);

module.exports = router;