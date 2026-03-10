const axios = require("axios")

const PRODUCT_SERVICE_URL =
  process.env.PRODUCT_SERVICE_URL || "http://localhost:3002"

const getProduct = async (id) => {

  try {

    const res = await axios.get(
      `${PRODUCT_SERVICE_URL}/products`
    )

    return res.data.find(p => p._id === id)

  } catch (error) {

    console.error("Product service error")

    return null
  }

}

module.exports = getProduct
