const express = require("express");
const {
  getUser,
  getAllUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController.js");
const { body, check } = require("express-validator");
const {loginUser, protected} = require('../controllers/loginController');
const {getUserInfo, changePassword} = require('../controllers/userController');

const router = express.Router();
// all users
router.get("/users/:id",  [check("id").isMongoId()], getUser);
router.get("/users", getAllUser);
router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
      body("firstName")
          .optional()
          .isString()
          .isLength({ min: 1 })
          .withMessage("First name must be a string and not empty"),
      body("lastName")
          .optional()
          .isString()
          .isLength({ min: 1 })
          .withMessage("Last name must be a string and not empty"),
  ],
  createUser
);
router.put("/users/:id", protected, [check("id").isMongoId()], updateUser);
router.delete("/users/:id", protected, [check("id").isMongoId()], deleteUser);

// login
router.post("/login", loginUser);
router.get("/protected", protected);

router.post('/change-password', protected, changePassword);

//userinfo
router.get("/userinfo", protected, getUserInfo);

module.exports = router;
