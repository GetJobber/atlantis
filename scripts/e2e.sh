#!/bin/bash

# Go to the root of the project
cd ../..

# NOTES:
# This line prevents mounting the site's node_modules. We need to install those inside the container
# because linux requires different modules compared to macOS.
#     -v $(pwd)/packages/site/node_modules.e2e:/atlantis/packages/site/node_modules \

# See packages/site/package.json for the npm commands where this script is called from.
PLAYWRIGHT_COMMAND="$@"

# Run the e2e tests
docker run --rm -it \
    -v $(pwd):/atlantis \
    -v $(pwd)/packages/site/node_modules.e2e:/atlantis/packages/site/node_modules \
    -w /atlantis/packages/site \
    mcr.microsoft.com/playwright:v1.52.0-noble \
    bash -c "npm install --ignore-scripts && npx $PLAYWRIGHT_COMMAND"
