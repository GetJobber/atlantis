#!/bin/bash

# Go to the root of the project
cd ../..

# If --clean is supplied, delete existing docker volumes
if [[ " $* " == *" --clean "* ]]; then
    echo "Cleaning up docker volumes for a fresh install..."
    docker volume rm --force atlantis_site_node_modules
    docker volume rm --force atlantis_storybook_v7_node_modules
fi

# NOTES:
# This line prevents mounting the site's node_modules and instead stores them in a
# named docker volume. We need to install modules inside the container because linux
# requires different modules compared to macOS.
#     -v atlantis_site_node_modules:/atlantis/packages/site/node_modules
#
# The bash script does the following:
# 1. Install dependencies for this linux container environment
# 2. Bundle and copyFiles (part of npm run dev)
# 3. Start the vite dev server in the background. Use --force to clear the vite cache.
# 4. Wait for 3 seconds to ensure the server is ready
# 5. Run the playwright tests

# See packages/site/package.json for the npm commands where this script is called from.
PLAYWRIGHT_COMMAND="$@"

echo "Running e2e tests inside a docker container..."
# Run the e2e tests
docker run --rm -it \
    -v $(pwd):/atlantis \
    -v atlantis_site_node_modules:/atlantis/packages/site/node_modules \
    -v atlantis_storybook_v7_node_modules:/atlantis/packages/storybook-v7/node_modules \
    -w /atlantis/packages/site \
    mcr.microsoft.com/playwright:v1.52.0-noble \
    bash -c "npm install --ignore-scripts && (cd ../storybook-v7 && npm install) && npm run bundle && npm run copyFiles && (npx vite --force &) && sleep 3 && npx $PLAYWRIGHT_COMMAND"
