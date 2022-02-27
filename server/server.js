const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

const connectionParams = {
  useNewUrlParser: true, 
  useUnifiedTopology: true
}

mongoose.connect(
  process.env.DATABASE, 
  connectionParams, err => {
  if (err) {
    console.error(err);
  } else {
    console.log('Connected to the Database!')
  }
})

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Require APIs
const productRoutes = require('./routes/product');
app.use('/api', productRoutes)

app.listen(3000, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log("listening on port 3000");
  }
})