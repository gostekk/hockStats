const express = require("express");
const router = express.Router();

// Load Input Validation
const validatePlayerInput = require("../../validation/player");

// Load Player model
const Player = require("../../models/Player");

///////////////////////////////////////
/////            GET              ////
/////////////////////////////////////

// @route   GET api/player/all
// @desc    Get all players
router.get("/all", (req, res) => {
  const errors = {};
  Player.find()
    .then(player => {
      if (!player) {
        errors.noplayer = "There are no players";
        return res.status(404).json(errors);
      }

      res.json(player);
    })
    .catch(err => res.status(404).json({ player: "There are no players" }));
});

// @route   GET api/player/:player_id
// @desc    Get player by ID
router.get("/:player_id", (req, res) => {
  const errors = {};
  Player.findOne({ _id: req.params.player_id })
    .then(player => {
      if (!player) {
        errors.noplayer = "There is no player for this ID";
        return res.status(404).json(errors);
      }

      res.json(player);
    })
    .catch(err =>
      res.status(404).json({ player: "There is no player for this ID" })
    );
});

///////////////////////////////////////
/////            POST             ////
/////////////////////////////////////

// @route   POST api/player
// @desc    Create player
router.post("/", (req, res) => {
  const { errors, isValid } = validatePlayerInput(req.body);

  // Check Validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }

  // Get fields
  const playerFields = {};
  playerFields.firstName = req.body.firstName;
  playerFields.lastName = req.body.lastName;
  if (req.body.birthday) playerFields.birthday = req.body.birthday;
  if (req.body.jerseyNumber) playerFields.jerseyNumber = req.body.jerseyNumber;
  if (req.body.position) playerFields.position = req.body.position;
  if (req.body.joinDate) playerFields.joinDate = req.body.joinDate;

  // Create player
  new Player(playerFields).save().then(player => {
    res.json(player);
  });
});

// @route   POST api/player/:player_id
// @desc    Edit player
router.post("/:player_id", (req, res) => {
  const { errors, isValid } = validatePlayerInput(req.body);

  // Check Validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }

  // Get fields
  const playerFields = {};
  playerFields.firstName = req.body.firstName;
  playerFields.lastName = req.body.lastName;
  if (req.body.birthday) playerFields.birthday = req.body.birthday;
  if (req.body.jerseyNumber) playerFields.jerseyNumber = req.body.jerseyNumber;
  if (req.body.position) playerFields.position = req.body.position;
  if (req.body.joinDate) playerFields.joinDate = req.body.joinDate;

  Player.findOne({ _id: req.params.player_id }).then(player => {
    if (player) {
      // Update player
      Player.findOneAndUpdate(
        { _id: req.params.player_id },
        { $set: playerFields },
        { new: true }
      ).then(player => res.json(player));
    } else {
      res.status(404).json({ player: "There is no player for this ID" });
    }
  });
});

///////////////////////////////////////
/////          DELETE             ////
/////////////////////////////////////

// @route   DELETE api/player/:player_id
// @desc    Delete player
router.delete("/:player_id", (req, res) => {
  Player.findOneAndRemove({ _id: req.params.player_id }).then(() => {
    res.json({ success: true });
  });
});

module.exports = router;
