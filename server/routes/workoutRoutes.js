const router = require("express").Router();
const Workout = require("../models/Workout");
const multer = require("multer");
const { authMiddleware } = require("../utils/auth");

//add a workout
router.post("/addPost", (req, res) => {
  const date = new Date();

  Workout.create({ ...req.body, postDate: date })
    .then((workout) => {
      res.status(201).json(workout);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//get all posts
router.get("/getAllPosts", authMiddleware, (req, res) => {
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

module.exports = router;
