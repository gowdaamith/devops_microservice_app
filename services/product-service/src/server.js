const express = require("express")
const client = require("prom-client")

const connectDB = require("./db/mongoClient")
const productRoutes = require("./routes/productRoutes")
const logger = require("./utils/logger")

const app = express()

app.use(express.json())

connectDB()

client.collectDefaultMetrics()

app.use("/products", productRoutes)

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType)
  res.end(await client.register.metrics())
})

app.get("/health", (req, res) => {
  res.json({status:"OK"})
})

const PORT = process.env.PORT || 3002

app.listen(PORT, () => {
  logger.info(`Product service running on port ${PORT}`)
})
