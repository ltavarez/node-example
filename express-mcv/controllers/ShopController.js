const Product = require("../models/Product");

exports.GetIndex = (req, res, next) => {
  Product.GetAll(function (products) {
    res.render("shop/index", {
      pageTitle: "Home page",
      shopActive: true,
      prods: products,
      hasProducts: products.length > 0,
    });
  });
};

exports.GetCart = (req, res, next) => {
  res.render("shop/cart", { CartActive: true, pageTitle: "Cart page" });
};

exports.GetProducts = (req, res, next) => {
  Product.GetAll(function (products) {
    res.render("shop/product-list", {
      prods: products,
      hasProducts: products.length > 0,
      ProductsActive: true,
      pageTitle: "Products page",
    });
  });
};

exports.GetCheckout = (req, res, next) => {
  res.render("shop/checkout", { CartActive: true, pageTitle: "Checkout page" });
};
