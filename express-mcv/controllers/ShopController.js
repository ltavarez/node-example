const Product = require("../models/Product");
const Cart = require("../models/Cart");

exports.GetIndex = (req, res, next) => {
  Product.GetAll()
    .then(([rows, fieldData]) => {
      res.render("shop/index", {
        pageTitle: "Home page",
        shopActive: true,
        prods: rows,
        hasProducts: rows.length > 0,
      });
    })
    .catch((err) => {
      console.log(err);
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
  Product.GetAll()
    .then(([rows, fieldData]) => {
      res.render("shop/product-list", {
        prods: rows,
        hasProducts: rows.length > 0,
        ProductsActive: true,
        pageTitle: "Products page",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.GetProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.GetById(prodId)
    .then(([product]) => {
      res.render("shop/product-detail", {
        prod: product[0],
        pageTitle: product[0].title,
        ProductsActive: true,
      });
    })
    .catch((err) => {
      console.log(err);
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
