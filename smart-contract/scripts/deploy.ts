import { ethers, run } from "hardhat";

const verify = async (contractAddress: string, args: any[]) => {
  console.log("Verifying contract...");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e: any) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already Verified!");
    } else {
      console.log(e);
    }
  }
};

async function main() {
  const Transactions = await ethers.getContractFactory("Transactions");
  const transactions = await Transactions.deploy();
  await transactions.deployed();
  await verify(transactions.address, []);
  console.log(`Deployed to ${transactions.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
