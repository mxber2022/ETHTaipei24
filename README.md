# ETHTaipei24
 
ContractAddress: 0x9d3F37D1F55Fe00D860C81abb1542FA68e613770

**Giveaway Smart Contract**

The farcaster giveaway systemt is a decentralized application (DApp) built on the Ethereum blockchain that allows users to participate in and host giveaways using USDC (a stablecoin). This contract provides a transparent and secure way to conduct giveaways, ensuring fairness for all participants.

### Key Features

1. **Participation**: Users can enter the giveaway by whitelisting their address.
2. **Manager Control**: The contract manager has exclusive control over managing the giveaway, including whitelisting addresses, removing addresses from the whitelist, and selecting winners.
3. **Whitelisting**: Only addresses that are whitelisted by the manager can participate in the giveaway, adding an extra layer of control and security.
4. **Random Winner Selection**: Winners are selected pseudo-randomly based on the block timestamp, ensuring fairness in the selection process.
5. **Pot Distribution**: The entire pot of USDC tokens accumulated from participant entries is awarded to the randomly selected winner.
6. **Security**: The contract is designed to be secure, with necessary checks and conditions to prevent unauthorized access and ensure the integrity of the giveaway process.

### How It Works

1. **Deployment**: The contract is deployed to the Ethereum blockchain, specifying the address of the USDC token contract.
2. **Whitelisting**: The contract manager whitelists addresses allowed to participate in the giveaway using the `whitelistAddress` function.
3. **Participation**: Whitelisted addresses can enter the giveaway by calling the `enter` function and sending the required amount of USDC tokens.
4. **Winner Selection**: When the giveaway ends, the manager selects a winner by calling the `pickGiveAwayWinner` function. The winner is chosen randomly from the pool of whitelisted participants.
5. **Prize Distribution**: The entire pot of USDC tokens collected from participant entries is transferred to the selected winner.
6. **Resetting for Next Round**: After selecting a winner, the contract is reset for the next round of the giveaway.

### Security Considerations

- **Randomness**: While winner selection is based on block timestamp randomness, consider incorporating external randomness sources for enhanced security.
- **Permissions**: Ensure that only authorized addresses have permission to perform critical functions like picking winners.
- **Testing**: Thoroughly test the contract in various scenarios to identify and fix potential vulnerabilities.

### Get Started

To deploy and interact with the giveaway contract:

1. Clone the repository containing the contract code.
2. Compile the contract using a Solidity compiler.
3. Deploy the contract to the Ethereum blockchain using tools like Remix or Truffle.
4. Interact with the deployed contract using a web3 provider such as MetaMask or a custom DApp.

### Support

For questions, assistance, or contributions, please visit the GitHub repository and open an issue. Your feedback and contributions are highly appreciated!

### License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
