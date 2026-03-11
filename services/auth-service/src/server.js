const express = require("express")
const client = require("prom-client")
const connectDB = require("./db/mongoClient")
const authRoutes = require("./routes/authRoutes")
const logger = require("./utils/logger")

const app = express()

app.use(express.json())

// connect database
connectDB()

// Prometheus metrics
client.collectDefaultMetrics()

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType)
  res.end(await client.register.metrics())
})

app.use("/auth", authRoutes)

app.get("/health", (req, res) => {
  res.json({ status: "OK" })
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  logger.info(`Auth service running on port ${PORT}`)
})
