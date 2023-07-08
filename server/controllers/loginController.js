const { User } = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    const token = jwt.sign({
      userId: user._id ,
      firstName: user.firstName,
      lastName: user.lastName,
    }, "creative-notes-key", {
      expiresIn: "1h",
    });

    return res.json({
      token,
      user: {
        _id: user._id,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function protected(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Missing authorization token" });
  }

  try {
    const decodedToken = jwt.verify(token, "creative-notes-key");
    const userId = decodedToken.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(401).json({ error: "Invalid authorization token" });
    }

    req.user = decodedToken; // Сохраняем декодированный токен в req.user
    next(); // Вызываем next(), чтобы перейти к следующему обработчику
  } catch (error) {
    res.status(401).json({ error: "Invalid authorization token" });
  }
}


module.exports = {
  loginUser,
  protected,
};
