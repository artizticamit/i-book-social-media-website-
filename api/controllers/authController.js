const User = require("../models/User");
const bcrypt = require("bcrypt");

const handleRegister = async (req, res) => {
  try {
    // Generate hashed password
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
    res.status(500).json(err);
  }
};

const handleLogin = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    // console.log("user = "+user);
    if (user) {
      const validPassword = bcrypt
        .compare(req.body.password, user.password)
        .then((response) => {
          console.log("response = ", response);
          if (response) {
            res.status(200).json(user);
          } else {
            res.status(400).json("Wrong Password");
          }
        });
    } else {
      res.status(404).json("User not found");
    }
  } catch (err) {
    res.status(404).json("User not found");
  }
};

module.exports = { handleRegister, handleLogin };
