const express = require("express");
const router = express.Router();

// Load Input Validation
const validateGameInput = require("../../validation/game");

// Load Game model
const Game = require("../../models/Game");

///////////////////////////////////////
/////            GET              ////
/////////////////////////////////////

// @route   GET api/game/all
// @desc    Get all games
router.get("/all", (req, res) => {
  const errors = {};
  Game.find()
    .populate("team", ["name", "level"])
    .populate("league", ["name", "shortName"])
    .populate("opponent", ["name"])
    .populate("location", ["name"])
    .then(game => {
      if (!game) {
        errors.nogame = "There are no games";
        return res.status(404).json(errors);
      }

      res.json(game);
    })
    .catch(err => res.status(404).json({ game: "There are no games" }));
});

// @route   GET api/game/team/:team_id
// @desc    Get all games of specific leagues
router.get("/league/:league_id", (req, res) => {
  const errors = {};
  Game.find({ league: req.params.league_id })
    .populate("team", ["name", "level"])
    .populate("league", ["name", "shortName"])
    .populate("opponent", ["name"])
    .populate("location", ["name"])
    .then(game => {
      if (!game) {
        errors.nogame = "There are no games for this team";
        return res.status(404).json(errors);
      }

      res.json(game);
    })
    .catch(err =>
      res.status(404).json({ game: "There are no games for this team" })
    );
});

// @route   GET api/game/team/:team_id
// @desc    Get all games of specific team
router.get("/team/:team_id", (req, res) => {
  const errors = {};
  Game.find({ team: req.params.team_id })
    .populate("team", ["name", "level"])
    .populate("league", ["name", "shortName"])
    .populate("opponent", ["name"])
    .populate("location", ["name"])
    .then(game => {
      if (!game) {
        errors.nogame = "There are no games for this team";
        return res.status(404).json(errors);
      }

      res.json(game);
    })
    .catch(err =>
      res.status(404).json({ game: "There are no games for this team" })
    );
});

// @route   GET api/game/:game_id
// @desc    Get game by ID
router.get("/:game_id", (req, res) => {
  const errors = {};
  Game.findOne({ _id: req.params.game_id })
    .populate("team", ["name", "level"])
    .populate("league", ["name", "shortName"])
    .populate("opponent", ["name"])
    .populate("location", ["name"])
    .then(game => {
      if (!game) {
        errors.nogame = "There is no game for this ID";
        return res.status(404).json(errors);
      }

      res.json(game);
    })
    .catch(err =>
      res.status(404).json({ game: "There is no game for this ID" })
    );
});

///////////////////////////////////////
/////            POST             ////
/////////////////////////////////////

// @route   POST api/game
// @desc    Create game
router.post("/", (req, res) => {
  const { errors, isValid } = validateGameInput(req.body);

  // Check Validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }

  // Get fields
  const gameFields = {};
  gameFields.team = req.body.team;
  gameFields.league = req.body.league;
  gameFields.opponent = req.body.opponent;
  gameFields.location = req.body.location;
  gameFields.gameType = req.body.gameType;
  gameFields.gameDate = req.body.gameDate;
  gameFields.uniform = req.body.uniform;
  gameFields.notes = req.body.notes;
  gameFields.extraLabel = req.body.extraLabel;

  // Create game
  new Game(gameFields).save().then(game => {
    res.json(game);
  });
});

// @route   POST api/game/:game_id
// @desc    Edit game
router.post("/:game_id", (req, res) => {
  const { errors, isValid } = validateGameInput(req.body);

  // Check Validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }

  // Get fields
  const gameFields = {};
  gameFields.team = req.body.team;
  gameFields.league = req.body.league;
  gameFields.opponent = req.body.opponent;
  gameFields.location = req.body.location;
  gameFields.gameType = req.body.gameType;
  gameFields.gameDate = req.body.gameDate;
  gameFields.uniform = req.body.uniform;
  gameFields.notes = req.body.notes;
  gameFields.extraLabel = req.body.extraLabel;

  Game.findOne({ _id: req.params.game_id }).then(game => {
    if (game) {
      // Update game
      Game.findOneAndUpdate(
        { _id: req.params.game_id },
        { $set: gameFields },
        { new: true }
      ).then(game => res.json(game));
    } else {
      res.status(404).json({ game: "There is no game for this ID" });
    }
  });
});

///////////////////////////////////////
/////          DELETE             ////
/////////////////////////////////////

// @route   DELETE api/game/:game_id
// @desc    Delete game
router.delete("/:game_id", (req, res) => {
  Game.findOneAndRemove({ _id: req.params.game_id }).then(() => {
    res.json({ success: true });
  });
});

module.exports = router;
