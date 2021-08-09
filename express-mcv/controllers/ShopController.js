const Product = require("../models/Product");
const Cart = require("../models/Cart");
const Order = require("../models/Order");

exports.GetIndex = (req, res, next) => {
  Product.findAll()
    .then((result) => {
      const products = result.map((result) => result.dataValues);
      res.render("shop/index", {
        pageTitle: "Home page",
        shopActive: true,
        prods: products,
        hasProducts: products.length > 0,
        isAuthenticated: req.isLoggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.GetCart = (req, res, next) => {
  req.user
    .getCart()
    .then((cart) => {
      cart.getProducts().then((result) => {
        const products = result.map((result) => result.dataValues);

        res.render("shop/cart", {
          CartActive: true,
          pageTitle: "Your Cart",
          products: products,
          hasProducts: products.length > 0,
          isAuthenticated: req.isLoggedIn,
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });

  /*
    
   */
};

exports.PostCart = (req, res, next) => {
  const prodId = req.body.productId;
  let fetchedCart;
  let newQuantity = 1;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId } });
    })
    .then((products) => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }

      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }
      return Product.findByPk(prodId);
    })
    .then((product) => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity },
      });
    })
    .then(() => {
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
};

exports.GetProducts = (req, res, next) => {
  Product.findAll()
    .then((result) => {
      const products = result.map((result) => result.dataValues);
      res.render("shop/product-list", {
        prods: products,
        hasProducts: products.length > 0,
        ProductsActive: true,
        pageTitle: "Products page",
        isAuthenticated: req.isLoggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.GetProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findOne({ where: { id: prodId } })
    .then((result) => {
      const product = result.dataValues;
      res.render("shop/product-detail", {
        prod: product,
        pageTitle: product.title,
        ProductsActive: true,
        isAuthenticated: req.isLoggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts({ where: { id: prodId } });
    })
    .then((products) => {
      if (products.length > 0) {
        product = products[0];
        return product.cartItem.destroy();
      } else {
        res.redirect("/cart");
      }
    })
    .then((result) => {
      res.redirect("/cart");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.GetCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    CartActive: true,
    pageTitle: "Checkout page",
    isAuthenticated: req.isLoggedIn,
  });
};

exports.PostOrder = (req, res, next) => {
  let fetchedCart;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts();
    })
    .then((products) => {
      return req.user
        .createOrder()
        .then((order) => {
          return order.addProducts(
            products.map((product) => {
              product.orderItem = { quantity: product.cartItem.quantity };
              return product;
            })
          );
        })
        .catch((err) => console.log(err));
    })
    .then((result) => {
      return fetchedCart.setProducts(null);
    })
    .then((result) => {
      res.redirect("/orders");
    })
    .catch((err) => console.log(err));
};

exports.GetOrders = (req, res, next) => {
  req.user
    .getOrders({ include: ["products"] })
    .then((result) => {
      const orders = result.map((result) => result.dataValues);

      res.render("shop/orders", {
        path: "/orders",
        pageTitle: "Your Orders",
        orders: orders,
        hasOrders: orders.length > 0,
        OrdersActive: true,
        isAuthenticated: req.isLoggedIn,
      });
    })
    .catch((err) => console.log(err));
};

exports.AddCart = (req, res, next) => {
  res.redirect("/");
};
