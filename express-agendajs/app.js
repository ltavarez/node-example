const express = require("express");
const path = require("path");

const homeRoute = require("./routes/home");

const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname,"public")));

app.use(homeRoute);

app.use((req,res,next)=>{

    res.sendFile(path.join(__dirname,"views","404.html"))

});


app.listen(5001);
