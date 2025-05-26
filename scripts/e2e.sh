#!/bin/bash

# Go to the root of the project
cd ../..

# NOTES:
# The bash script does the following:
# 1. Install dependencies for this linux container environment
# 2. Bundle and copyFiles (part of npm run dev)
# 3. Start the vite dev server in the background
# 4. Wait for 3 seconds to ensure the server is ready
# 5. Run the playwright tests

# See packages/site/package.json for the npm commands where this script is called from.
PLAYWRIGHT_COMMAND="$@"

# Run the e2e tests
docker run --rm -it \
    -v $(pwd):/atlantis \
    -w /atlantis/packages/site \
    mcr.microsoft.com/playwright:v1.52.0-noble \
    bash -c "npm run bundle && npm run copyFiles && (npx vite &) && sleep 3 && npx $PLAYWRIGHT_COMMAND"
