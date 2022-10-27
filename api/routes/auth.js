const router = require("express").Router();
const auth = require("../controllers/authController");
const cors = require("cors");
const express = require("express");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//REgister

router.post("/register", auth.handleRegister);

// LOGIN

router.post("/login", auth.handleLogin);

module.exports = router;
