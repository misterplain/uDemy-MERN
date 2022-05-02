const express = require("express");
const bodyParser = require("body-parser");

const app = express();
//parse all incoming request, extract data if it's of type urlencodeddata, will call next for us to move on to middleware
app.use(bodyParser.urlencoded({ extended: false }));

//handle post request
//first parameter './user' tells the browser where to send the request to, called within the form function in .get
app.post("/user", (req, res, next) => {
  res.send("<h1>User: " + req.body.username + "</h1>");
});

//filtering for requests that use a get method, need to also pass it the first parameter '/'- for requests targeting / this function will run
app.get("/", (req, res, next) => {
  res.send(
    '<form action="/user" method="post"><input type="text" name="username"><button type="submit">Create User</button></form>'
  );
});

app.listen(5000);
