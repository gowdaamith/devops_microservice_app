const Order = require("../models/orderModel")
const getProduct = require("../services/productService")

exports.createOrder = async (req, res) => {

  const { userId, productId, quantity } = req.body

  const product = await getProduct(productId)

  if (!product) {
    return res.status(404).json({ message: "Product not found" })
  }

  const order = new Order({
    userId,
    productId,
    quantity
  })

  await order.save()

  res.json(order)
}

exports.getOrders = async (req, res) => {

  const orders = await Order.find()

  res.json(orders)
}

exports.cancelOrder = async (req, res) => {

  const id = req.params.id

  await Order.findByIdAndUpdate(id, { status: "cancelled" })

  res.json({ message: "Order cancelled" })
}
