const express = require("express");
const router = express.Router();

// Load Input Validation
const validateTeamInput = require("../../validation/team");

// Load Team model
const Team = require("../../models/Team");

// @route   POST api/team
// @desc    Create or edit team
router.post("/", (req, res) => {
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

  Team.findOne({ name: req.body.name }).then(team => {
    if (team) {
      // Update team
      Team.findOneAndUpdate(
        { name: req.name },
        { $set: teamFields },
        { new: true }
      ).then(team => res.json(team));
    } else {
      console.log("False team: ", team);
      // Create team
      new Team(teamFields).save().then(team => {
        res.json(team);
      });
    }
  });
});

module.exports = router;
