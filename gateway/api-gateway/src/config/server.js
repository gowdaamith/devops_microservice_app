module.exports = {
  authService: process.env.AUTH_SERVICE || "http://localhost:3001",
  productService: process.env.PRODUCT_SERVICE || "http://localhost:3002",
  orderService: process.env.ORDER_SERVICE || "http://localhost:3003"
}
