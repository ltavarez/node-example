
const path = require('path');
const express = require("express");
const expressHbs = require("express-handlebars");
const app = express();

const adminRouter = require("./routes/admin");
const shopRouter = require("./routes/shop");


app.engine("hbs", expressHbs({layoutsDir:'views/layouts/',defaultLayout: 'main-layout',extname:'hbs'}));
app.set("view engine", "hbs");
app.set("views", "views");

app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use(express.static(path.join(__dirname,"public")))

app.use("/admin", adminRouter.route);
app.use(shopRouter);

app.use((req, res, next) => {
  res.status(404).render('404', {pageTitle: "Not found"});
});

app.listen(5001);
