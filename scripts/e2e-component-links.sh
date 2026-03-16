#!/bin/bash

set -euo pipefail

# Go to the root of the project
cd ../..

# Capture original arguments safely as an array for forwarding to Playwright
ARGS=("$@")

wait_for_url() {
    local url="$1"

    for _ in $(seq 1 120); do
        if curl --silent --fail "$url" > /dev/null; then
            return 0
        fi

        sleep 1
    done

    echo "Timed out waiting for $url" >&2
    return 1
}

cleanup() {
    if [[ -n "${DEV_PID:-}" ]] && kill -0 "${DEV_PID}" 2>/dev/null; then
        kill "${DEV_PID}" 2>/dev/null || true
        wait "${DEV_PID}" 2>/dev/null || true
    fi
}

trap cleanup EXIT INT TERM

echo "Running manual component link checks locally..."
node scripts/start-dev.mjs --site &
DEV_PID=$!

wait_for_url http://localhost:5173
wait_for_url http://localhost:6007
wait_for_url http://localhost:6008

cd packages/site
npx "${ARGS[@]}"
