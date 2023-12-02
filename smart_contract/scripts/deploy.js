// const { ethers } = require("hardhat");

// async function main() {
//   // Deploy CustomToken contract
//   const UserCustomTokenFactory = await ethers.getContractFactory("UserCustomTokenFactory");
//   const userCustomTokenFactory = await UserCustomTokenFactory.deploy();

//   await userCustomTokenFactory.deployed();

//   console.log("CustomToken deployed to:", userCustomTokenFactory.address);
// }

// main()
//   .then(() => process.exit(0))
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   });



const { ethers } = require("hardhat");

async function main() {
  // Deploy TransactionContract contract
  const TransactionContract = await ethers.getContractFactory("TransactionContract");
  const transactionContract = await TransactionContract.deploy("TransactionToken", "TT");

  await transactionContract.deployed();

  console.log("TransactionContract deployed to:", transactionContract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

