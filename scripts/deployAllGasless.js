const hre = require("hardhat");
require("dotenv").config();

async function main() {
  const owner = process.env.OWNER_ADDRESS;
  const GenesisBot = await hre.ethers.getContractFactory("GenesisBot");
  const genesisBot = await GenesisBot.deploy(owner);

  await genesisBot.deployed();

  console.log(`GenesisBot deployed to: ${genesisBot.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
