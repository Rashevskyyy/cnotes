const express = require("express");
const {
  getUser,
  getAllUser,
  createUser,
  updateUser,
  deleteUser,
  updateUserAvatar
} = require("../controllers/userController.js");
const { body, check } = require("express-validator");
const {loginUser, protected} = require('../controllers/loginController');
const {registerUser} = require('../controllers/registerController');
const multer = require('multer');
const path = require('path');
const {getUserInfo} = require('../controllers/userController');

// Настройка хранения файлов с помощью multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', 'uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

const router = express.Router();
// all users
router.get("/users/:id",  [check("id").isMongoId()], getUser);
router.get("/users", getAllUser);
router.post(
  "/users",
  [
    body("email").isEmail().withMessage("Invalid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  createUser
);
router.put("/users/:id", protected, [check("id").isMongoId()], updateUser);
router.delete("/users/:id", protected, [check("id").isMongoId()], deleteUser);

// login
router.post("/login", loginUser);
router.get("/protected", protected);
// register
router.post("/register", registerUser);
// avatar user
router.post("/api/avatar", protected, upload.single("avatar"), (req, res) => {
    if (req.file) {
        res.status(200).send({ imageUrl: `/uploads/${req.file.filename}` });
    } else {
        res.status(400).send("Ошибка при загрузке файла.");
    }
});
router.put("/users/avatar", protected, updateUserAvatar);

//userinfo
router.get("/userinfo", protected, getUserInfo);

module.exports = router;
