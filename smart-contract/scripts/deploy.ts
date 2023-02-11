import { ethers } from 'hardhat';
// import hre
import hre from 'hardhat';

async function main() {
	const Whitelist = await ethers.getContractFactory('Whitelist');
	const whitelist = await Whitelist.deploy(10);

	await whitelist.deployed();

	console.log(
		`Whitelist smart-contract has been deployed on mumbai testnet at address: ${whitelist.address}`
	);
	
  console.log('Sleeping.....');
	// Wait for etherscan to notice that the contract has been deployed
	await sleep(40000);

	// Verify the contract after deploying
	await hre.run('verify:verify', {
		address: whitelist.address,
		constructorArguments: [10],
	});
}

function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
