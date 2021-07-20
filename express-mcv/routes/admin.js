const express = require("express");
const path = require("path");
const router = express.Router();

const adminController = require("../controllers/AdminController");


router.get("/add-product", adminController.GetAddProduct);
router.post("/add-product", adminController.PostAddProduct);

router.get("/products", adminController.GetAdminProducts);

module.exports = router;