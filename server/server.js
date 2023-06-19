const express = require("express");
const db = require("./config/connection");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 5008;
const bcrypt = require("bcrypt");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");

const Workout = require("./models/Workout");
const User = require("./models/User");
const { signToken } = require("./utils/auth");
const routes = require("./routes");

//multer middleware
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const name = Date.now() + "_" + file.originalname;
    cb(null, name);
  },
});

const upload = multer({
  storage: storage,

  fileFilter: function (req, file, cb) {
    const fileTypes = /jpeg|jpg|png|gif|webp/;
    const mimeType = fileTypes.test(file.mimetype);
    // const extname = fileTypes.test(path.extname(file.originalname));
    if (mimeType) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
}).single("image");

//middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(routes);
app.use("/uploads", express.static("uploads"));

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on PORT ${PORT}`);
  });
});

app.post("/editProfile", upload, async (req, res) => {
  const date = new Date();

  const { _id } = req.body;

  console.log(req.file.path);

  if (!_id) {
    return res
      .status(404)
      .json({ message: "Login details expired, please login again" });
  }

  const exists = await User.findOne({ _id: _id });

  console.log(exists);

  if (!exists) {
    return res.status(404).json({ message: "User does not exist" });
  }

  const update = {
    $set: { ...req.body, image: req.file.path },
  };

  const updatedUser = await User.findOneAndUpdate({ _id: _id }, update, {
    new: true,
    runValidators: true,
  });
  res.status(202).json(updatedUser);
});

app.post("/addPost", upload, async (req, res) => {
  const date = new Date();

  console.log(req.file.path);

  await Workout.create({ ...req.body, postDate: date, image: req.file.path })
    .then((workout) => {
      return User.findOneAndUpdate(
        { email: req.body.email },
        {
          $addToSet: { posts: workout._id },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    })
    .then((user) => {
      !user
        ? res.status(404).json({
            message: "Application created, but found no user with that ID",
          })
        : res.json("Created the application");
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// User signup
app.post("/signup", async (req, res) => {
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
app.post("/login", async (req, res) => {
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
