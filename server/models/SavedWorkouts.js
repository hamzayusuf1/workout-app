const { Schema, model } = require("mongoose");

const savedSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
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
});

const SavedWorkouts = model("SavedWorkouts", savedSchema);

module.exports = SavedWorkouts;
