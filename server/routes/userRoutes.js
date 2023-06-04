const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

const { signToken } = require("../utils/auth");

//get all users
router.get("/", async (req, res) => {
  return User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(500).json(err));
});

//User signup
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  console.log(User);

  const exisitingUser = await User.findOne({ email: email });

  if (exisitingUser) {
    return res.status(400).json({ message: "User already exists" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    email: email,
    password: hashedPassword,
    username: username,
  });

  const token = signToken(newUser);

  res.status(201).json({ user: newUser, token: token });
});

//User login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const userExists = await User.findOne({ email: email });

  if (!userExists) {
    return res
      .status(400)
      .json({ message: "No user with these credentials, please sign up" });
  }

  const correctPw = await userExists.isCorrectPassword(password);

  if (!correctPw) {
    return res.status(400).json({ message: "Incorrect password" });
  }

  const token = signToken(userExists);

  return res.status(200).json({ user: userExists, token: token });
});

module.exports = router;