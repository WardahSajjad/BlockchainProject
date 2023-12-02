const express = require('express');
const router = express.Router();
const {
    verifyToken,
    checkBalance,
    transferToken,
    transactionHistory
    
} = require('../Controllers/transactionController.js');

router.post('/transferTokens',  transferToken);
router.get('/checkBalance/:address', checkBalance);
router.get('/transactionHistory/:address', transactionHistory)


module.exports = router;  