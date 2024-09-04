const hre = require("hardhat");

async function main() {

  const todo = await hre.ethers.getContractFactory("ToDoList");
  const contract = await todo.deploy();

  await contract.deployed();
  console.log(`contract deployed at ${contract.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
