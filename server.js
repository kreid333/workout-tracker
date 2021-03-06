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
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// VIEW ROUTES
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/exercise.html"));
});

app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/stats.html"));
});

// API ROUTES
app.put("/api/workouts/:id", (req, res) => {
  db.Workout.findByIdAndUpdate(
    req.params.id,
    { $push: { exercises: req.body } },
    { new: true }
  )
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.json({
        success: false,
        data: null,
        message: "Unable to update workout.",
      });
    });
});

app.get("/api/workouts", (req, res) => {
  db.Workout.find({})
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.json({
        success: false,
        data: null,
        message: "Unable to retrieve workouts.",
      });
    });
});

app.post("/api/workouts", (req, res) => {
  db.Workout.create({})
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.json({
        success: false,
        data: null,
        message: "Unable to create workout.",
      });
    });
});

app.get("/api/workouts/range", (req, res) => {
  db.Workout.find({}).limit(7)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.json({
        success: false,
        data: null,
        message: "Unable to retrieve workouts.",
      });
    });
});

// CREATING A VISIBLE NOTICE THAT WE HAVE CONNECTED TO THE DB
const connection = mongoose.connection;

connection.on("connected", function () {
  console.log("Mongoose connected...");
});

// LISTENING ON SERVER
app.listen(PORT, function () {
  console.log(`App listening on http://localhost:${PORT}`);
});
