const router = require("express").Router();
const Workout = require("../models/Workout");
const Category = require("../models/Category");
const multer = require("multer");
const { authMiddleware } = require("../utils/auth");
const User = require("../models/User");
const SavedWorkouts = require("../models/SavedWorkouts");

//add a workout
router.post("/addPost", (req, res) => {
  const date = new Date();

  console.log(req.body);

  Workout.create({ ...req.body, postDate: date })
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

//get all posts
router.get("/getAllPosts", (req, res) => {
  Workout.find()
    .then((result) => {
      res.status(202).send({ result });
    })
    .catch((err) => {
      res.json(err);
    });
});

//get single post
router.get("/getPosts/:id", async (req, res) => {
  const id = req.params.id;

  const result = await Workout.findOne({ _id: id });
  console.log(result);
  return res.status(200).json(result);
});

//save a workout
router.post("/saveWorkout", authMiddleware, async (req, res) => {
  const { _id } = req.body;

  // console.log(req.body);

  const alreadySaved = await SavedWorkouts.findOne({ _id: _id });

  if (alreadySaved) {
    return res.status(400).json({ message: "Workout has already been saved" });
  }

  const newlySaved = SavedWorkouts.create(req.body);

  return res.status(201).json(newlySaved);
});

//add categories
router.post("/addCategory", async (req, res) => {
  const categoryName = req.body.categoryName;
  console.log(categoryName);

  const categoryExists = await Category.findOne({
    category: categoryName,
  });

  console.log(categoryExists);
  if (categoryExists) {
    return res.status(401).json({
      message: "Category already exists",
    });
  }

  const newCategory = await Category.create(req.body);
  return res.status(201).json(newCategory);
});

//get all the categories
router.get("/getAllCategories", async (req, res) => {
  await Category.find()
    .then((result) => {
      res.status(201).send({ result });
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
