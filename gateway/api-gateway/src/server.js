const express = require("express")
const client = require("prom-client")

const gatewayRoutes = require("./routes/gatewayRoutes")
const logger = require("./middleware/logger")

const app = express()

app.use(express.json())

client.collectDefaultMetrics()

gatewayRoutes(app)

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType)
  res.end(await client.register.metrics())
})

app.get("/health", (req, res) => {
  res.json({ status: "Gateway OK" })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  logger.info(`API Gateway running on port ${PORT}`)
})
