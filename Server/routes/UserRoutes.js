const express = require("express");

const {
  getAllUser,
  registerController,
  loginController,
} = require("../controllers/UserController");

// router Obj
const router = express.Router();

// get All users
router.get("/allUsers", getAllUser);

// create User
router.post("/register", registerController);

// Login
router.post("/login", loginController);

module.exports = router;
