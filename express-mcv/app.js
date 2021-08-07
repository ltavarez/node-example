const path = require("path");
const express = require("express");
const expressHbs = require("express-handlebars");
const app = express();

const adminRouter = require("./routes/admin");
const shopRouter = require("./routes/shop");
const errorController = require("./controllers/ErrorController");

const sequelize = require("./util/database");
const Product = require("./models/Product");
const User = require("./models/User");
const Cart = require("./models/Cart");
const CartItem = require("./models/CartItem");
const Order = require("./models/Order");
const OrderItem = require("./models/OrderItem");

app.engine(
  "hbs",
  expressHbs({
    layoutsDir: "views/layouts/",
    defaultLayout: "main-layout",
    extname: "hbs",
  })
);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use(express.static(path.join(__dirname, "public")));
app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use("/admin", adminRouter);
app.use(shopRouter);

app.use(errorController.Get404);

Product.belongsTo(User, { constraint: true, onDelete: "CASCADE" });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, {through: CartItem});
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });

sequelize
  .sync(  )
  .then((result) => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "Leo", email: "leonardotv.93@gmail.com" });
    }
    return user;
  })
  .then((user) => {
     return user.createCart();
  }).then((cart)=>{
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
