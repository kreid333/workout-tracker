// DEFINING VARIABLES
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;

const db = require("./models");

// DEFINING MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// CONNECTING TO MONGODB
mongoose.connect("mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// VIEW ROUTES
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"))
})

app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/exercise.html"))
})

app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/stats.html"))
})
// CREATING A VISIBLE NOTICE THAT WE HAVE CONNECTED TO THE DB
const connection = mongoose.connection;

connection.on("connected", function () {
  console.log("Mongoose connected...");
});

// LISTENING ON SERVER
app.listen(PORT, function () {
  console.log(`App listening on http://localhost:${PORT}`);
});
