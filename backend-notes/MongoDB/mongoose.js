const mongoose = require('mongoose');

const Product = require('./models/product');

mongoose.connect(
  'mongodb+srv://misterplain:TmHmrPtQHsW9y2JM@cluster0.unyca.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
).then(() => {
    console.log('Connected to database!')
}).catch(() => {
    console.log('Connection failed!')
});

//similar to mongo.js but simplified, new Product is using the schema set up earlier 
const createProduct = async (req, res, next) => {
  const createdProduct = new Product({
    name: req.body.name,
    price: req.body.price
  });
  //connect to backend database, save method, does all the heavy listing of saving data to the database
  const result = await createdProduct.save();
  console.log(typeof createdProduct._id);
  res.json(result);
};

//get everything as defined in the Product model schema 
const getProducts = async (req, res, next) => {
  const products = await Product.find().exec();
  res.json(products);
}

exports.createProduct = createProduct;
exports.getProducts = getProducts;
