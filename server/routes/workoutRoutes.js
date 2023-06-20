const router = require("express").Router();
const Workout = require("../models/Workout");
const Category = require("../models/Category");
const { authMiddleware } = require("../utils/auth");
const User = require("../models/User");
const SavedWorkouts = require("../models/SavedWorkouts");

const { upload } = require("../server");

// //multer middleware
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads");
//   },
//   filename: function (req, file, cb) {
//     const name = Date.now() + "_" + file.originalname;
//     cb(null, name);
//   },
// });

// const upload = multer({
//   storage: storage,

//   fileFilter: function (req, file, cb) {
//     const fileTypes = /jpeg|jpg|png|gif|webp/;
//     const mimeType = fileTypes.test(file.mimetype);
//     const extname = fileTypes.test(path.extname(file.originalname));
//     if (mimeType && extname) {
//       cb(null, true);
//     } else {
//       cb(null, false);
//     }
//   },
// }).single("image");

//add a workout

//get all posts
router.get("/getAllPosts", async (req, res) => {
  const postCount = await Workout.countDocuments({}).exec();

  console.log(postCount);

  const { category, page, size, regex } = req.query;

  let query = {};

  console.log(req.query);

  if (regex) {
    query.title = {
      $regex: regex,
      $options: "i", // this is to ensure case sensitivity doesn't affect search
    };
  }

  if (category) {
    query.muscleGroup = category;
  }

  Workout.find(query)
    .skip(page * size)
    .limit(size)
    .then((result) => {
      res.status(202).send({ posts: result, count: postCount });
    })
    .catch((err) => {
      res.json(err);
    });
});

//query for most recent section
router.get("/getRecentPosts", (req, res) => {
  Workout.find()
    .sort({ postDate: -1 })
    .limit(6)
    .then((result) => {
      res.status(202).send({ posts: result });
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
router.post("/saveWorkout", async (req, res) => {
  const { _id, userEmail } = req.body;

  const alreadySaved = await SavedWorkouts.findOne({ _id: _id });

  if (alreadySaved) {
    return res.status(400).json({ message: "Workout has already been saved" });
  }

  const newlySaved = SavedWorkouts.create({
    ...req.body,
    email: userEmail,
  });

  return res.status(201).json(newlySaved);
});

//get saved workouts
router.get("/mysaved", (req, res) => {
  SavedWorkouts.find()
    .sort({ postDate: -1 })
    .then((result) => {
      res.status(202).send({ saved: result });
    })
    .catch((err) => {
      res.json(err);
    });
});

//getMyPosts
router.get("/myPosts/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);

  User.findOne({ _id: id })
    .populate("posts")
    .exec()
    .then((result) => {
      res.status(202).send({ user: result });
      console.log(result.posts);
    })
    .catch((err) => {
      res.json(err);
      console.log(err);
    });
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
