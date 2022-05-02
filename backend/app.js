//store express package in express const
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//import from other files, placesRoutes is now technically a middleware
const placesRoutes = require('./routes/places-routes');
const usersRoutes = require('./routes/users-routes');
const HttpError = require('./models/http-error');

const app = express();

//middleware to parse the body data into a json string
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

  next();
});

//use middleware
app.use('/api/places', placesRoutes);
app.use('/api/users', usersRoutes);

//error middleware, only be executed on requests where there is an error
app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

  //check if there is an error code, 500 as the fallback error code
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred!' });
});

mongoose
  .connect(
    `mongodb+srv://misterplain:OS8vdEVysurPdKZC@cluster0.n3wvy.mongodb.net/mern?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(5000);
  })
  .catch(err => {
    console.log(err);
  });
