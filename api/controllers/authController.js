const User = require("../models/User");
const bcrypt = require("bcrypt");
const validator = require('validator')

const handleRegister = async (req, res) => {
  try {
    // Generate hashed password
    const exists = await User.findOne({ email: req.body.email })
    if (exists) {
      throw Error('Email already in use!')
    }
    if ((!req.body.email || !req.body.password) || !req.body.username) {
      throw Error("All fields must be filled")
    }
    if (!validator.isEmail(req.body.email)) {
      throw Error('Email is not valid')
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Creates new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    // save user and return response
    const user = await newUser.save();
    console.log(user);
    res.status(200).json(user);
  } catch (err) {
    console.log(err.message)
    res.status(400).json(err.message);
  }
};

const handleLogin = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    // console.log("user = "+user);
    if ((!req.body.email || !req.body.password)) {
      throw Error("All fields must be filled")
    }
    if (!user) {
      throw Error('Invalid Email');
    }

    const validated = await bcrypt.compare(req.body.password, user.password);
    if (!validated) {
      throw Error('Wrong Passsword');
    }

    res.status(200).json(user)

  } catch (err) {
    res.status(400).json(err.message);
  }
};

module.exports = { handleRegister, handleLogin };
