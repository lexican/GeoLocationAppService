const express = require('express');
const AppService = require('../controllers/AppService');

const router = express.Router();

//INDEX
router.get('/Service',  AppService.index);


module.exports = router;

