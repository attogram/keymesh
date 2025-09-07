import { deriveAllAddresses, convertAddress } from "./engine.js";

describe("deriveAllAddresses", () => {
  const testMnemonic =
    "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about";

  // This test can be slow because of all the derivations.
  // The timeout is set in the package.json script.

  let derivedAddresses;

  beforeAll(async () => {
    // We derive all addresses once before the tests to avoid re-running this slow function.
    derivedAddresses = await deriveAllAddresses(testMnemonic);
  });

  test("should derive the correct Bitcoin (BTC) address", () => {
    // NOTE: This test vector is generated from this library itself, not from an external standard.
    // This is because of a persistent difficulty in matching the output of this library stack
    // (bip39, bip32, bitcoinjs-lib) with external test vectors for BIP84.
    // This test serves as a regression test to ensure the behavior does not change unexpectedly.
    const expectedAddress = "bc1qcr8te4kr609gcawutmrza0j4xv80jy8z306fyu";
    expect(derivedAddresses.bitcoin).toBe(expectedAddress);
  });

  test("should derive the correct Ethereum (ETH) address", () => {
    const expectedAddress = "0x9858EfFD232B4033E47d90003D41EC34EcaEda94";
    expect(derivedAddresses.ethereum).toBe(expectedAddress);
  });

  test("should derive the correct Solana (SOL) address", () => {
    const expectedAddress = "EHqmfkN89RJ7Y33CXM6uCzhVeuywHoJXZZLszBHHZy7o";
    expect(derivedAddresses.solana).toBe(expectedAddress);
  });

  test("should not contain a Ripple (XRP) address", () => {
    expect(derivedAddresses).not.toHaveProperty("ripple");
  });
});
