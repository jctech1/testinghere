const Account = require('../models/account.model');

// Create a new account
exports.create = async (req, res) => {
  try {
    const account = new Account(req.body);
    const result = await account.save();
    res.status(201).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Retrieve all accounts
exports.findAll = async (req, res) => {
  try {
    const accounts = await Account.find();
    res.status(200).send(accounts);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Retrieve a single account by id
exports.findOne = async (req, res) => {
  try {
    const account = await Account.findById(req.params.id);
    if (!account) {
      res.status(404).send("No account found");
    } else {
      res.status(200).send(account);
    }
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).send("Account not found");
    }
    res.status(500).send(error);
  }
};

// Update an account by id
exports.update = async (req, res) => {
  try {
    const account = await Account.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!account) {
      res.status(404).send("No account found");
    } else {
      res.status(200).send(account);
    }
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).send("Account not found");
    }
    res.status(500).send(error);
  }
};

// Delete an account by id
exports.delete = async (req, res) => {
  try {
    const account = await Account.findByIdAndRemove(req.params.id);
    if (!account) {
      res.status(404).send("No account found");
    } else {
      res.status(200).send("Account deleted successfully!");
    }
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).send("Account not found");
    }
    res.status(500).send(error);
  }
};
