const { Schema, model } = require("mongoose");

const workoutSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: [/.+@.+\..+/, "Must match an email address!"],
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  muscleGroup: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    // required: true,
  },
  postDate: {
    type: String,
    required: true,
  },
});

const Workout = model("Workout", workoutSchema);

module.exports = Workout;
