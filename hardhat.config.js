require('dotenv').config();
require('@nomicfoundation/hardhat-toolbox');

const {
  PRIVATE_KEY,
  API_URL,
  API_URL_SEPOLIA,
  BASESCAN_API_KEY
} = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: '0.8.20',
    settings: { optimizer: { enabled: true, runs: 200 } }
  },
  networks: {
    hardhat: {},
    baseMainnet: {
      url: API_URL,
      chainId: 8453,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : []
    },
    baseSepolia: {
      url: API_URL_SEPOLIA,
      chainId: 84532,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : []
    }
  },
  etherscan: {
    // BaseScan supports the Etherscan API
    apiKey: {
      base: BASESCAN_API_KEY || '',
      basesepolia: BASESCAN_API_KEY || ''
    },
    customChains: [
      {
        network: 'base',
        chainId: 8453,
        urls: {
          apiURL: 'https://api.basescan.org/api',
          browserURL: 'https://basescan.org/'
        }
      },
      {
        network: 'basesepolia',
        chainId: 84532,
        urls: {
          apiURL: 'https://api-sepolia.basescan.org/api',
          browserURL: 'https://sepolia.basescan.org/'
        }
      }
    ]
  }
};
