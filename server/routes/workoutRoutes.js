const router = require("express").Router();
const Workout = require("../models/Workout");
const Category = require("../models/Category");
const multer = require("multer");
const { authMiddleware } = require("../utils/auth");

//add a workout
router.post("/addPost", (req, res) => {
  const date = new Date();

  console.log(req.body);

  Workout.create({ ...req.body, postDate: date })
    .then((workout) => {
      res.status(201).json(workout);
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

//save a workout
router.post("/saveWorkout", (req, res) => {
  console.log(req);
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
router.get("/getAllCategories", (req, res) => {
  Category.find()
    .then((result) => {
      res.status(201).send({ result });
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
