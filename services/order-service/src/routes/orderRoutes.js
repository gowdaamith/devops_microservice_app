const express = require("express")

const router = express.Router()

const {
  createOrder,
  getOrders,
  cancelOrder
} = require("../controllers/orderController")

router.post("/", createOrder)
router.get("/", getOrders)
router.delete("/:id", cancelOrder)

module.exports = router
