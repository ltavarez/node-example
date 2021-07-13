const USERS = [];

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<http>");
    res.write("<head> <title> Home </title> </head>");
    res.write("<body>");
    res.write("<h1> Hello users </h1><br>");
    res.write(
      "<form action='create-user' method='POST'> <input type='text' name='Username'> <button type='submit'>Send</button> </form>"
    );
    res.write("<br> <a href='/users'> Users </a>");
    res.write("</body>");
    res.write("</http>");
    return res.end();
  }

  if (url === "/users") {
    res.setHeader("Content-Type", "text/html");
    res.write("<http>");
    res.write("<head> <title> Home </title> </head>");
    res.write("<body>");
    res.write("<ul>");
    USERS.forEach((user) => {
      res.write(`<li> ${user} </li>`);
    });

    res.write("</ul>");
    res.write("<br> <a href='/'> Back home </a>");
    res.write("</body>");
    res.write("</http>");
    return res.end();
  }

  if (url === "/create-user" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });

    req.on("end", () => {
      const bodyBuffer = Buffer.concat(body).toString();
      const bodyParser = bodyBuffer.split("=")[1];
      USERS.push(bodyParser);
      res.statusCode = 302;
      res.setHeader("Location", "/users");     
      return res.end();
    });
  }
};

module.exports = requestHandler;
