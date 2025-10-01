const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying TokenFactory to Base network...");

  // Get the contract factory
  const TokenFactory = await ethers.getContractFactory("TokenFactory");

  // Deploy the contract
  const tokenFactory = await TokenFactory.deploy();

  // Wait for deployment to finish
  await tokenFactory.waitForDeployment();

  const address = await tokenFactory.getAddress();
  console.log("TokenFactory deployed to:", address);
  console.log("BaseScan URL:", `https://basescan.org/address/${address}`);
  
  // Verify the contract (optional, requires BASESCAN_API_KEY)
  try {
    if (process.env.BASESCAN_API_KEY) {
      console.log("Verifying contract...");
      await hre.run("verify:verify", {
        address: address,
        constructorArguments: [],
      });
      console.log("Contract verified successfully!");
    }
  } catch (error) {
    console.log("Verification failed:", error.message);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
