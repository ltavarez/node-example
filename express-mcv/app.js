const path = require("path");
const express = require("express");
const expressHbs = require("express-handlebars");
const app = express();

const adminRouter = require("./routes/admin");
const shopRouter = require("./routes/shop");
const authRouter = require("./routes/auth");
const errorController = require("./controllers/ErrorController");

const sequelize = require("./util/database");
const Product = require("./models/Product");
const User = require("./models/User");
const Cart = require("./models/Cart");
const CartItem = require("./models/CartItem");
const Order = require("./models/Order");
const OrderItem = require("./models/OrderItem");
const session = require("express-session");
const csrf = require("csurf");
const csrfProtection = csrf();

const flash = require("connect-flash");

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

app.use(
  session({ secret: "anything", resave: true, saveUninitialized: false })
);

app.use(csrfProtection);

app.use(flash());

app.use((req, res, next) => {
  if (!req.session) {
    return next();
  }
  if (!req.session.user) {
    return next();
  }
  User.findByPk(req.session.user.id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use((req, res, next) => {
  const errors = req.flash("errors");
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  res.locals.errorMessages = errors;
  res.locals.hasErrorMessages = errors.length > 0;
  next();
});

app.use("/admin", adminRouter);
app.use(shopRouter);
app.use(authRouter);

app.use(errorController.Get404);

Product.belongsTo(User, { constraint: true, onDelete: "CASCADE" });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });

sequelize
  .sync()
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
