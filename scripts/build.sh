#!/bin/bash
set -e # Exit on error

# This script builds the production docs site, including storybook.
#
# The final output looks like this:
# /                 -> the docs site is the root
# /storybook        -> storybook v7 (going away soon)
# /storybook/web    -> storybook v9 web (components)
# /storybook/mobile -> storybook v9 mobile (components-native)

# Install storybook v7 dependencies and build it

rm -rf node_modules

cd packages/storybook-v7
echo "Installing storybook v7..."
npm install
echo "Building storybook v7..."
npm run storybook:build
cd -
