const express = require("express");
const fs = require("fs");

const cors = require("cors");
const Axios = require("axios");
const helmet = require("helmet");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const morgan = require("morgan");
const multer = require("multer");
const path = require("path");

const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const groupRoute = require("./routes/group")

const app = express();

dotenv.config();

mongoose.connect(process.env.MONGO_URL, () => {
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
app.use("/api/group", groupRoute)


// app.use(
//   cors({
//     origin: ["http://localhost:3000", "http://192.168.1.7:8000"],
//     methods: ["GET", "POST","DELETE", "PUT"],
//     credentials: true,
//     allowedHeaders: ['Content-Type', 'Authorization'],
//   })
// );


// I enabled the cors in the server.js file and it worked for me.
app.use((req, res, next)=>{
  res.set('Cross-Origin-Resource-Policy', 'cross-origin');
  next();
})
  
  const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
      cb(null, "public/images")
    },
    filename: (req, file, cb)=>{
      console.log(req.body.name)
      cb(null, req.body.name)
    },
  })
  
  const upload = multer({storage: storage});
  app.post("/api/upload", upload.single("file"), (req, res)=>{
    res.set("Access-Control-Allow-Origin", "*")
    try{
      console.log("image uploaded successfully")
      return res.status(200).json("File uploaded successfully");
    }
    catch(err)
    {
      console.log(err);
    }
  })
  
  app.use("/images", express.static(path.join(__dirname, "/public/images")))
  // console.log("dirname = ",path.join(__dirname, "/public/images"))


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
