const express = require('express');
const router = express.Router();
const {
    createCustomToken
} = require('../Controllers/customTokenController.js');

router.post('/createToken', createCustomToken);

module.exports = router;