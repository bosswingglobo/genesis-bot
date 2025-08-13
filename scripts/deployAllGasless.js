// Generic deploy script that reads contracts+args from scripts/deployments.json
// NOTE: On mainnet, deployment still consumes gas — you'll need a funded signer or a relayer.

const { readFileSync, mkdirSync, writeFileSync } = require('fs');
const path = require('path');

async function main() {
  const network = hre.network.name;
  console.log(`\n🔧 Network: ${network}`);

  const configPath = path.join(__dirname, 'deployments.json');
  const outDir = path.join(process.cwd(), 'deployments');
  mkdirSync(outDir, { recursive: true });

  const { contracts } = JSON.parse(readFileSync(configPath, 'utf8'));
  if (!Array.isArray(contracts) || contracts.length === 0) {
    throw new Error('No contracts defined in scripts/deployments.json');
  }

  const results = [];

  for (const item of contracts) {
    const { name, args = [] } = item;
    if (!name) throw new Error('Contract entry missing "name"');

    console.log(`\n🚀 Deploying ${name} with args:`, args);
    const Factory = await hre.ethers.getContractFactory(name);
    const instance = await Factory.deploy(...args);
    await instance.waitForDeployment();
    const address = await instance.getAddress();
    console.log(`✅ Deployed ${name} at: ${address}`);

    // Optional verify (skips if no key provided)
    try {
      if (process.env.BASESCAN_API_KEY) {
        console.log(`🔍 Verifying ${name} ...`);
        await hre.run('verify:verify', { address, constructorArguments: args });
        console.log(`🔎 Verified ${name}`);
      } else {
        console.log('ℹ️ BASESCAN_API_KEY not set — skipping verify');
      }
    } catch (e) {
      console.warn(`⚠️ Verification skipped/failed for ${name}:`, e.message);
    }

    results.push({ name, address, args });
  }

  // Save last address for convenience
  const last = results[results.length - 1];
  writeFileSync(path.join(outDir, 'last-deploy-address.txt'), last.address);
  writeFileSync(
    path.join(outDir, `${Date.now()}-${network}.json`),
    JSON.stringify({ network, results }, null, 2)
  );

  console.log('\n📝 Deployment summary saved to /deployments');
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
