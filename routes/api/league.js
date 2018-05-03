const express = require("express");
const router = express.Router();

// Load Input Validation
const validateLeagueInput = require("../../validation/league");
const validateRosterInput = require("../../validation/roster");

// Load League model
const League = require("../../models/League");
// Load Player model
const Player = require("../../models/Player");

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

// @route   GET api/league/roster
// @desc    Get all player added to roster of league
router.get("/roster/:league_id", (req, res) => {
  const errors = {};
  League.findOne({ _id: req.params.league_id })
    .populate({
      path: "roster.player",
      options: { $sort: { lastname: -1 } }
    })
    .then(league => {
      if (!league) {
        errors.noleague = "There are no leagues";
        return res.status(404).json(errors);
      }

      res.json(league.roster);
    })
    .catch(err => res.status(404).json({ league: "There are no leagues" }));
});

// @route   GET api/league/:league_id
// @desc    Get league by ID
router.get("/:league_id", (req, res) => {
  const errors = {};
  League.findOne({ _id: req.params.league_id })
    .populate("team", ["name", "level"])
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

// @route   POST api/league/roster
// @desc    Add player to roster
router.post("/roster/:league_id", (req, res) => {
  const { errors, isValid } = validateRosterInput(req.body, req.params);

  // Check Validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }

  Player.findOne({ _id: req.body.player }).then(player => {
    if (player) {
      // Check league
      League.findOne({ _id: req.params.league_id }).then(league => {
        if (league) {
          // Update roster
          const newPlayer = {
            player: req.body.player
          };
          // Check if player is already added to roster
          if (
            !league.roster.find(player => {
              if (player.player == newPlayer.player) {
                return player;
              }
            })
          ) {
            league.roster.push(newPlayer);

            league.save().then(league => {
              res.json(league);
            });
          } else {
            res.status(400).json({ player: "Player is already in roster" });
          }
        } else {
          res.status(404).json({ league: "There is no league for this ID" });
        }
      });
    } else {
      res.status(404).json({ player: "Player doesn't exists" });
    }
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

// @route   DELETE api/league/roster
// @desc    Delete player from league roster
router.delete("/roster/:league_id", (req, res) => {
  Player.findOne({ _id: req.body.player }).then(player => {
    if (player) {
      // Check league
      League.findOne({ _id: req.params.league_id }).then(league => {
        if (league) {
          // Check if player is already added to roster
          const index = league.roster.findIndex(player => {
            if (player.player == req.body.player) {
              return player;
            }
          });

          if (index > -1) {
            league.roster.splice(index, 1);

            league.save().then(league => {
              res.json(league);
            });
          } else {
            res
              .status(400)
              .json({ player: "Player doesn't exists in this roster" });
          }
        } else {
          res.status(404).json({ league: "There is no league for this ID" });
        }
      });
    } else {
      res.status(404).json({ player: "Player doesn't exists" });
    }
  });
});

// @route   DELETE api/league/:league_id
// @desc    Delete league
router.delete("/:league_id", (req, res) => {
  League.findOneAndRemove({ _id: req.params.league_id }).then(() => {
    res.json({ success: true });
  });
});

module.exports = router;
