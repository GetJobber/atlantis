#!/usr/bin/env node
import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";

// Usage: node scripts/visualTestHelper.mjs <test|update> <name> [--no-build] [--build-all]
//
// Defaults: builds components unless --no-build is passed.
//
// Ways to run:
// 1) Classic spec by name (no path):
//    - npm run visual:test:single -- modal
//    - npm run visual:update:single -- autocomplete-v2
//    → Runs tests/visual/<name>.visual.ts
//
// 2) Page-based by tag (explicit @ShortName tag):
//    - npm run visual:test:single -- @InputGroup
//    - npm run visual:update:single -- @Menu
//    → Runs tests/visual/site.visual.ts filtered by the provided tag
//
// Optional flags:
// --no-build   Skip bootstrapping packages before running Playwright
// --build-all  Bootstrap all packages (repo root) instead of only @jobber/components

const args = process.argv.slice(2);
const [mode, name] = args;
const skipBuild = args.includes("--no-build");
const buildAll = args.includes("--build-all");

if (!mode || !["test", "update"].includes(mode) || !name) {
  console.error(
    "Usage: npm run visual:test:single -- <name> | npm run visual:update:single -- <name>",
  );
  process.exit(1);
}

const siteDir = path.resolve(process.cwd());
const repoRoot = path.resolve(siteDir, "../..");

function run(cmd, cwd = siteDir) {
  execSync(cmd, { stdio: "inherit", cwd });
}

// Optional prebuild to ensure fresh dist
if (!skipBuild) {
  const bootstrapCmd = buildAll
    ? "npm run bootstrap"
    : "npm run -w @jobber/components bootstrap";
  run(bootstrapCmd, repoRoot);
}

const updateFlag = mode === "update" ? " --update-snapshots" : "";

// 1) Classic spec: tests/visual/<name>.visual.ts
const specPath = path.join(siteDir, "tests/visual", `${name}.visual.ts`);

if (existsSync(specPath)) {
  run(
    `../../scripts/e2e.sh playwright test --config=playwright.config.ts tests/visual/${name}.visual.ts${updateFlag}`,
  );
  process.exit(0);
}

// 2) Page-based by explicit tag: require name to start with '@'
if (name.startsWith("@")) {
  run(
    `../../scripts/e2e.sh playwright test --config=playwright.config.ts tests/visual/site.visual.ts${updateFlag} --project=chromium --project=firefox --project=webkit -g "${name}"`,
  );
  process.exit(0);
}

console.error(
  [
    `No tests found for input: ${name}`,
    `Tried classic spec: tests/visual/${name}.visual.ts`,
    `Tried page tag: ${name} (in tests/visual/site.visual.ts)`,
    "Hint: pass a classic spec (e.g., 'modal') or a tag (e.g., '@InputGroup')",
  ].join("\n"),
);
process.exit(1);
