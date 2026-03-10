const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

exports.registerUser = async (req, res) => {

  try {

    const { username, password } = req.body

    const existingUser = await User.findOne({ username })

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = new User({
      username,
      password: hashedPassword
    })

    await user.save()

    res.json({
      message: "User registered"
    })

  } catch (error) {

    res.status(500).json({ error: error.message })

  }
}

exports.loginUser = async (req, res) => {

  try {

    const { username, password } = req.body

    const user = await User.findOne({ username })

    if (!user) {
      return res.status(401).json({ message: "Invalid username" })
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
      return res.status(401).json({ message: "Invalid password" })
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1h" }
    )

    res.json({ token })

  } catch (error) {

    res.status(500).json({ error: error.message })

  }
}
