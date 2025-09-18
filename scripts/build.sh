#!/bin/bash
set -e # Exit on error

# This script builds the production docs site, including storybook.
#
# The final output looks like this:
# /                 -> the docs site is the root
# /storybook        -> storybook v7 (going away soon)
# /storybook/web    -> storybook v9 web (components)
# /storybook/mobile -> storybook v9 mobile (components-native)

# Build storybook v7 and v9 instances
npm run --prefix packages/storybook-v7 storybook:build
npm run --prefix packages/components storybook:build
npm run --prefix packages/components-native storybook:build

# Generate the sitemap
npm run generate:sitemap

# Build the docs site
npm run --prefix packages/site build

# Merge all outputs into the final dist directory
mv packages/storybook-v7/storybook-static packages/site/dist/storybook
mv packages/components/storybook-static packages/site/dist/storybook/web
mv packages/components-native/storybook-static packages/site/dist/storybook/mobile
mv packages/site/dist storybook-static
