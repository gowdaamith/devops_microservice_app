const express = require("express")
const client = require("prom-client")

const connectDB = require("./db/mongoClient")
const orderRoutes = require("./routes/orderRoutes")
const logger = require("./utils/logger")

const app = express()

app.use(express.json())

connectDB()

client.collectDefaultMetrics()

app.use("/orders", orderRoutes)

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType)
  res.end(await client.register.metrics())
})

app.get("/health", (req, res) => {
  res.json({ status: "OK" })
})

const PORT = process.env.PORT || 3003

app.listen(PORT, () => {
  logger.info(`Order service running on port ${PORT}`)
})
