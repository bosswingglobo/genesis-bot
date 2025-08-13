require("dotenv").config();
require("@nomiclabs/hardhat-ethers");

// Helper function to validate env variables
function requireEnv(name) {
  if (!process.env[name] || process.env[name].trim() === "") {
    throw new Error(`❌ Missing required environment variable: ${name}`);
  }
  return process.env[name];
}

// Validate all needed secrets before exporting config
const PRIVATE_KEY = requireEnv("PRIVATE_KEY");
const BASE_MAINNET_URL = requireEnv("BASE_MAINNET_URL");
const BASE_SEPOLIA_URL = requireEnv("BASE_SEPOLIA_URL");

module.exports = {
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: { enabled: true, runs: 200 },
    },
  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    baseMainnet: {
      url: BASE_MAINNET_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
    baseSepolia: {
      url: BASE_SEPOLIA_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
};
