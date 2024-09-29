const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config();

const infuraKey = "058b3c53d6d84f37b25be9edf326514e";
const mnemonic = "your-metamask-seed-phrase";  // Replace with your MetaMask seed phrase

module.exports = {
  networks: {
    // Configuration for Sepolia testnet
    sepolia: {
      provider: () => new HDWalletProvider(mnemonic, `https://sepolia.infura.io/v3/${infuraKey}`),
      network_id: 11155111,  // Sepolia network ID
      gas: 5500000,          // Gas limit
      confirmations: 2,      // Number of confirmations to wait between deployments
      timeoutBlocks: 200,    // Number of blocks to wait before deployment times out
      skipDryRun: true       // Skip dry run before migrations
    },
  },
  compilers: {
    solc: {
      version: "0.8.0", // Specify your Solidity version here
    }
  }
};
