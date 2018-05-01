const express = require("express");
const router = express.Router();

// Load Input Validation
const validateTeamInput = require("../../validation/team");

// Load Team model
const Team = require("../../models/Team");

///////////////////////////////////////
/////            GET              ////
/////////////////////////////////////

// @route   GET api/team/all
// @desc    Get all teams
router.get("/all", (req, res) => {
  const errors = {};
  Team.find()
    .then(team => {
      if (!team) {
        errors.noteam = "There are no teams";
        return res.status(404).json(errors);
      }

      res.json(team);
    })
    .catch(err => res.status(404).json({ team: "There are no teams" }));
});

// @route   GET api/team/:team_id
// @desc    Get team by ID
router.get("/:team_id", (req, res) => {
  const errors = {};
  Team.findOne({ _id: req.params.team_id })
    .then(team => {
      if (!team) {
        errors.noteam = "There is no team for this ID";
        return res.status(404).json(errors);
      }

      res.json(team);
    })
    .catch(err =>
      res.status(404).json({ team: "There is no team for this ID" })
    );
});

///////////////////////////////////////
/////            POST             ////
/////////////////////////////////////

// @route   POST api/team
// @desc    Create team
router.post("/", (req, res) => {
  const { errors, isValid } = validateTeamInput(req.body);

  // Check Validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }

  // Get fields
  const teamFields = {};
  teamFields.name = req.body.name;
  teamFields.level = req.body.level;
  if (req.body.defHomeUniform)
    teamFields.defHomeUniform = req.body.defHomeUniform;
  if (req.body.defAwayUniform)
    teamFields.defAwayUniform = req.body.defAwayUniform;

  // Create team
  new Team(teamFields).save().then(team => {
    res.json(team);
  });
});

// @route   POST api/team/:team_id
// @desc    Edit team
router.post("/:team_id", (req, res) => {
  const { errors, isValid } = validateTeamInput(req.body);

  // Check Validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }

  // Get fields
  const teamFields = {};
  if (req.body.name) teamFields.name = req.body.name;
  if (req.body.level) teamFields.level = req.body.level;
  if (req.body.defHomeUniform)
    teamFields.defHomeUniform = req.body.defHomeUniform;
  if (req.body.defAwayUniform)
    teamFields.defAwayUniform = req.body.defAwayUniform;

  Team.findOne({ _id: req.params.team_id }).then(team => {
    if (team) {
      // Update team
      Team.findOneAndUpdate(
        { _id: req.params.team_id },
        { $set: teamFields },
        { new: true }
      ).then(team => res.json(team));
    } else {
      res.status(404).json({ team: "There is no team for this ID" });
    }
  });
});

module.exports = router;
