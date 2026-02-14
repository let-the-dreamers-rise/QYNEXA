# Smart Contract Deployment Guide

## Prerequisites

1. MetaMask wallet with SKALE Calypso Testnet configured
2. Your wallet address: `0x2aF9Bd8b228012A7d9bbF8f3daBF6B222a9d8f51`
3. At least 0.1 sFUEL in your wallet (you already have this!)

## Setup Steps

### 1. Install Dependencies

```bash
cd onexa
npm install
```

This will install Hardhat and all required dependencies.

### 2. Add Your Private Key

Export your private key from MetaMask:
- Open MetaMask
- Click the three dots menu
- Select "Account Details"
- Click "Export Private Key"
- Enter your password
- Copy the private key

Add it to `.env.local`:
```
PRIVATE_KEY=your_actual_private_key_here
```

⚠️ **IMPORTANT**: Never commit your private key to git! It's already in `.gitignore`.

### 3. Compile the Contract

```bash
npm run compile:contract
```

This compiles the `PremiumUnlock.sol` contract.

### 4. Deploy to SKALE Calypso Testnet

```bash
npm run deploy:contract
```

This will:
- Deploy the contract to SKALE Calypso Testnet
- Show you the deployed contract address
- Display the unlock price (0.001 sFUEL)

### 5. Update .env.local

After deployment, copy the contract address from the output and update `.env.local`:

```
NEXT_PUBLIC_CONTRACT_ADDRESS=0xYourDeployedContractAddress
```

## Contract Details

### PremiumUnlock.sol

- **Unlock Price**: 0.001 sFUEL (very cheap for testing!)
- **Features**:
  - Users can unlock premium features by sending 0.001 sFUEL
  - Tracks which addresses have unlocked
  - Records unlock timestamps
  - Owner can withdraw collected funds
  - Automatic refund of excess payment

### Functions

- `unlock()` - Pay to unlock premium features
- `isUnlocked(address)` - Check if an address has unlocked
- `getUnlockDetails(address)` - Get unlock status and timestamp
- `withdraw()` - Owner can withdraw funds
- `getBalance()` - Check contract balance

## Testing the Contract

After deployment, you can test the unlock flow:

1. Start the Next.js app: `npm run dev`
2. Navigate to the simulation page
3. Complete a simulation
4. Click "Unlock Full Insights"
5. Connect your MetaMask wallet
6. Approve the transaction (0.001 sFUEL)
7. Premium insights will be unlocked!

## Troubleshooting

### "Insufficient funds" error
- Make sure you have at least 0.001 sFUEL in your wallet
- Check your wallet is connected to SKALE Calypso Testnet

### "Network mismatch" error
- Verify the RPC URL in `.env.local` matches your MetaMask network
- Chain ID should be `974399131`

### Deployment fails
- Check your private key is correct in `.env.local`
- Ensure you have enough sFUEL for gas fees
- Verify you're connected to the correct network

## Network Configuration

Add SKALE Calypso Testnet to MetaMask:

- **Network Name**: SKALE Calypso Testnet
- **RPC URL**: `https://testnet.skalenodes.com/v1/giant-half-dual-testnet`
- **Chain ID**: `974399131`
- **Currency Symbol**: `sFUEL`
- **Block Explorer**: `https://giant-half-dual-testnet.explorer.testnet.skalenodes.com`

## Security Notes

- Never share your private key
- The `.env.local` file is in `.gitignore` to prevent accidental commits
- For production, use a hardware wallet or secure key management system
- This is a testnet deployment - don't use real funds
