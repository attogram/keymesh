import { deriveAllAddresses, convertAddress } from "./engine.js";

// DOM Elements
const addressInput = document.getElementById("address-input");
const convertBtn = document.getElementById("convert-btn");
const seedInput = document.getElementById("seed-input");
const deriveBtn = document.getElementById("derive-btn");
const resultsSection = document.getElementById("results-section");
const resultsBody = document.getElementById("results-body");

// Network names and icons (placeholders)
const networkInfo = {
  bitcoin: { name: "Bitcoin", icon: "btc.png" },
  litecoin: { name: "Litecoin", icon: "ltc.png" },
  dogecoin: { name: "Dogecoin", icon: "doge.png" },
  bitcoin_cash: { name: "Bitcoin Cash", icon: "bch.png" },
  dash: { name: "Dash", icon: "dash.png" },
  ethereum: { name: "Ethereum", icon: "eth.png" },
  polygon: { name: "Polygon", icon: "matic.png" },
  avalanche: { name: "Avalanche C-Chain", icon: "avax.png" },
  arbitrum: { name: "Arbitrum", icon: "arb.png" },
  optimism: { name: "Optimism", icon: "op.png" },
  bnb_smart_chain: { name: "BNB Smart Chain", icon: "bnb.png" },
  fantom: { name: "Fantom", icon: "ftm.png" },
  solana: { name: "Solana", icon: "sol.png" },
  stellar: { name: "Stellar", icon: "xlm.png" },
  ripple: { name: "Ripple (XRP)", icon: "xrp.png" },
};

function renderResults(results) {
  resultsBody.innerHTML = ""; // Clear previous results
  for (const [chain, address] of Object.entries(results)) {
    const info = networkInfo[chain] || {
      name: chain.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
      icon: "default.png",
    };
    const row = document.createElement("tr");
    row.innerHTML = `
            <td><img src="https://via.placeholder.com/24" class="icon" alt="${info.name} icon"> ${info.name}</td>
            <td><code>${address}</code></td>
            <td><button class="copy-btn" data-address="${address}">Copy</button></td>
        `;
    resultsBody.appendChild(row);
  }
  resultsSection.style.display = "block";
}

function displayError(message) {
  resultsBody.innerHTML = `<tr><td colspan="3" style="color:red;text-align:center;">${message}</td></tr>`;
  resultsSection.style.display = "block";
}

async function handleDerive() {
  const mnemonic = seedInput.value.trim();
  if (!mnemonic) {
    displayError("Please enter a seed phrase.");
    return;
  }

  deriveBtn.textContent = "Deriving...";
  deriveBtn.disabled = true;

  try {
    const addresses = await deriveAllAddresses(mnemonic);
    renderResults(addresses);
  } catch (error) {
    displayError(`Error: ${error.message}`);
  } finally {
    deriveBtn.textContent = "Derive Addresses";
    deriveBtn.disabled = false;
  }
}

function handleConvert() {
  const address = addressInput.value.trim();
  if (!address) {
    displayError("Please enter an address to convert.");
    return;
  }
  const result = convertAddress(address);
  if (result.error) {
    displayError(result.error);
  } else {
    // This part needs a proper render function for conversion results
    renderResults({ "Converted Address": JSON.stringify(result) });
  }
}

function handleCopy(event) {
  if (event.target.classList.contains("copy-btn")) {
    const address = event.target.dataset.address;
    navigator.clipboard
      .writeText(address)
      .then(() => {
        event.target.textContent = "Copied!";
        setTimeout(() => {
          event.target.textContent = "Copy";
        }, 1500);
      })
      .catch((err) => {
        console.error("Failed to copy address: ", err);
      });
  }
}

export function initialize() {
  deriveBtn.addEventListener("click", handleDerive);
  convertBtn.addEventListener("click", handleConvert);
  resultsBody.addEventListener("click", handleCopy);
}
