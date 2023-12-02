const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const config = require('../config.js');
const User = require('../Model/userModel.js');
const ethers = require('ethers'); 


// User registration
const registerUser = async (req, res) => {
  try {
    const { name, gender, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const wallet = ethers.Wallet.createRandom();
    const ethereumAddress = wallet.address;
    console.log = ethereumAddress
    // Create a new user with the Ethereum address
   
    const newUser = new User({ name, gender, email, password: hashedPassword, ethereumAddress });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
  
};  

// User login
const loginUser = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({ message: 'Login failed', user: user });
    }
    req.login(user, { session: false }, err => {
      if (err) return next(err);
      const ethereumAddress = user.ethereumAddress;
      console.log = ethereumAddress;

      // Generate a JWT token for authentication with Ethereum address
      const token = jwt.sign({ username: user.username, ethereumAddress }, config.secretKey);
  
      return res.json({ message: 'Login successful', token , ethereumAddress});
    });
  })(req, res, next); 
};

module.exports ={
    registerUser,
    loginUser
}