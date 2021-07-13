
const path = require('path');

const express = require("express");
const app = express();

const adminRouter = require("./routes/admin");
const shopRouter = require("./routes/shop");

app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use(express.static(path.join(__dirname,"public")))

app.use("/admin", adminRouter);
app.use(shopRouter);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname,"views","404.html"));
});

app.listen(5001);
