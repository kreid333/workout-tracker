const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutSchema = new Schema(
  {
    day: {
      type: Date,
      default: Date.now,
    },
    exercises: [
      {
        type: {
          type: String,
          trim: true,
        },
        name: {
          type: String,
          trim: true,
        },
        duration: Number,
        distance: Number,
        weight: Number,
        reps: Number,
        sets: Number,
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);



workoutSchema.virtual("totalDuration").get(function () {
  return this.exercises.reduce((total, exercises) => {
      return total + exercises.duration;
  }, 0)
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
