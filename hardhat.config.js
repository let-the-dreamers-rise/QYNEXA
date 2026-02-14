require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: ".env.local" });

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    skaleCalypso: {
      url: process.env.NEXT_PUBLIC_SKALE_RPC_URL || "https://testnet.skalenodes.com/v1/giant-half-dual-testnet",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 974399131,
    },
    skaleNebula: {
      url: "https://testnet.skalenodes.com/v1/lanky-ill-funny-testnet",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 37084624,
    },
    skaleEuropa: {
      url: "https://testnet.skalenodes.com/v1/juicy-low-small-testnet",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 1444673419,
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test/contracts",
    cache: "./cache",
    artifacts: "./artifacts",
  },
};
