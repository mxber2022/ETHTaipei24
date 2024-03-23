require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    'thunder-testnet': {
      url: 'https://testnet-rpc.thundercore.com',
      chainId: 18,
      gas: 90000000,
      gasPrice: 15e9,
      accounts: process.env.KEY ? [process.env.KEY] : [],
    },
    'thunder-mainnet': {
      url: 'https://mainnet-rpc.thundercore.com',
      chainId: 108,
      gas: 90000000,
      gasPrice: 15e9,
      accounts: process.env.KEY ? [process.env.KEY] : [],
    },
  },
}