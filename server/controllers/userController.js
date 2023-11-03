const bcrypt = require('bcryptjs');
const { User } = require("../models/userModel");
const Note = require("../models/noteModel");
const { validationResult } = require("express-validator");

async function getUser(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

async function getAllUser(req, res) {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

async function createUser(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { email, password, firstName, lastName } = req.body;

  const user = new User({ email, password, firstName, lastName });
  try {
    await user.save();
    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to create user" });
  }
}

async function updateUser(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const oldUser = await User.findById(req.params.id).select("-password -__v");
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).select("-password -__v");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (oldUser.firstName !== user.firstName || oldUser.lastName !== user.lastName) {
      await Note.updateMany({ userId: req.params.id }, {
        firstName: user.firstName,
        lastName: user.lastName
      });

      await Note.updateMany({ "comments.userId": req.params.id }, {
        "comments.$.firstName": user.firstName,
        "comments.$.lastName": user.lastName
      });
    }

    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

async function deleteUser(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

async function updateUserAvatar(req, res) {
  try {
    const { userId } = req.body;
    const user = await User.findByIdAndUpdate(
        userId,
        { avatar: req.body.avatar },
        { new: true }
    );

    if (!user) {
      return res.status(404).send("Пользователь не найден");
    }

    res.status(200).send(user);
  } catch (error) {
    res.status(500).send("Ошибка сервера");
  }
}

async function getUserInfo(req, res) {
  const userId = req.user.userId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function changePassword(req, res) {
  const { currentPassword, newPassword } = req.body;
  const userId = req.user.userId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Текущий пароль неверен" });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "Пароль успешно изменен" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getUser,
  getAllUser,
  createUser,
  updateUser,
  deleteUser,
  updateUserAvatar,
  getUserInfo,
  changePassword,
};
