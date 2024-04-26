const express = require('express');
const accountController = require('../controllers/account.controller');

const router = express.Router();

// Define your routes here. For example:
router.get('/', accountController.findAll);
router.get('/:id', accountController.findOne);
router.post('/', accountController.create);
router.put('/:id', accountController.update);
router.delete('/:id', accountController.delete);

module.exports = router;
