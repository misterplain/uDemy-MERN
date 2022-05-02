const express = require('express');
const { check } = require('express-validator');

//import controllers
const placesControllers = require('../controllers/places-controllers');

const router = express.Router();

//tell express that we have a dynamic segment as the id, add colon in the filter, pid as place id
router.get('/:pid', placesControllers.getPlaceById);

//middleware to search to place and pull it from the userId
router.get('/user/:uid', placesControllers.getPlacesByUserId);

//middleware for post 
router.post(
  '/',
  [
    check('title')
      .not()
      .isEmpty(),
    check('description').isLength({ min: 5 }),
    check('address')
      .not()
      .isEmpty()
  ],
  placesControllers.createPlace
);

//update
router.patch(
  '/:pid',
  [
    check('title')
      .not()
      .isEmpty(),
    check('description').isLength({ min: 5 })
  ],
  placesControllers.updatePlace
);

router.delete('/:pid', placesControllers.deletePlace);

//export to app.js
module.exports = router;
