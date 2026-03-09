import { spawn } from "node:child_process";

const includeSite = process.argv.includes("--site");

const commands = [
  {
    name: "components",
    cwd: "packages/components",
    script: "storybook",
  },
  {
    name: "components-native",
    cwd: "packages/components-native",
    script: "storybook",
  },
  ...(includeSite
    ? [
        {
          name: "site",
          cwd: "packages/site",
          script: "dev",
        },
      ]
    : []),
];

const children = [];
let exiting = false;

function shutdown(exitCode = 0) {
  if (exiting) return;
  exiting = true;

  for (const child of children) {
    child.kill("SIGTERM");
  }

  setTimeout(() => {
    for (const child of children) {
      if (!child.killed) {
        child.kill("SIGKILL");
      }
    }
  }, 2000).unref();

  process.exitCode = exitCode;
}

for (const command of commands) {
  const child = spawn("npm", ["run", command.script], {
    cwd: new URL(`../${command.cwd}/`, import.meta.url),
    stdio: "inherit",
    shell: process.platform === "win32",
  });

  child.on("exit", code => {
    shutdown(code ?? 0);
  });

  child.on("error", () => {
    shutdown(1);
  });

  children.push(child);
}

process.on("SIGINT", () => shutdown(130));
process.on("SIGTERM", () => shutdown(143));
