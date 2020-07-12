const express = require('express');
const app = express.Router();
const webMasterController = require('../controllers/webMasterController');

app.post('/',webMasterController.registrerWebMaster);

module.exports = app;