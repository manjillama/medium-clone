"use strict";

// const esConfig = require("./app/config/es-config");
require("dotenv").config();
const express = require("express");
const path = require("path");
const sequelize = require("./app/config/dbConnection.js");
const favicon = require("serve-favicon");
const router = require("./app/router");
const bodyParser = require("body-parser");
const createDDL = require("./app/config/createDDL");
const createRelationships = require("./app/config/createRelationships");
var cors = require("cors");
const fileUpload = require("express-fileupload");

const config = require("./app/config/config");

// Elasticsearch version ^6.0.0
// esConfig.client.ping(
//   {
//     requestTimeout: 30000
//   },
//   function(error) {
//     if (error) {
//       console.error("Elasticsearch cluster is down!");
//     } else {
//       console.log("Elastic cluster up and running...");
//     }
//   }
// );

sequelize
  .authenticate()
  .then(() => {
    console.log("Postgres connection has been established successfully.");
    console.log("---------------------------------");
    // Auto create table if not already exist
    createDDL();
    createRelationships();
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

// App
const app = express();
/*
 * Setting static folder
 */
app.use(express.static("public"));
app.use(config.imageResourceUrl, express.static(config.imageResourceDir()));

app.use(fileUpload());

const origins = [
  "http://threadly.vortexnepal.com",
  "https://threadly.vortexnepal.com",
  "http://www.threadly.vortexnepal.com",
  "https://www.threadly.vortexnepal.com"
];
app.use(cors({ origin: origins, credentials: true }));

app.use(favicon(path.join(__dirname, "favicon.ico")));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
router(app);

/**
 * If none of above route matches the request then we're gonna route it to our client react app
 */
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, function() {
  console.log("---------------------------------");
  console.log(`🚀 Server started on port ${PORT}...`);
  console.log("---------------------------------");
});
