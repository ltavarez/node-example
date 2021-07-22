const fs = require("fs");
const path = require("path");
const Cart = require("./Cart");

const dataPath = path.join(
  path.dirname(require.main.filename),
  "data",
  "products.json"
);

const GetAllProductsFromFile = function (cb) {
  fs.readFile(dataPath, function (error, data) {
    if (error) {
      cb([]);
    } else {
      cb(JSON.parse(data));
    }
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, price, description) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  Save() {
    GetAllProductsFromFile((products) => {
      if (this.id) {
        const existingProduct = products.findIndex(
          (prod) => prod.id === this.id
        );

        products[existingProduct] = this;
        fs.writeFile(dataPath, JSON.stringify(products), function (error) {
          console.log(error);
        });
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(dataPath, JSON.stringify(products), function (error) {
          console.log(error);
        });
      }
    });
  }

  static GetAll(cb) {
    GetAllProductsFromFile(cb);
  }

  static Delete(id) {
    GetAllProductsFromFile((products) => {
      const product = products.find((prod) => prod.id === id);
      const newProductsList = products.filter((p) => p.id !== id);
      fs.writeFile(dataPath, JSON.stringify(newProductsList), function (error) {
        Cart.deleteProduct(id, product.price);
      });
    });
  }

  static GetById(id, cb) {
    GetAllProductsFromFile((products) => {
      const product = products.find((p) => p.id === id);
      cb(product);
    });
  }
};
