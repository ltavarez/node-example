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

app.use("/admin", adminRouter);
app.use(shopRouter);

app.use(errorController.Get404);

Product.belongsTo(User,{constraint: true, onDelete:'CASCADE'});
User.hasMany(Product);

sequelize
  .sync({force: true})
  .then((result) => {
    app.listen(5001);
  })
  .catch((err) => {
    console.log(err);
  });
