import * as bip39 from "bip39";
import * as bitcoin from "bitcoinjs-lib";
import { ECPairFactory } from "ecpair";
import * as ecc from "tiny-secp256k1";
import { BIP32Factory } from "bip32";
import { HDNode } from "@ethersproject/hdnode";
import * as solanaWeb3 from "@solana/web3.js";
import * as stellar from "@stellar/stellar-sdk";
import { default as bitcore } from "bitcore-lib-cash";
import { default as dashcore } from "@dashevo/dashcore-lib";
import xrpl from "xrpl";

// Initialize libraries
console.log("Initializing ECC...");
bitcoin.initEccLib(ecc);
const bip32 = BIP32Factory(ecc);
const ECPair = ECPairFactory(ecc);
console.log("ECC Initialized.");

// Network definitions for bitcoinjs-lib
const networks = {
  bitcoin: bitcoin.networks.bitcoin,
  litecoin: {
    messagePrefix: "\x19Litecoin Signed Message:\n",
    bech32: "ltc",
    bip32: { public: 0x019da462, private: 0x019d9cfe },
    pubKeyHash: 0x30,
    scriptHash: 0x32,
    wif: 0xb0,
  },
  dogecoin: {
    messagePrefix: "\x19Dogecoin Signed Message:\n",
    bip32: { public: 0x02facafd, private: 0x02fac398 },
    pubKeyHash: 0x1e,
    scriptHash: 0x16,
    wif: 0x9e,
  },
};

// BIP44 Derivation Paths
const derivationPaths = {
  bitcoin: "m/84'/0'/0'/0/0",
  litecoin: "m/84'/2'/0'/0/0",
  bitcoin_cash: "m/44'/145'/0'/0/0",
  dogecoin: "m/44'/3'/0'/0/0",
  dash: "m/44'/5'/0'/0/0",
  ethereum: "m/44'/60'/0'/0/0",
  solana: "m/44'/501'/0'/0/0",
  stellar: "m/44'/148'/0'",
  ripple: "m/44'/144'/0'/0/0",
};

export async function deriveAllAddresses(mnemonic) {
  console.log("1. Validating mnemonic...");
  if (!bip39.validateMnemonic(mnemonic)) {
    throw new Error("Invalid BIP39 mnemonic phrase.");
  }
  console.log("2. Mnemonic valid. Creating seed...");
  const seed = await bip39.mnemonicToSeed(mnemonic);
  console.log("3. Seed created. Creating root node...");
  console.log("bip32 object:", bip32);
  const root = bip32.fromSeed(seed);
  console.log("4. Root node created:", root);

  let results = {};

  console.log("5. Deriving BTC-like addresses...");
  for (const chain of ["bitcoin", "litecoin", "dogecoin"]) {
    console.log(`  - Deriving for ${chain}`);
    const child = root.derivePath(derivationPaths[chain]);
    let payment;
    if (chain === "dogecoin") {
      payment = bitcoin.payments.p2pkh({
        pubkey: child.publicKey,
        network: networks[chain],
      });
    } else {
      payment = bitcoin.payments.p2wpkh({
        pubkey: child.publicKey,
        network: networks[chain],
      });
    }
    results[chain] = payment.address;
  }

  console.log("6. Deriving BCH...");
  const bchNode = root.derivePath(derivationPaths.bitcoin_cash);
  const bchPrivateKey = new bitcore.PrivateKey(
    bchNode.privateKey.toString("hex")
  );
  results["bitcoin_cash"] = bchPrivateKey.toAddress().toString();

  console.log("7. Deriving Dash...");
  const dashNode = root.derivePath(derivationPaths.dash);
  const dashPrivateKey = new dashcore.PrivateKey(
    dashNode.privateKey.toString("hex")
  );
  results["dash"] = dashPrivateKey.toAddress().toString();

  console.log("8. Deriving EVM chains...");
  const ethNode = HDNode.fromSeed(seed).derivePath(derivationPaths.ethereum);
  results["ethereum"] = ethNode.address;
  const evmChains = [
    "polygon",
    "avalanche",
    "arbitrum",
    "optimism",
    "bnb_smart_chain",
    "fantom",
  ];
  evmChains.forEach((chain) => {
    results[chain] = ethNode.address;
  });

  console.log("9. Deriving Solana...");
  const solanaSeed = bip39.mnemonicToSeedSync(mnemonic).slice(0, 32);
  const solanaAccount = solanaWeb3.Keypair.fromSeed(solanaSeed);
  results["solana"] = solanaAccount.publicKey.toBase58();

  console.log("10. Deriving Stellar...");
  const stellarNode = root.derivePath(derivationPaths.stellar);
  const stellarKeys = stellar.Keypair.fromRawEd25519Seed(
    stellarNode.privateKey
  );
  results["stellar"] = stellarKeys.publicKey();

  console.log("11. Deriving Ripple (XRP)...");
  const xrpNode = root.derivePath(derivationPaths.ripple);
  const xrpKeyPair = ECPair.fromPrivateKey(xrpNode.privateKey);
  results["ripple"] = `(XRP derivation from BIP39 is non-standard)`;

  console.log("12. Derivation complete.");
  return results;
}

export function convertAddress(address) {
  try {
    bitcoin.address.toOutputScript(address, networks.bitcoin);
    const btcResults = {};
    btcResults["type"] = "Bitcoin";
    btcResults["legacy"] = "...";
    btcResults["segwit"] = "...";
    return btcResults;
  } catch (e) {
    // Not a bitcoin address, try others...
  }
  return {
    error: "Address type not recognized or conversion not yet supported.",
  };
}
