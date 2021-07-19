const products = [];

exports.GetAddProduct = (req, res, next) => {
  res.render("add-product", {
    pageTitle: "Add product",
    productActive: true,
    ProductCSS: true,
    formCSS: true,
  });
};

exports.PostAddProduct = (req, res, next) => {
  products.push({ title: req.body.title });
  res.redirect("/");
};

exports.GetProducts = (req, res, next) => { 
  res.render("shop", {
    prods: products,
    hasProducts: products.length > 0,
    shopActive: true,
  });
};
