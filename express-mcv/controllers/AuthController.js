const User = require("../models/User");

exports.GetLogin = (req, res, next) => {
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    loginCSS: true,
    loginActive: true,
    isAuthenticated: req.session.isLoggedIn,
  });
};

exports.PostLogin = (req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.session.isLoggedIn = true;
      req.session.user = user.dataValues;
      req.session.save((err) => {
        console.log(err);    
        res.redirect("/");
      });
    })
    .catch((err) => console.log(err));
};

exports.Logout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};
