const hre = require("hardhat");

const networks = [
  {
    name: "SKALE Calypso Testnet",
    rpc: "https://testnet.skalenodes.com/v1/giant-half-dual-testnet",
    chainId: 974399131,
  },
  {
    name: "SKALE Nebula Testnet",
    rpc: "https://testnet.skalenodes.com/v1/lanky-ill-funny-testnet",
    chainId: 1351057110,
  },
  {
    name: "SKALE Europa Testnet",
    rpc: "https://testnet.skalenodes.com/v1/juicy-low-small-testnet",
    chainId: 1444673419,
  },
];

async function checkBalance(rpc, networkName, chainId) {
  try {
    const provider = new hre.ethers.JsonRpcProvider(rpc);
    const [deployer] = await hre.ethers.getSigners();
    const balance = await provider.getBalance(deployer.address);
    
    console.log(`\n${networkName} (Chain ID: ${chainId})`);
    console.log(`Address: ${deployer.address}`);
    console.log(`Balance: ${hre.ethers.formatEther(balance)} sFUEL`);
    
    return parseFloat(hre.ethers.formatEther(balance));
  } catch (error) {
    console.log(`\n${networkName}: Error - ${error.message}`);
    return 0;
  }
}

async function main() {
  console.log("Checking sFUEL balance across SKALE testnets...\n");
  console.log("=".repeat(60));

  let foundBalance = false;
  let networkWithBalance = null;

  for (const network of networks) {
    const balance = await checkBalance(network.rpc, network.name, network.chainId);
    if (balance > 0) {
      foundBalance = true;
      networkWithBalance = network;
    }
  }

  console.log("\n" + "=".repeat(60));

  if (foundBalance && networkWithBalance) {
    console.log("\n✅ Found sFUEL on:", networkWithBalance.name);
    console.log("\nTo deploy on this network, update your .env.local:");
    console.log(`NEXT_PUBLIC_SKALE_RPC_URL=${networkWithBalance.rpc}`);
    console.log(`NEXT_PUBLIC_CHAIN_ID=${networkWithBalance.chainId}`);
    
    console.log("\nThen run:");
    if (networkWithBalance.chainId === 974399131) {
      console.log("npm run deploy:contract");
    } else if (networkWithBalance.chainId === 1351057110) {
      console.log("npx hardhat run scripts/deploy.js --network skaleNebula");
    } else if (networkWithBalance.chainId === 1444673419) {
      console.log("npx hardhat run scripts/deploy.js --network skaleEuropa");
    }
  } else {
    console.log("\n❌ No sFUEL found on any testnet.");
    console.log("\nGet free sFUEL from:");
    console.log("- https://www.sfuelstation.com/");
    console.log("- https://docs.skale.network/tools/faucet");
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
