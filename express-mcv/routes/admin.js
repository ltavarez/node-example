const express = require("express");
const path = require("path");
const router = express.Router();

const adminController = require("../controllers/AdminController");
const isAuth = require("../middleware/is-auth");

router.get("/add-product", isAuth, adminController.GetAddProduct);
router.post("/add-product", isAuth, adminController.PostAddProduct);
router.get("/products", isAuth, adminController.GetAdminProducts);
router.get("/edit-product/:productId", isAuth, adminController.GetEditProduct);
router.post("/edit-product", isAuth, adminController.PostEditProduct);
router.post("/delete-product", isAuth, adminController.DeleteProduct);

module.exports = router;
