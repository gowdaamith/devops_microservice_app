const Product = require("../models/productModel")

exports.createProduct = async (req,res)=>{

 const {name,price,stock} = req.body

 const product = new Product({
  name,
  price,
  stock
 })

 await product.save()

 res.json(product)

}

exports.getProducts = async (req,res)=>{

 const products = await Product.find()

 res.json(products)

}

exports.deleteProduct = async (req,res)=>{

 const id = req.params.id

 await Product.findByIdAndDelete(id)

 res.json({message:"deleted"})

}
