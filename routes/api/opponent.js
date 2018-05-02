const express = require("express");
const router = express.Router();

// Load Input Validation
const validateOpponentInput = require("../../validation/opponent");

// Load Opponent model
const Opponent = require("../../models/Opponent");

///////////////////////////////////////
/////            GET              ////
/////////////////////////////////////

// @route   GET api/opponent/all
// @desc    Get all opponents
router.get("/all", (req, res) => {
  const errors = {};
  Opponent.find()
    .then(opponent => {
      if (!opponent) {
        errors.noopponent = "There are no opponents";
        return res.status(404).json(errors);
      }

      res.json(opponent);
    })
    .catch(err => res.status(404).json({ opponent: "There are no opponents" }));
});

// @route   GET api/opponent/:opponent_id
// @desc    Get opponent by ID
router.get("/:opponent_id", (req, res) => {
  const errors = {};
  Opponent.findOne({ _id: req.params.opponent_id })
    .then(opponent => {
      if (!opponent) {
        errors.noopponent = "There is no opponent for this ID";
        return res.status(404).json(errors);
      }

      res.json(opponent);
    })
    .catch(err =>
      res.status(404).json({ opponent: "There is no opponent for this ID" })
    );
});

///////////////////////////////////////
/////            POST             ////
/////////////////////////////////////

// @route   POST api/opponent
// @desc    Create opponent
router.post("/", (req, res) => {
  const { errors, isValid } = validateOpponentInput(req.body);

  // Check Validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }

  // Get fields
  const opponentFields = {};
  opponentFields.contact = {};
  opponentFields.team = req.body.team;
  opponentFields.name = req.body.name;
  if (req.body.contactName) opponentFields.contact.name = req.body.contactName;
  if (req.body.contactAddress)
    opponentFields.contact.address = req.body.contactAddress;
  if (req.body.contactEmail)
    opponentFields.contact.email = req.body.contactEmail;
  if (req.body.homeUniform) opponentFields.homeUniform = req.body.homeUniform;
  if (req.body.awayUniform) opponentFields.awayUniform = req.body.awayUniform;
  if (req.body.notes) opponentFields.notes = req.body.notes;

  // Create opponent
  new Opponent(opponentFields).save().then(opponent => {
    res.json(opponent);
  });
});

// @route   POST api/opponent/:opponent_id
// @desc    Edit opponent
router.post("/:opponent_id", (req, res) => {
  const { errors, isValid } = validateOpponentInput(req.body);

  // Check Validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }

  // Get fields
  const opponentFields = {};
  opponentFields.contact = {};
  opponentFields.team = req.body.team;
  opponentFields.name = req.body.name;
  if (req.body.contactName) opponentFields.contact.name = req.body.contactName;
  if (req.body.contactAddress)
    opponentFields.contact.address = req.body.contactAddress;
  if (req.body.contactEmail)
    opponentFields.contact.email = req.body.contactEmail;
  if (req.body.homeUniform) opponentFields.homeUniform = req.body.homeUniform;
  if (req.body.awayUniform) opponentFields.awayUniform = req.body.awayUniform;
  if (req.body.notes) opponentFields.notes = req.body.notes;

  Opponent.findOne({ _id: req.params.opponent_id }).then(opponent => {
    if (opponent) {
      // Update opponent
      Opponent.findOneAndUpdate(
        { _id: req.params.opponent_id },
        { $set: opponentFields },
        { new: true }
      ).then(opponent => res.json(opponent));
    } else {
      res.status(404).json({ opponent: "There is no opponent for this ID" });
    }
  });
});

///////////////////////////////////////
/////          DELETE             ////
/////////////////////////////////////

// @route   DELETE api/opponent/:opponent_id
// @desc    Delete opponent
router.delete("/:opponent_id", (req, res) => {
  Opponent.findOneAndRemove({ _id: req.params.opponent_id }).then(() => {
    res.json({ success: true });
  });
});

module.exports = router;
