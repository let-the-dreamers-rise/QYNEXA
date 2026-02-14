const hre = require("hardhat");

async function main() {
  console.log("Deploying PremiumUnlock contract to SKALE Calypso Testnet...");

  // Get the deployer account
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  // Get account balance
  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", hre.ethers.formatEther(balance), "sFUEL");

  // Deploy the contract
  const PremiumUnlock = await hre.ethers.getContractFactory("PremiumUnlock");
  const premiumUnlock = await PremiumUnlock.deploy();

  await premiumUnlock.waitForDeployment();

  const contractAddress = await premiumUnlock.getAddress();
  console.log("PremiumUnlock deployed to:", contractAddress);

  // Get unlock price
  const unlockPrice = await premiumUnlock.UNLOCK_PRICE();
  console.log("Unlock price:", hre.ethers.formatEther(unlockPrice), "sFUEL");

  console.log("\n✅ Deployment successful!");
  console.log("\nAdd this to your .env.local file:");
  console.log(`NEXT_PUBLIC_CONTRACT_ADDRESS=${contractAddress}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
