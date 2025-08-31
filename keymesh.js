#!/usr/bin/env node

import { program } from "commander";
import { deriveAllAddresses, convertAddress } from "./js/engine.js";

program
  .name("keymesh")
  .description(
    "A CLI tool to generate a mesh of cryptocurrency addresses or convert address formats."
  )
  .version("1.0.0");

program
  .command("derive <seed_phrase>")
  .description("Derive addresses for multiple chains from a BIP39 seed phrase.")
  .action(async (seed_phrase) => {
    try {
      console.log("Deriving addresses from seed phrase...\n");
      const addresses = await deriveAllAddresses(seed_phrase);
      console.log("--- Derived Addresses ---");
      for (const [chain, address] of Object.entries(addresses)) {
        const chainName = chain
          .replace(/_/g, " ")
          .replace(/\b\w/g, (l) => l.toUpperCase());
        // Simple padding for alignment
        const paddedName = `${chainName}:`.padEnd(20, " ");
        console.log(`${paddedName}${address}`);
      }
      console.log("\nWarning: Handle your seed phrase with extreme care.");
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
  });

program
  .command("convert <address>")
  .description(
    "Convert a cryptocurrency address to other native formats (Feature in development)."
  )
  .action((address) => {
    console.log("Converting address...");
    const result = convertAddress(address);
    if (result.error) {
      console.error(`Error: ${result.error}`);
    } else {
      console.log(JSON.stringify(result, null, 2));
    }
  });

program.parse(process.argv);

// If no command is given, show help
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
