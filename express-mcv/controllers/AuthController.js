exports.GetLogin = (req, res, next) => {

  const loggedIn = false;//req.get("Cookie").split(";")[2].trim().split("=")[1] === true;

  console.log(loggedIn);

  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    loginCSS: true,
    loginActive: true,
    isAuthenticated: loggedIn,
  });
};

exports.PostLogin = (req, res, next) => {
  res.setHeader(
    "Set-Cookie",
    "loggedIn=true; expires=" +new Date(new Date().getTime()+86409000).toUTCString()
  );
  res.redirect("/");
};
