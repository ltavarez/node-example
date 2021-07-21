const Product = require("../models/Product");

exports.GetAddProduct = (req, res, next) => {
  res.render("admin/save-product", {
    pageTitle: "Add product",
    AddProductActive: true,
    ProductCSS: true,
    formCSS: true,
  });
};

exports.PostAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  const product = new Product(title, imageUrl, price, description);
  product.Save();
  res.redirect("/");
};

exports.GetAdminProducts = (req, res, next) => {
  Product.GetAll(function (products) {
    res.render("admin/product-list", {
      pageTitle: "Admin products",
      prods: products,
      AdminProductsActive: true,
      hasProducts: products.length > 0,
    });
  });
};

exports.EditProduct = (req, res, next) => {
  const productId = req.params.productId;
  const edit = req.query.edit;
 
  if (!edit) {
    return res.redirect("/");
  }
  res.render("admin/save-product", {
    pageTitle: "edit product",
    ProductCSS: true,
    formCSS: true,
    editMode: edit
  });
};

exports.DeleteProduct = (req, res, next) => {
  res.redirect("/admin/products");
};
