#!/bin/sh
# Wrapper to make old husky hooks work with pnpm

# The pre-commit hook wants to run lint-staged
if [ "$1" = "pre-commit" ]; then
  echo "Running lint-staged with pnpm..."
  exec pnpm exec lint-staged
fi

# For other hooks, just exit successfully
echo "Skipping $1 hook (not configured for pnpm)"
exit 0