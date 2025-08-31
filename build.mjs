import * as esbuild from 'esbuild';
import * as fs from 'fs';
import * as path from 'path';
import { polyfillNode } from 'esbuild-plugin-polyfill-node';
import { wasmLoader } from 'esbuild-plugin-wasm';

console.log("Starting build process...");

const outdir = 'dist';
const outfile = path.join(outdir, 'bundle.js');

// Ensure the output directory exists
fs.mkdirSync(outdir, { recursive: true });

try {
  await esbuild.build({
    entryPoints: ['js/main.js'],
    bundle: true,
    outfile: outfile,
    sourcemap: true,
    format: 'esm',
    platform: 'browser',
    plugins: [
      wasmLoader(),
      polyfillNode(),
    ],
  });
  console.log(`Build reported success. Checking for output file at: ${outfile}`);

  // Verify file existence
  if (fs.existsSync(outfile)) {
    console.log("Verification successful: Output file exists.");
  } else {
    console.error("Verification failed: Output file does NOT exist.");
  }

} catch (e) {
  console.error("Build failed with an exception:", e);
  process.exit(1);
}
