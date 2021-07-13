const express = require("express");
const path = require("path");
const rootPath = require('../util/root-path');

const router = express.Router();

const products = [];

router.get("/add-product", (req, res, next) => {
  res.render("add-product", {   
    pageTitle: "Add product",
    productActive: true,
    ProductCSS: true,
    formCSS: true
  });
});

router.post("/add-product", (req, res, next) => {
  products.push({title: req.body.title});
  res.redirect("/");
});

exports.route = router;
exports.products = products;
