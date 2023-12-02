// hardhat.config.js
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require('dotenv').config();

module.exports = {
  solidity: "0.8.20",
  networks: {
    hardhat: {},
    goerli: {
      url: process.env.INFURA_API_URL,
      accounts: [process.env.ACCOUNT_PRIVATE_KEY],
    },
  },
};
