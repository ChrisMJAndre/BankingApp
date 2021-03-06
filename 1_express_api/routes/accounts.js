const express = require("express");
const router = express.Router();

//Endpoint for all accounts
router.get("/", async (req, res) => {
  try {
    res.end("This is the GET endpoint on accounts");
  } catch (err) {
    console.log({ message: err });
  }
});

//Endpoint for adding user
router.post("/", async (req, res) => {
  const account = {
    name: req.body.name,
    balance: req.body.balance,
  };
  const message =
    "This is the post endpoint for accounts. We received the data seen under account";

  res.json({
    message,
    account,
  });
});

// Implement a new endpoint, that will be able to return a specific account by id.
router.get("/:id", function (req, res) {
  res.end("Here we should get the account with id: " + req.params.id);
});
module.exports = router;
