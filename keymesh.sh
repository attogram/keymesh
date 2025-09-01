#!/bin/sh
#
# keymesh.sh - A wrapper script to run the keymesh CLI tool with Node.js
#

# Find the directory where the script is located
DIR=$(cd "$(dirname "$0")" && pwd)

# Execute the Node.js script, passing all command-line arguments
node "$DIR/keymesh.js" "$@"
