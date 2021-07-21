const fs = require("fs");
const path = require("path");

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
  constructor(title, imageUrl, price, description) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  Save() {
    this.id = Math.random().toString();
    GetAllProductsFromFile((products) => {
      products.push(this);
      fs.writeFile(dataPath, JSON.stringify(products), function (error) {
        console.log(error);
      });
    });
  }

  static GetAll(cb) {
    GetAllProductsFromFile(cb);
  }

  static GetById(id,cb) {
    GetAllProductsFromFile(products=>{
      const product = products.find(p => p.id === id);
      cb(product);
    });
  }
};
