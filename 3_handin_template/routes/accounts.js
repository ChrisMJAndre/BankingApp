const express = require("express");
const router = express.Router();

const accountModel = require("../models/account.js");
/*
//Endpoint for all accounts
router.get("/", async (req, res) => {
  try {
    res.end("This is the GET endpoint on accounts");
  } catch (err) {
    console.log({ message: err });
  }
});
*/
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

// Implement a new endpoint, that will be able to return a specific balance by name.
router.get("/:name", async function (req, res) {
  let oneAccount = await accountModel
    .findOne({ firstName: req.params.name })
    .exec();
  let oneBalance = oneAccount.balance;
  res.send(req.params.name + "s balance is: " + oneBalance);
  //res.send(oneAccount.balance);
});

// Implement endpoint for showing all accounts
router.get("/", async (req, res) => {
  accountModel.find().then((accounts) => res.json({ accounts }));
});

// Implement endpoint to create a new User
router.post("/add", async (req, res) => {
  let create = await accountModel.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    balance: req.body.balance,
    branch: req.body.branch,
  });
  res.send(
    "User added: \n" +
      "Firstname: " +
      req.body.firstName +
      "\n Lastname: " +
      req.body.lastName +
      "\n Balance: " +
      req.body.balance +
      "\n Branch: " +
      req.body.branch
  );
  res.end(create);
});

module.exports = router;
