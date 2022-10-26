const express = require("express");
const fs = require("fs");

const cors = require("cors");
const Axios = require("axios");
const helmet = require("helmet");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const morgan = require("morgan");

const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

const app = express();

dotenv.config();

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }, () => {
  console.log("Connected to mongoDB");
});

// Middle ware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(helmet());
app.use(morgan("common"));

app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// app.get("/", (req, res)=>{
//     res.send("Amit Kumar");
// })

// app.post("/login", (req, res)=>{
//     console.log(req.body);
// })

// app.get("/error", (req, res)=>{
//     res.end("<h1>Error</h1>")
// })

app.post("/login", (req, res) => {
  const username = req.body.email;
  const password = req.body.password;
});

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server started at port : ${PORT}`);
});
