#!/usr/bin/env node
import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";

// Usage:
// node scripts/visualPair.mjs <mode:test|update> <component>
// Examples:
//   npm run visual:test:pair -- card
//   npm run visual:update:pair -- card

const [modeArg, componentArg] = process.argv.slice(2);

if (!modeArg || !["test", "update"].includes(modeArg)) {
  console.error("Usage: node scripts/visualPair.mjs <test|update> <component>");
  process.exit(1);
}

const component = componentArg;

if (!component) {
  console.error(
    "Missing <component>. Example: npm run visual:test:pair -- card",
  );
  process.exit(1);
}

const siteDir = path.resolve(process.cwd());
const specPath = path.join(siteDir, "tests/visual", `${component}.visual.ts`);

if (!existsSync(specPath)) {
  console.error(`Spec not found: ${path.relative(siteDir, specPath)}`);
  process.exit(1);
}

const isUpdate = modeArg === "update";
const updateFlag = isUpdate ? " --update-snapshots" : "";

function run(cmd) {
  execSync(cmd, { stdio: "inherit", cwd: siteDir });
}

// 1) Component spec (Chromium inside container per wrapper default)
run(
  `../../scripts/e2e.sh playwright test --config=playwright.config.ts tests/visual/${component}.visual.ts${updateFlag}`,
);

// 2) Site page filtered to '<component> components' across all three browsers in one run
run(
  `../../scripts/e2e.sh playwright test --config=playwright.config.ts tests/visual/site.visual.ts${updateFlag} --project=chromium --project=firefox --project=webkit -g "${component} components"`,
);
