const express = require("express");
const router = express.Router();

// Load Input Validation
const validateLeagueInput = require("../../validation/league");

// Load League model
const League = require("../../models/League");

///////////////////////////////////////
/////            GET              ////
/////////////////////////////////////

// @route   GET api/league/all
// @desc    Get all leagues
router.get("/all", (req, res) => {
  const errors = {};
  League.find()
    .populate("team", ["name", "level"])
    .then(league => {
      if (!league) {
        errors.noleague = "There are no leagues";
        return res.status(404).json(errors);
      }

      res.json(league);
    })
    .catch(err => res.status(404).json({ league: "There are no leagues" }));
});

// @route   GET api/league/team/:team_id
// @desc    Get all leagues of specific team
router.get("/team/:team_id", (req, res) => {
  const errors = {};
  League.find({ team: req.params.team_id })
    .then(league => {
      if (!league) {
        errors.noleague = "There are no leagues for this team";
        return res.status(404).json(errors);
      }

      res.json(league);
    })
    .catch(err =>
      res.status(404).json({ league: "There are no leagues for this team" })
    );
});

// @route   GET api/league/:league_id
// @desc    Get league by ID
router.get("/:league_id", (req, res) => {
  const errors = {};
  League.findOne({ _id: req.params.league_id })
    .then(league => {
      if (!league) {
        errors.noleague = "There is no league for this ID";
        return res.status(404).json(errors);
      }

      res.json(league);
    })
    .catch(err =>
      res.status(404).json({ league: "There is no league for this ID" })
    );
});

///////////////////////////////////////
/////            POST             ////
/////////////////////////////////////

// @route   POST api/league
// @desc    Create league
router.post("/", (req, res) => {
  const { errors, isValid } = validateLeagueInput(req.body);

  // Check Validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }

  // Get fields
  const leagueFields = {};
  leagueFields.team = req.body.team;
  leagueFields.name = req.body.name;
  leagueFields.shortName = req.body.shortName;
  leagueFields.seasonType = req.body.seasonType;

  // Create league
  new League(leagueFields).save().then(league => {
    res.json(league);
  });
});

// @route   POST api/league/:league_id
// @desc    Edit league
router.post("/:league_id", (req, res) => {
  const { errors, isValid } = validateLeagueInput(req.body);

  // Check Validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }

  // Get fields
  const leagueFields = {};
  leagueFields.team = req.body.team;
  leagueFields.name = req.body.name;
  leagueFields.shortName = req.body.shortName;
  leagueFields.seasonType = req.body.seasonType;

  League.findOne({ _id: req.params.league_id }).then(league => {
    if (league) {
      // Update league
      League.findOneAndUpdate(
        { _id: req.params.league_id },
        { $set: leagueFields },
        { new: true }
      ).then(league => res.json(league));
    } else {
      res.status(404).json({ league: "There is no league for this ID" });
    }
  });
});

///////////////////////////////////////
/////          DELETE             ////
/////////////////////////////////////

// @route   DELETE api/league/:league_id
// @desc    Delete league
router.delete("/:league_id", (req, res) => {
  League.findOneAndRemove({ _id: req.params.league_id }).then(() => {
    res.json({ success: true });
  });
});

module.exports = router;
