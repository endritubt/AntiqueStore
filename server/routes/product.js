const router = require('express').Router();
const Product = require('../models/product');

const upload = require('../middlewares/upload-photo');

// Post

router.post('/products', upload.single('photo'), async (req, res) => {
  try {
    let product = new Product();
    product.ownerID = req.body.ownerID;
    product.categoryID = req.body.categoryID;
    product.price = req.body.price;
    product.title = req.body.title;
    product.description = req.body.description
    product.photo = req.file.location;
    product.stockQuantity = req.body.stockQuantity;

    await product.save();
 
    res.json({
      status: true,
      message: 'Product saved successfully'
    }) ;
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// GET - Multiple
router.get('/products', async (req, res) => {
  try {
    let products = await Product.find().populate('owner category').exec();
    res.json({
      success: true,
      products: products,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
})


// GET - Single
router.get('/products/:id', async (req, res) => {
  try {
    let product = await Product.findOne({ _id: req.params.id });
    res.json({
      success: true,
      product: product,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

//  PUT  
router.put('/products/:id', upload.single("photo"), async (req, res) => {
  try {
    let product = await Product.findOneAndUpdate(
      { _id: req.params.id }, 
      {
        $set: { 
          title: req.body.title,
          price: req.body.price,
          category: req.body.categoryID,
          owner: req.body.ownerID,
          photo: req.file.location,
          description: req.body.description
        },
      }, { upsert: true });

    res.json({
      success: true,
      updatedProduct: product,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});


// DELETE - Single
router.delete('/products/:id', async (req, res) => {
  try {
    let deletedProduct = await Product.findByIdAndDelete({ _id: req.params.id });

    if (deletedProduct) {
      res.json({
        status: true,
        message: 'Product deleted successfully'
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});


// EXPORTS
module.exports = router;