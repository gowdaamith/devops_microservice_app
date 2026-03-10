const { createProxyMiddleware } = require("http-proxy-middleware")
const services = require("../config/services")

module.exports = (app) => {

  app.use(
    "/auth",
    createProxyMiddleware({
      target: services.authService,
      changeOrigin: true
    })
  )

  app.use(
    "/products",
    createProxyMiddleware({
      target: services.productService,
      changeOrigin: true
    })
  )

  app.use(
    "/orders",
    createProxyMiddleware({
      target: services.orderService,
      changeOrigin: true
    })
  )

}
