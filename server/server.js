const express = require("express");
const db = require("./config/connection");
const app = express();
const PORT = 5008;
const bcrypt = require("bcrypt");

const User = require("./models/User");
const { signToken } = require("./utils/auth");
const routes = require("./routes");

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on PORT ${PORT}`);
  });
});

// // User signup
// app.post("/signup", async (req, res) => {
//   const { username, email, password } = req.body;

//   console.log(User);

//   const exisitingUser = await User.findOne({ email: email });

//   if (exisitingUser) {
//     return res.status(400).json({ message: "User already exists" });
//   }
//   const hashedPassword = await bcrypt.hash(password, 10);

//   const newUser = await User.create({
//     email: email,
//     password: hashedPassword,
//     username: username,
//   });

//   const token = signToken(newUser);

//   res.status(201).json({ user: newUser, token: token });
// });

// //User login
// app.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   const userExists = await User.findOne({ email: email });

//   if (!userExists) {
//     return res
//       .status(400)
//       .json({ message: "No user with these credentials, please sign up" });
//   }

//   const correctPw = await userExists.isCorrectPassword(password);

//   if (!correctPw) {
//     return res.status(400).json({ message: "Incorrect password" });
//   }

//   const token = signToken(userExists);

//   return res.status(200).json({ user: userExists, token: token });
// });
