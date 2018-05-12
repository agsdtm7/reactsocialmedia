// this is our entry point file
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// point URL to the files in our app
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

const app = express();
// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to Mongodb using promise
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// line below just to show that our app work
app.get("/", (req, res) => res.send("hellow"));

// use Routes -- at first you will get an error that Router.use() requires a middleware function.. this is ok keep continuing
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

// LINE below : deploy to heroku you need the process.env.PORT
const port = process.env.PORT || 5000; // it will run in port 5000 locally

app.listen(port, () => console.log(`Server running on port ${port}`));
