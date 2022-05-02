const http = require("http");

//create a server takes one argument, the request listener to listen for incoming request, gets two arguments, a request and a response argument, create server then returns a server object, then the listen will listen for incoming requests, port number 5000, which will open a local server on your machine, can send requests to this server, every request is sent through this function, listen is an ongoing listener/process, has to be manually shut down

//this is all a bit cumbersome with only node - expressjs can help us in not having to markup all the html in below example 

const server = http.createServer((req, res) => {
  console.log("incoming request");
  console.log(req.method, req.url);

  //post functionality for FORM
  if (req.method === "POST") {
    let body = "";
    //when we're done parsing data, 
    req.on("end", () => {
      const userName = body.split("=")[1];
      res.end("<h1>" + userName + "</h1>");
    });
    //getting data in chunks, listening for data
    req.on("data", (chunk) => {
      body += chunk;
    });
  } else {
    //below tells the browser that what is received should be received simplay as plain text or html (are other options)
    res.setHeader("Content-Type", "text/html");
    //done with response, can put some html in there
    //   res.end('<h1>success</h1>')
    //with this input field, when you click create user, the button will by default will send a get request to the backend, unless the method is set to post on the form html button, see above for details
    res.end(
      '<form method="POST"><input type="text" name="username"/><button>Create User</button></form>'
    );
  }
});

server.listen(5000);

//run node node2.js - if you go to localhost 5000 it will display the success text
