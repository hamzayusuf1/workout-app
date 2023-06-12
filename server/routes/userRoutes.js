const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { authMiddleware } = require("../utils/auth");

const { signToken } = require("../utils/auth");

//get all users
router.get("/", async (req, res) => {
  return User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(500).json(err));
});

//User signup
router.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  console.log(User);

  const exisitingUser = await User.findOne({ email: email });

  if (exisitingUser) {
    return res.status(400).json({ message: "User already exists" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    email: email,
    password: hashedPassword,
    firstName: firstName,
    lastName: lastName,
  });

  const token = signToken(newUser);

  res.status(201).json({ user: newUser, token: token });
});

//User login
router.post("/login", async (req, res) => {
  console.log(req.body);

  const { email, password } = req.body;

  const userExists = await User.findOne({ email: email });

  if (!userExists) {
    return res.status(400).json({
      message: "No user with these credentials exist, please sign up",
    });
  }

  const correctPw = await userExists.isCorrectPassword(password);

  if (!correctPw) {
    return res
      .status(400)
      .json({ message: "Your login details are incorrect" });
  }

  const token = signToken(userExists);

  return res.status(202).json({ user: userExists, token: token });
});

module.exports = router;
