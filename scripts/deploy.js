const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with:", deployer.address);
  console.log("Balance:", hre.ethers.formatEther(await hre.ethers.provider.getBalance(deployer.address)));

  // 1. Deploy ForgeToken
  console.log("\n1. Deploying ForgeToken...");
  const ForgeToken = await hre.ethers.getContractFactory("ForgeToken");
  const forgeToken = await ForgeToken.deploy(deployer.address);
  await forgeToken.waitForDeployment();
  console.log("   ForgeToken:", await forgeToken.getAddress());

  // 2. Deploy AgentRegistry
  console.log("\n2. Deploying AgentRegistry...");
  const AgentRegistry = await hre.ethers.getContractFactory("AgentRegistry");
  const agentRegistry = await AgentRegistry.deploy();
  await agentRegistry.waitForDeployment();
  console.log("   AgentRegistry:", await agentRegistry.getAddress());

  // 3. Deploy LicenseManager
  console.log("\n3. Deploying LicenseManager...");
  const LicenseManager = await hre.ethers.getContractFactory("LicenseManager");
  const licenseManager = await LicenseManager.deploy(await agentRegistry.getAddress());
  await licenseManager.waitForDeployment();
  console.log("   LicenseManager:", await licenseManager.getAddress());

  // 4. Deploy ReputationOracle
  console.log("\n4. Deploying ReputationOracle...");
  const ReputationOracle = await hre.ethers.getContractFactory("ReputationOracle");
  const reputationOracle = await ReputationOracle.deploy(await agentRegistry.getAddress());
  await reputationOracle.waitForDeployment();
  console.log("   ReputationOracle:", await reputationOracle.getAddress());

  // 5. Deploy PaymentRouter
  console.log("\n5. Deploying PaymentRouter...");
  const PaymentRouter = await hre.ethers.getContractFactory("PaymentRouter");
  const paymentRouter = await PaymentRouter.deploy(await licenseManager.getAddress());
  await paymentRouter.waitForDeployment();
  console.log("   PaymentRouter:", await paymentRouter.getAddress());

  console.log("\n✅ All contracts deployed!");
  console.log("\n📋 Contract Addresses:");
  console.log(JSON.stringify({
    ForgeToken: await forgeToken.getAddress(),
    AgentRegistry: await agentRegistry.getAddress(),
    LicenseManager: await licenseManager.getAddress(),
    ReputationOracle: await reputationOracle.getAddress(),
    PaymentRouter: await paymentRouter.getAddress(),
  }, null, 2));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
