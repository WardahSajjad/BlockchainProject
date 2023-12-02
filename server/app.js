// // index.js

// const express = require('express');
// const Web3 = require('web3');

// const app = express();
// const port = process.env.PORT || 3000;

// // Connect to the Ethereum blockchain (replace with your Infura API key)
// const web3 = new Web3(new Web3.providers.HttpProvider('https://goerli.infura.io/v3/5ff57d5de5a940648a6b6f24241ecd15'));


// // Sample route to get the current block number
// app.get('/', async (req, res) => {
//   try {
//     const blockNumber = await web3.eth.getBlockNumber();
//     res.json({ blockNumber });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });


const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const session = require("express-session");
const User = require("./Model/userModel.js");
const config = require("./config.js");
const Web3 = require('web3');

const app = express();
const cors = require("cors");
const userRoutes = require("./Routes/user.js");
const customTokenRoute = require("./Routes/customToken.js");


app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 3000;


app.use(
  session({
    secret: config.secretKey,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());


passport.use(
  new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user) return done(null, false);
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) return done(null, false);
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});



mongoose.connect('mongodb+srv://wardasajjad54:i211240warda@cluster0.plfcwbj.mongodb.net/blockchainUser')
.then(() =>
 console.log('Connected to MongoDB...'),

)
.catch(err => console.error('Could not connect to MongoDB...'));   
app.use(express.urlencoded({ extended: false }));

// Ethereum configuration (replace with your Ethereum node URL)
//const ethereumNodeUrl = 'https://goerli.infura.io/v3/5ff57d5de5a940648a6b6f24241ecd15'; // Replace with your Infura project ID
const web3 = new Web3(new Web3.providers.HttpProvider('https://goerli.infura.io/v3/5ff57d5de5a940648a6b6f24241ecd15'));




app.use("/api/user", userRoutes);
app.use("/api/createtoken", customTokenRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});