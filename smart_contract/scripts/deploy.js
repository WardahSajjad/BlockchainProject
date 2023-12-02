const { ethers } = require("hardhat");

async function main() {
  // Deploy CustomToken contract
  const UserCustomTokenFactory = await ethers.getContractFactory("UserCustomTokenFactory");
  const userCustomTokenFactory = await UserCustomTokenFactory.deploy();

  await userCustomTokenFactory.deployed();

  console.log("CustomToken deployed to:", userCustomTokenFactory.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
