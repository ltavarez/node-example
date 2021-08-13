const User = require("../models/User");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const { Op } = require("sequelize");


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "phpitladiplomado@gmail.com",
    pass: "#Querty123",
  },
});

exports.GetLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Login",
    loginCSS: true,
    loginActive: true,
  });
};

exports.PostLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ where: { email: email } })
    .then((user) => {
      if (!user) {
        req.flash("errors", "email is invalid ");
        return res.redirect("/login");
      }

      bcrypt
        .compare(password, user.password)
        .then((result) => {
          if (result) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save((err) => {
              console.log(err);
              res.redirect("/");
            });
          }
          req.flash("errors", "password is invalid");
          res.redirect("/login");
        })
        .catch((err) => {
          console.log(err);
          req.flash(
            "errors",
            "An error has occurred contact the administrator."
          );
          res.redirect("/login");
        });
    })
    .catch((err) => {
      console.log(err);
      req.flash("errors", "An error has occurred contact the administrator.");
      res.redirect("/login");
    });
};

exports.Logout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};

exports.GetSignup = (req, res, next) => {
  res.render("auth/signup", {
    pageTitle: "Signup",
    SignupActive: true,
  });
};

exports.PostSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  User.findOne({ where: { email: email } })
    .then((user) => {
      if (user) {
        req.flash(
          "errors",
          "email exits already, please pick a different one "
        );
        return res.redirect("/signup");
      }

      bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          User.create({ email: email, password: hashedPassword })
            .then((user) => {
              return user.createCart();
            })
            .then((cart) => {
              res.redirect("/login");
              return transporter.sendMail({
                from: "phpitladiplomado@gmail.com",
                to: "leonardotv.93@gmail.com",
                subject: `Welcome`,
                html: "<h1> You have successfully registered </h1>",
              });
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.GetReset = (req, res, next) => {
  res.render("auth/reset", {
    pageTitle: "Reset",
    ResetActive: true,
  });
};

exports.PostReset = (req, res, next) => {
  const email = req.body.email;

  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
      return res.redirect("/reset");
    }
    const token = buffer.toString("hex");
    User.findOne({ where: { email: email } })
      .then((user) => {
        if (!user) {
          req.flash("errors", "No account with that email found.");
          return res.redirect("/reset");
        }
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000;
        return user.save();
      })
      .then((result) => {
        res.redirect("/");
        transporter.sendMail({
          to: email,
          from: "phpitladiplomado@gmail.com",
          subject: "Password reset",
          html: `
            <p>You requested a password reset</p>
            <p>Click this <a href="http://localhost:3000/reset/${token}">link</a> to set a new password.</p>
          `,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

exports.GetNewPassword = (req, res, next) => {
  const token = req.params.token;
  User.findOne( {where: { resetToken: token, resetTokenExpiration: {[Op.gte]: Date.now() } }})
    .then((user) => {
      let message = req.flash("error");
      if (message.length > 0) {
        message = message[0];
      } else {
        message = null;
      }
      res.render("auth/new-password", {       
        pageTitle: "New Password",
        errorMessage: message,
        userId: user.id,
        passwordToken: token,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.PostNewPassword = (req, res, next) => {
  const newPassword = req.body.password;
  const userId = req.body.userId;
  const passwordToken = req.body.passwordToken;
  let resetUser;

  User.findOne({
    where: {
      resetToken: passwordToken,
      resetTokenExpiration: { [Op.gte]: Date.now() },
      id: userId,
    },
  })
    .then((user) => {
      resetUser = user;
      return bcrypt.hash(newPassword, 12);
    })
    .then((hashedPassword) => {
      resetUser.password = hashedPassword;
      resetUser.resetToken = null;
      resetUser.resetTokenExpiration = null;
      return resetUser.save();
    })
    .then((result) => {
      res.redirect("/login");
    })
    .catch((err) => {
      console.log(err);
    });
};
