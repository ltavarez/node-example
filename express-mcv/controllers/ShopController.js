const Product = require("../models/Product");
const Cart = require("../models/Cart");

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
  Cart.getCart((cart) => {
    Product.GetAll((products) => {
      const cartProducts = [];
      for (product of products) {
        const cartProductData = cart.products.find(
          (prod) => prod.id === product.id
        );
        if (cartProductData) {
          cartProducts.push({
            productData: product,
            qty: cartProductData.qty,
          });
        }
      }
      res.render("shop/cart", {
        CartActive: true,
        pageTitle: "Your Cart",
        products: cartProducts,
        hasProducts: cartProducts.length > 0,
      });
    });
  });
};

exports.PostCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.GetById(prodId, (product) => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect("/cart");
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

exports.GetProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.GetById(prodId, (product) => {
    res.render("shop/product-detail", {
      prod: product,
      pageTitle: product.title,
      ProductsActive: true,
    });
  });
};
exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.GetById(prodId, (product) => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect("/cart");
  });
};

exports.GetCheckout = (req, res, next) => {
  res.render("shop/checkout", { CartActive: true, pageTitle: "Checkout page" });
};

exports.GetOrders = (req, res, next) => {
  res.render("shop/orders", { OrdersActive: true, pageTitle: "Orders page" });
};

exports.AddCart = (req, res, next) => {
  res.redirect("/");
};
