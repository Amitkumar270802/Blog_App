const userModel = require("../models/userModel");

const bcrypt = require("bcrypt");

exports.registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // validation
    if (!name || !email || !password) {
      return res.status(400).send({
        success: false,
        message: "Please Enter all fields",
      });
    }
    //   existingUser
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(401).send({
        success: false,
        message: "Already Registered ",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    // save new User
    const user = new userModel({ name, email, password: hashedPassword });
    await user.save();
    return res.status(201).send({
      message: "New User Created",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error in Register callback",
      success: false,
      error,
    });
  }
};

exports.getAllUser = async (req, res) => {
  try {
    const users = await userModel.find({});
    return res.status(200).send({
      success: true,
      message: "Get All User",
      userCount: users.length,
      users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in getting Users",
      error,
    });
  }
};

exports.loginController = async (req, res) => {
  try {
    const { password, email } = req.body;
    if (!password || !email) {
      return res.status(400).send({
        success: false,
        message: "Please Enter all fields",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "Email is not registered",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Password is Incorrect",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Login Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Login Users",
      error,
    });
  }
};
