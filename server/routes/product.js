const router = require('express').Router()
const Product = require('../models/product')

const upload = require('../middlewares/upload-photo');

// Post

router.post('/products', upload.single('photo'), async (req, res) => {
  try {
    let product = new Product();
    product.title = req.body.description;
    product.description = req.body.description
    product.photo = req.file.location;
    product.stockQuantity = req.body.stockQuantity;

    await product.save();

    res.json({
      status: true,
      message: 'Product saved successfully'
    }) 
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
})

// GET - Sinlge



// GET - Multiple



//  PUT 



// DELETE - Single



// EXPORTS
module.exports = router;