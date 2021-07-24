const db = require("../util/database");

module.exports = class Product {
  constructor(id, title, imageUrl, price, description) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  Save() {
    if (this.id == null) {
      return db.execute(
        "insert into PRODUCTS (Title,Price,Description,ImageUrl) VALUES (?,?,?,?)",
        [this.title, this.price, this.description, this.imageUrl]
      );
    } else {
      return db.execute(
        "UPDATE PRODUCTS set Title = ? , Price = ? , Description = ? , ImageUrl = ? where Id = ?",
        [this.title, this.price, this.description, this.imageUrl, this.id]
      );
    }
  }

  static GetAll() {
    return db.execute("SELECT * FROM PRODUCTS");
  }

  static Delete(id) {
    return db.execute("DELETE from PRODUCTS where Id = ?", [id]);
  }

  static GetById(id) {
    return db.execute("SELECT * FROM PRODUCTS where Id = ?", [id]);
  }
};
