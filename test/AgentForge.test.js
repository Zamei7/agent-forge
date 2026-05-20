const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("AgentForge", function () {
  let forgeToken, agentRegistry, licenseManager, reputationOracle, paymentRouter;
  let owner, creator, user;

  beforeEach(async function () {
    [owner, creator, user] = await ethers.getSigners();

    // Deploy all contracts
    const ForgeToken = await ethers.getContractFactory("ForgeToken");
    forgeToken = await ForgeToken.deploy(owner.address);
    await forgeToken.waitForDeployment();

    const AgentRegistry = await ethers.getContractFactory("AgentRegistry");
    agentRegistry = await AgentRegistry.deploy();
    await agentRegistry.waitForDeployment();

    const LicenseManager = await ethers.getContractFactory("LicenseManager");
    licenseManager = await LicenseManager.deploy(await agentRegistry.getAddress());
    await licenseManager.waitForDeployment();

    const ReputationOracle = await ethers.getContractFactory("ReputationOracle");
    reputationOracle = await ReputationOracle.deploy(await agentRegistry.getAddress());
    await reputationOracle.waitForDeployment();

    const PaymentRouter = await ethers.getContractFactory("PaymentRouter");
    paymentRouter = await PaymentRouter.deploy(await licenseManager.getAddress());
    await paymentRouter.waitForDeployment();
  });

  describe("ForgeToken", function () {
    it("Should have correct name and symbol", async function () {
      expect(await forgeToken.name()).to.equal("AgentForge");
      expect(await forgeToken.symbol()).to.equal("FORGE");
    });

    it("Should mint total supply to deployer", async function () {
      const totalSupply = await forgeToken.totalSupply();
      expect(totalSupply).to.equal(ethers.parseEther("1000000000")); // 1B
    });
  });

  describe("AgentRegistry", function () {
    it("Should register an agent with stake", async function () {
      const stakeAmount = ethers.parseEther("100");

      const tx = await agentRegistry.connect(creator).registerAgent(
        "TestAgent",
        "A test AI agent",
        "ipfs://QmTest...",
        0, // CodingAssistant
        [0], // Reasoning capability
        { value: stakeAmount }
      );

      const receipt = await tx.wait();
      const event = receipt.logs.find(
        (log) => log.fragment?.name === "AgentRegistered"
      );
      expect(event).to.not.be.undefined;

      const agent = await agentRegistry.getAgent(1);
      expect(agent.name).to.equal("TestAgent");
      expect(agent.creator).to.equal(creator.address);
      expect(agent.isActive).to.be.true;
    });

    it("Should reject registration with insufficient stake", async function () {
      await expect(
        agentRegistry.connect(creator).registerAgent(
          "TestAgent",
          "A test agent",
          "ipfs://...",
          0,
          [0],
          { value: ethers.parseEther("10") } // Below 100 minimum
        )
      ).to.be.revertedWith("Insufficient stake");
    });

    it("Should track agents by creator", async function () {
      await agentRegistry.connect(creator).registerAgent(
        "Agent1", "First agent", "ipfs://1", 0, [0],
        { value: ethers.parseEther("100") }
      );
      await agentRegistry.connect(creator).registerAgent(
        "Agent2", "Second agent", "ipfs://2", 1, [0],
        { value: ethers.parseEther("100") }
      );

      const agents = await agentRegistry.getAgentsByCreator(creator.address);
      expect(agents.length).to.equal(2);
    });

    it("Should increment invocation count", async function () {
      await agentRegistry.connect(creator).registerAgent(
        "TestAgent", "Test", "ipfs://", 0, [0],
        { value: ethers.parseEther("100") }
      );

      await agentRegistry.incrementInvocationCount(1);
      await agentRegistry.incrementInvocationCount(1);

      const agent = await agentRegistry.getAgent(1);
      expect(agent.invocationCount).to.equal(2);
    });
  });

  describe("ReputationOracle", function () {
    beforeEach(async function () {
      await agentRegistry.connect(creator).registerAgent(
        "TestAgent", "Test", "ipfs://", 0, [0],
        { value: ethers.parseEther("100") }
      );
    });

    it("Should accept ratings", async function () {
      await reputationOracle.connect(user).submitRating(1, 5, "Great agent!");

      const rep = await reputationOracle.getReputation(1);
      expect(rep.totalRatings).to.equal(1);
      expect(rep.averageRating).to.equal(500); // 5.00 * 100
    });

    it("Should prevent double rating", async function () {
      await reputationOracle.connect(user).submitRating(1, 5, "Great!");

      await expect(
        reputationOracle.connect(user).submitRating(1, 4, "Again")
      ).to.be.revertedWith("Already rated");
    });

    it("Should track task completions", async function () {
      await reputationOracle.recordTaskCompletion(1, true);
      await reputationOracle.recordTaskCompletion(1, true);
      await reputationOracle.recordTaskCompletion(1, false);

      const rep = await reputationOracle.getReputation(1);
      expect(rep.taskCompletions).to.equal(2);
      expect(rep.taskFailures).to.equal(1);
      expect(rep.uptimeScore).to.equal(6666); // 2/3 * 10000
    });
  });
});
