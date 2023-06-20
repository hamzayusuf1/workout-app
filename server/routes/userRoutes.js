const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
require("dotenv").config();
const { authMiddleware } = require("../utils/auth");

const { signToken } = require("../utils/auth");
const jwt = require("jsonwebtoken");
const { put } = require(".");

//get all users
router.get("/", async (req, res) => {
  return User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(500).json(err));
});

//User signup
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  const exisitingUser = await User.findOne({ email: email });

  if (exisitingUser) {
    return res.status(400).json({ message: "User already exists" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    ...req.body,
    password: hashedPassword,
  });

  const token = signToken(newUser);

  res.status(201).json({ user: newUser, token: token });
});

//User login
router.post("/login", async (req, res) => {
  console.log(req.body);
  console.log("hit");

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

  console.log(userExists);

  const token = jwt.sign(
    {
      email: userExists.email,
      _id: userExists._id,
      username: userExists.username,
      height: userExists.height,
      weight: userExists.weight,
      image: userExists.image,
      firstName: userExists.firstName,
      lastName: userExists.lastName,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: process.env.EXPIRATION,
    }
  );

  return res.status(202).json({ user: userExists, token: token });
});

//find user info by token
router.get("/findUser/:token", async (req, res) => {
  let token = req.params.token;
  await jwt.verify(
    token,
    process.env.SECRET_KEY,
    {
      maxAge: process.env.EXPIRATION,
    },
    (err, decoded) => {
      if (err) {
        return res.status(404).json({ message: err });
      }
      res.status(202).json({ user: decoded });
    }
  );
});

// router.put("/userUpdate", async (req, res) => {
//   const { _id } = req.body;

//   console.log(req.body);

//   const exists = await User.findOne({ _id: _id });

//   if (!exists) {
//     return res.status(404).json({ message: "User does not exist" });
//   }

//   const update = {
//     $set: {
//       username: req.body.username,
//       weight: req.body.username,
//       height: req.body.height,
//     },
//   };

//   const updatedUser = await User.findOneAndUpdate(
//     { _id: _id },

//     // $addToSet: {
//     //   username: req.body.username,
//     //   weight: req.body.weight,
//     //   height: req.body.height,
//     // },
//     update,

//     {
//       new: true,
//       runValidators: true,
//     }
//   );
//   res.status(202).json(updatedUser);
// });

module.exports = router;
