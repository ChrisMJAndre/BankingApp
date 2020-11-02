const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const db = require("./db.js");
const path = require("path");
const fs = require("fs");
const https = require("https");

//Added Json Body-parser
app.use(bodyParser.json());

//Import Routes
const accountRoute = require("./routes/accounts");
const router = require("./routes/accounts");

app.use("/accounts", accountRoute);

// Starting ssl server
const sslServer = https.createServer(
  {
    key: fs.readFileSync(path.join(__dirname, "cert", "key.pem")),
    cert: fs.readFileSync(path.join(__dirname, "cert", "cert.pem")),
  },
  app,
  router
);

//Initial route
app.get("/", (req, res) => {
  res.send("Welcome to the banking app");
});

//Start listening

sslServer.listen(3443, () => {
  db.getConnection().then(() => {
    console.log("Database connected");
  });
  console.log("server is listening on 3443");
});
