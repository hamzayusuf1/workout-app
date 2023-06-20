const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  username: {
    type: String,
    // required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  height: { type: String },
  weight: { type: String },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Must match an email address!"],
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  image: {
    type: String,
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Workout",
    },
  ],
});

// A virtual property `fullName` that gets and sets the user's full name
userSchema
  .virtual("fullName")
  .get(function () {
    return `${this.first} ${this.last}`;
  })
  // Setter to set the first and last name
  .set(function (v) {
    const first = v.split(" ")[0];
    const last = v.split(" ")[1];
    this.set({ first, last });
  });

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);

module.exports = User;
