const express = require("express");
const path = require("path");
const rootPath = require("../util/root-path");

const router = express.Router();

const adminData = require("./admin");

router.get("/", (req, res, next) => {
  console.log("shop.js", adminData.products);
  res.render("shop", {
    prods: adminData.products,
    hasProducts: adminData.products.length > 0,
    shopActive:true
  });
});

module.exports = router;
