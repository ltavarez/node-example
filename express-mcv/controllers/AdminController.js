const Product = require("../models/Product");

exports.GetAddProduct = (req, res, next) => {
  res.render("admin/save-product", {
    pageTitle: "Add product",
    AddProductActive: true,
    ProductCSS: true,
    formCSS: true,
    editMode: false,
  });
};

exports.PostAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  const product = new Product(null, title, imageUrl, price, description);
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

exports.GetEditProduct = (req, res, next) => {
  const productId = req.params.productId;
  const edit = req.query.edit;

  if (!edit) {
    return res.redirect("/");
  }

  Product.GetById(productId, (product) => {
    res.render("admin/save-product", {
      pageTitle: "edit product",
      ProductCSS: true,
      formCSS: true,
      editMode: edit,
      product: product,
    });
  });
};

exports.PostEditProduct = (req, res, next) => {
  const id = req.body.productId;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  const product = new Product(id, title, imageUrl, price, description);
  product.Save();

  res.redirect("/admin/products");
};

exports.DeleteProduct = (req, res, next) => {
   const id = req.body.productId;
   Product.Delete(id);
   res.redirect("/admin/products");

};
