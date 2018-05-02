const express = require("express");
const router = express.Router();

// Load Input Validation
const validateLocationInput = require("../../validation/location");

// Load Location model
const Location = require("../../models/Location");

///////////////////////////////////////
/////            GET              ////
/////////////////////////////////////

// @route   GET api/location/all
// @desc    Get all locations
router.get("/all", (req, res) => {
  const errors = {};
  Location.find()
    .then(location => {
      if (!location) {
        errors.nolocation = "There are no locations";
        return res.status(404).json(errors);
      }

      res.json(location);
    })
    .catch(err => res.status(404).json({ location: "There are no locations" }));
});

// @route   GET api/location/:location_id
// @desc    Get location by ID
router.get("/:location_id", (req, res) => {
  const errors = {};
  Location.findOne({ _id: req.params.location_id })
    .then(location => {
      if (!location) {
        errors.nolocation = "There is no location for this ID";
        return res.status(404).json(errors);
      }

      res.json(location);
    })
    .catch(err =>
      res.status(404).json({ location: "There is no location for this ID" })
    );
});

///////////////////////////////////////
/////            POST             ////
/////////////////////////////////////

// @route   POST api/location
// @desc    Create location
router.post("/", (req, res) => {
  const { errors, isValid } = validateLocationInput(req.body);

  // Check Validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }

  // Get fields
  const locationFields = {};
  locationFields.name = req.body.name;
  if (req.body.address) locationFields.address = req.body.address;
  if (req.body.city) locationFields.city = req.body.city;
  if (req.body.notes) locationFields.notes = req.body.notes;

  // Create location
  new Location(locationFields).save().then(location => {
    res.json(location);
  });
});

// @route   POST api/location/:location_id
// @desc    Edit location
router.post("/:location_id", (req, res) => {
  const { errors, isValid } = validateLocationInput(req.body);

  // Check Validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }

  // Get fields
  const locationFields = {};
  locationFields.name = req.body.name;
  if (req.body.address) locationFields.address = req.body.address;
  if (req.body.city) locationFields.city = req.body.city;
  if (req.body.notes) locationFields.notes = req.body.notes;

  Location.findOne({ _id: req.params.location_id }).then(location => {
    if (location) {
      // Update location
      Location.findOneAndUpdate(
        { _id: req.params.location_id },
        { $set: locationFields },
        { new: true }
      ).then(location => res.json(location));
    } else {
      res.status(404).json({ location: "There is no location for this ID" });
    }
  });
});

///////////////////////////////////////
/////          DELETE             ////
/////////////////////////////////////

// @route   DELETE api/location/:location_id
// @desc    Delete location
router.delete("/:location_id", (req, res) => {
  Location.findOneAndRemove({ _id: req.params.location_id }).then(() => {
    res.json({ success: true });
  });
});

module.exports = router;
