const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("./config/keys");

const team = require("./routes/api/team");
const location = require("./routes/api/location");
const opponent = require("./routes/api/opponent");
const player = require("./routes/api/player");
const league = require("./routes/api/league");

const app = express();

// Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB config
const db = config.mongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Routes
app.use("/api/team", team);
app.use("/api/location", location);
app.use("/api/opponent", opponent);
app.use("/api/player", player);
app.use("/api/league", league);

app.listen(config.port, () =>
  console.log(`Server running on port ${config.port}`)
);

module.exports = app;
