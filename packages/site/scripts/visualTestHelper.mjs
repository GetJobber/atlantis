#!/usr/bin/env node
import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";

// Usage:
// node scripts/visualTestHelper.mjs <mode:test|update> <component>
// Examples:
//   npm run visual:test:single -- card
//   npm run visual:update:single -- card

// To avoid building, run with --no-build
// Example:
//   npm run visual:test:single -- card --no-build
//   npm run visual:update:single -- card --no-build

const args = process.argv.slice(2);
const [modeArg, componentArg] = args;
const skipBuild = args.includes("--no-build");

if (!modeArg || !["test", "update"].includes(modeArg)) {
  console.error(
    "Usage: node scripts/visualTestHelper.mjs <test|update> <component>",
  );
  process.exit(1);
}

const component = componentArg;

if (!component) {
  console.error(
    "Missing <component>. Example: npm run visual:test:single -- card",
  );
  process.exit(1);
}

const siteDir = path.resolve(process.cwd());
const specPath = path.join(siteDir, "tests/visual", `${component}.visual.ts`);
const repoRoot = path.resolve(siteDir, "../..");

if (!existsSync(specPath)) {
  console.error(`Spec not found: ${path.relative(siteDir, specPath)}`);
  process.exit(1);
}

const isUpdate = modeArg === "update";
const updateFlag = isUpdate ? " --update-snapshots" : "";

function run(cmd) {
  execSync(cmd, { stdio: "inherit", cwd: siteDir });
}

function runAtRoot(cmd) {
  execSync(cmd, { stdio: "inherit", cwd: repoRoot });
}

// Pre-build components to ensure dist is fresh (can be skipped with --skip-build)
if (!skipBuild) {
  runAtRoot("npm run -w @jobber/components build");
}

// 1) Component spec (Chromium inside container per wrapper default)
run(
  `../../scripts/e2e.sh playwright test --config=playwright.config.ts tests/visual/${component}.visual.ts${updateFlag}`,
);

// 2) Site page filtered to '<component> components' across all three browsers in one run
run(
  `../../scripts/e2e.sh playwright test --config=playwright.config.ts tests/visual/site.visual.ts${updateFlag} --project=chromium --project=firefox --project=webkit -g "${component} components"`,
);
