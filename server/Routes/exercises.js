const router = require("express").Router();
let Exercise = require("../Models/Exercise.models");

router.route("/").get((req, res) => {
  Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json("Error dwag: " + err));
});

router.route("/add").post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const duration = req.body.duration;
  const date = Date.parse(req.body.date);

  const newExersice = new Exercise({
    username,
    description,
    duration,
    date
  });
  newExersice
    .save()
    .then(() => res.json("Exercise added dawg!"))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json("Exercise deleted."))
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
