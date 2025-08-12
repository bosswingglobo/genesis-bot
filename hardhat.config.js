require('dotenv').config();

module.exports = {
  solidity: "0.8.17",
  networks: {
    base: {
      url: process.env.BASE_MAINNET_RPC_URL,
      accounts: [process.env.RELAYER_PRIVATE_KEY],
      chainId: 8453,
    },
  },
};
