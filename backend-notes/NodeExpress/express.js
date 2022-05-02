//write javascript code in the code environment, it's a framework for node.js
//middleware focused
//ran npm init , hit enter a bunch, get a package.json, npm install express --save

//example from node2.js but modified

const express = require("express");

const app = express();

app.use((req, res, next) => {
  //   console.log("MIDDLEWARE:");
  //   next();

  //parsing request body
  let body = "";
  //executes once we're done parsing incoming requests
  req.on("end", () => {
    const userName = body.split("=")[1];
    if (userName) {
      req.body = { name: userName };
    }

    //called within end handler so we go to next middlware once finished and nto before
    next();
  });
  //on listener to get chunks of data
  req.on("data", (chunk) => {
    body += chunk;
  });
});

//register middleware, everything incoming request is funnelled through middleware functions, which can manipulate request and response and send them back.

//need the use method, it takes a function which takes 3 parameters, a request object, a response object, and a next function which you call when you don't want to aresponse to the middleware, but to forward the response ot the next function in the middleware

app.use((req, res, next) => {
  //check if request is available
  if (req.body) {
    return res.send("<h1>" + req.body.name + "</h1>");
  }
  res.send(
    '<form method="post"><input type="text" name="username"><button type="submit">Create User</button></form>'
  );
});

app.listen(5000);

//npm install nodemon --save-dev to simplify dev process, allows you to not have to quit and restart the server each time 
//in package.json -     "start": "nodemon express.js"

//this will act as a live server 

//new package installed to help with processing data without having to manually parse it all npm install body-parser --save 