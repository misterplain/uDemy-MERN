const MongoClient = require('mongodb').MongoClient;

const url =
  'mongodb+srv://misterplain:TmHmrPtQHsW9y2JM@cluster0.unyca.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

  //related to post request
const createProduct = async (req, res, next) => {
  const newProduct = {
    name: req.body.name,
    price: req.body.price
  };
  //get products into mongo database
  const client = new MongoClient(url);

  try {
    //establish connection to mongodb server
    await client.connect();
    //access specific database on that server
    const db = client.db();
    //access collection in this datbase, insert one single new product 
    const result = db.collection('products').insertOne(newProduct);
  } catch (error) {
    return res.json({message: 'Could not store data.'});
  };
  client.close();

  res.json(newProduct);
};

const getProducts = async (req, res, next) => {
  const client = new MongoClient(url);

  let products;

  try {
    await client.connect();
    const db = client.db();
    //not inserting, but finding, toArray will return all items in an array (can configure find or implement a filter )
    products = await db.collection('products').find().toArray();
  } catch (error) {
    return res.json({message: 'Could not retrieve products.'});
  };
  client.close();
//get products as a response 
  res.json(products);
};

exports.createProduct = createProduct;
exports.getProducts = getProducts;
