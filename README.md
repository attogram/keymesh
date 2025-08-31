<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>keymesh - Cryptocurrency Address Mesh Generator</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; max-width: 900px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; }
        h1, h2 { color: #111; }
        h1 { text-align: center; }
        .tagline { text-align: center; color: #666; margin-top: -10px; margin-bottom: 40px; }
        .container { background: #fff; padding: 30px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
        .mode-section { margin-bottom: 40px; border-top: 1px solid #eee; padding-top: 20px; }
        textarea, input[type="text"], button { width: 100%; padding: 12px; margin-bottom: 12px; border: 1px solid #ddd; border-radius: 6px; box-sizing: border-box; font-size: 16px; }
        button { background-color: #007bff; color: white; border: none; cursor: pointer; font-weight: bold; }
        button:hover { background-color: #0056b3; }
        .warning { background-color: #fffbe6; border: 1px solid #ffe58f; border-radius: 6px; padding: 20px; margin-bottom: 20px; }
        .warning h3 { color: #d46b08; margin-top: 0; }
        .results-table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        .results-table th, .results-table td { text-align: left; padding: 12px; border-bottom: 1px solid #eee; }
        .results-table th { background-color: #f7f7f7; }
        .copy-btn { padding: 5px 10px; font-size: 12px; background-color: #6c757d; }
        .copy-btn:hover { background-color: #5a6268; }
        .icon { width: 24px; height: 24px; vertical-align: middle; margin-right: 10px; }
        footer { text-align: center; margin-top: 40px; color: #888; }
    </style>
</head>
<body>

    <div class="container">
        <h1>keymesh</h1>
        <p class="tagline">Generate a mesh of cryptocurrency addresses from a single private key</p>

        <!-- Mode 1: Public Address Conversion -->
        <div id="mode-convert" class="mode-section">
            <h2>Mode 1: Public Address Converter (Safe)</h2>
            <p>Paste a cryptocurrency address to see its other native formats for the same blockchain. No private key is needed.</p>
            <textarea id="address-input" rows="2" placeholder="Enter a cryptocurrency address..."></textarea>
            <button id="convert-btn">Convert Address</button>
        </div>

        <!-- Mode 2: Seed Phrase Derivation -->
        <div id="mode-derive" class="mode-section">
            <h2>Mode 2: Multi-Chain Seed Derivation (Dangerous)</h2>

            <div class="warning">
                <h3><img src="https://img.icons8.com/ios-filled/50/000000/error.png" alt="Warning Icon" style="width:20px;height:20px;vertical-align:middle;"> Security Warning</h3>
                <p>This operation is extremely sensitive and should ONLY be performed on a secure, trusted, and offline computer. <strong>Never enter your seed phrase on a website you do not trust.</strong> Your seed phrase gives complete control over your funds. All derivations happen locally in your browser; your seed phrase is never sent anywhere.</p>
            </div>

            <textarea id="seed-input" rows="4" placeholder="Enter your 12 or 24-word BIP39 mnemonic seed phrase..."></textarea>
            <button id="derive-btn">Derive Addresses</button>
        </div>

        <!-- Results Section -->
        <div id="results-section" class="mode-section" style="display:none;">
            <h2>Results</h2>
            <table class="results-table">
                <thead>
                    <tr>
                        <th>Network</th>
                        <th>Address</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody id="results-body">
                    <!-- Results will be injected here by ui.js -->
                </tbody>
            </table>
        </div>
    </div>

    <footer>
        <p>keymesh | Created by an AI assistant | <a href="https://github.com/attogram/keymesh">Source on GitHub</a></p>
    </footer>

    <script type="module" src="dist/bundle.js" defer></script>
</body>
</html>
