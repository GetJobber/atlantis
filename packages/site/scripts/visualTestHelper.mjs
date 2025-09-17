#!/usr/bin/env node
import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";

// Usage: node scripts/visualTestHelper.mjs <test|update> <component> [--no-build] [--build-all]

// Defaults to building components without any flags

// Usage from npm script:
// Examples:
// npm run visual:test:single -- <component>
// npm run visual:update:single -- <component>

// Optional flags:
// --no-build: Skip building components
// --build-all: Build all packages instead of just components
// Examples:
// npm run visual:test:single -- <component> --no-build
// npm run visual:update:single -- <component> --no-build
// npm run visual:test:single -- <component> --build-all
// npm run visual:update:single -- <component> --build-all

const args = process.argv.slice(2);
const [mode, component] = args;
const skipBuild = args.includes("--no-build");
const buildAll = args.includes("--build-all");

if (!mode || !["test", "update"].includes(mode) || !component) {
  console.error(
    "Usage: npm run visual:test:single -- <component> | npm run visual:update:single -- <component>",
  );
  process.exit(1);
}

const siteDir = path.resolve(process.cwd());
const repoRoot = path.resolve(siteDir, "../..");
const specPath = path.join(siteDir, "tests/visual", `${component}.visual.ts`);

if (!existsSync(specPath)) {
  console.error(`Spec not found: ${path.relative(siteDir, specPath)}`);
  process.exit(1);
}

function run(cmd, cwd = siteDir) {
  execSync(cmd, { stdio: "inherit", cwd });
}

// Optional prebuild: bootstrap components only, or all packages
// Used to ensure dist is fresh
if (!skipBuild) {
  const bootstrapCmd = buildAll
    ? "npm run bootstrap"
    : "npm run -w @jobber/components bootstrap";
  run(bootstrapCmd, repoRoot);
}

const updateFlag = mode === "update" ? " --update-snapshots" : "";

// Component spec (chromium)
run(
  `../../scripts/e2e.sh playwright test --config=playwright.config.ts tests/visual/${component}.visual.ts${updateFlag}`,
);

// Site filtered tests across three browsers in one run
run(
  `../../scripts/e2e.sh playwright test --config=playwright.config.ts tests/visual/site.visual.ts${updateFlag} --project=chromium --project=firefox --project=webkit -g "${component} components"`,
);
