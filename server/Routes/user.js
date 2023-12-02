const express = require('express');
const router = express.Router();
const {
    registerUser,
    loginUser,
} = require('../Controllers/userController.js');
const auth = require('../Middleware/auth.js');


router.post('/register', registerUser);
router.post('/login', loginUser);



module.exports = router;  