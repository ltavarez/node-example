const fs = require("fs");

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>First page</title></head>");
    res.write(
      "<body> <form action='message' method='POST'> <input type='text' name='Message'/> <button type='submit'> Send  </button></form></body>"
    );
    res.write("</html>");
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });

    return req.on("end", () => {
      const parserBody = Buffer.concat(body).toString();
      const message = parserBody.split("=")[1];
      fs.writeFile("message.txt", message, () => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }

  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>First page</title></head>");
  res.write("<body> <h1> Hello from node js </h1></body>");
  res.write("</html>");
  res.end();
};

module.exports = requestHandler;
