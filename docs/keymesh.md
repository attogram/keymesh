# KeyMesh Documentation

KeyMesh is a powerful, client-side tool designed for cryptocurrency users and developers. It allows you to perform two primary functions securely in your own browser or on your command line.

- **Generate a mesh of cryptocurrency addresses from a single private key.**
- **Convert a cryptocurrency address into its other native formats for the same chain.**

All operations are performed locally on your machine. No private keys, seed phrases, or addresses are ever transmitted over the network.

## Table of Contents

1. [Security First](#security-first)
2. [How to Use the Web Interface](#how-to-use-the-web-interface)
   - [Mode 1: Public Address Converter](#mode-1-public-address-converter)
   - [Mode 2: Multi-Chain Seed Derivation](#mode-2-multi-chain-seed-derivation)
3. [How to Use the Command-Line Tool (CLI)](#how-to-use-the-command-line-tool-cli)
   - [Installation](#installation)
   - [Commands](#commands)

---

## 1. Security First

Cryptocurrency is all about self-custody, and with great power comes great responsibility.

### **!!! DANGER !!!**

The most critical piece of information you own is your **BIP39 Mnemonic Seed Phrase** (typically 12 or 24 words). Anyone who has access to this phrase can access and control ALL of your funds across every blockchain derived from it.

- **NEVER** enter your seed phrase on a website you do not trust completely.
- **NEVER** share your seed phrase with anyone.
- **IDEALLY**, you should only perform seed phrase operations on a computer that is **completely offline** (air-gapped).
- This tool is designed to run locally. For maximum security, you can download the repository from GitHub, disconnect from the internet, and then open the `README.md` file in your browser.

---

## 2. How to Use the Web Interface

To use the web interface, simply open the `README.md` file in a modern web browser.

### Mode 1: Public Address Converter (Safe)

This mode is safe to use on an online machine as it does not involve private keys.

1.  Navigate to the "Mode 1: Public Address Converter" section.
2.  Paste any cryptocurrency address into the text area.
3.  Click the "Convert Address" button.
4.  The results will appear below, showing the address in its other native formats if supported. (Note: This feature is currently in development).

### Mode 2: Multi-Chain Seed Derivation (Dangerous)

Please read the [Security First](#security-first) section before using this feature.

1.  Navigate to the "Mode 2: Multi-Chain Seed Derivation" section.
2.  Carefully type or paste your 12 or 24-word BIP39 seed phrase into the text area.
3.  Click the "Derive Addresses" button.
4.  The results table will appear below, showing the derived addresses for a wide variety of blockchains.
5.  You can use the "Copy" button to safely copy any address to your clipboard.

---

## 3. How to Use the Command-Line Tool (CLI)

The CLI provides the same functionality as the web interface for users who prefer working in a terminal.

### Installation

The CLI tool is included in the project and requires Node.js to run.

1.  Clone the repository from GitHub:
    ```bash
    git clone https://github.com/attogram/keymesh.git
    cd keymesh
    ```
2.  Install the required dependencies:
    ```bash
    npm install
    ```

### Commands

The main script is `keymesh.sh`.

#### Derive Addresses

To derive addresses from a seed phrase, use the `derive` command. **Remember the security risks!**

```bash
./keymesh.sh derive "your twelve or twenty four word seed phrase goes here"
```

The output will be a list of addresses for all supported chains.

#### Convert Address

To convert an address (feature in development):

```bash
./keymesh.sh convert <address_to_convert>
```

#### Get Help

To see all available commands and options, use the `--help` flag:

```bash
./keymesh.sh --help
```
