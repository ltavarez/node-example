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

  Product.create({
    title: title,
    imageUrl: imageUrl,
    price: price,
    description: description,
  })
    .then((result) => {
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.GetAdminProducts = (req, res, next) => {
  Product.findAll()
    .then((result) => {
      const products = result.map((result) => result.dataValues);

      res.render("admin/product-list", {
        pageTitle: "Admin products",
        prods: products,
        AdminProductsActive: true,
        hasProducts: products.length > 0,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.GetEditProduct = (req, res, next) => {
  const productId = req.params.productId;
  const edit = req.query.edit;

  if (!edit) {
    return res.redirect("/");
  }

  Product.findOne({ where: { id: productId } })
    .then((result) => {
      const product = result.dataValues;

      if (!product) {
        return res.redirect("/");
      }
      res.render("admin/save-product", {
        pageTitle: "edit product",
        ProductCSS: true,
        formCSS: true,
        editMode: edit,
        product: product,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.PostEditProduct = (req, res, next) => {
  const id = req.body.productId;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  Product.update(
    {
      title: title,
      imageUrl: imageUrl,
      price: price,
      description: description,
    },
    { where: { id: id } }
  )
    .then((result) => {
      return res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.DeleteProduct = (req, res, next) => {
  const id = req.body.productId;

  Product.destroy({ where: { id: id } })
    .then((result) => {
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};
