import http from "node:http";
import { spawn } from "node:child_process";

/**
 *
 * Note from Scott: I'm not huge on this script that the LLM wrote (with my adjustments). It originally
 * was just spawning a URL from the output it parsed, so I swapped to the explict port/URL since we know it, and
 * then just polling that URL until it gets a response, at which point it opens the browser. It's a bit hacky, but
 * it works and it allows us to open the browser in the default browser, instead of chrome.
 *
 * I just wanted vite to open by default in the browser, without it selecting chrome.
 * So if we can just find a way for vite to open in the OS browser, instead of
 * defaulting to chrome when you pass --open, then we can ditch this whole script.
 *
 */

const includeSite = process.argv.includes("--site");
const SITE_URL = "http://localhost:5173/";

const commands = [
  {
    name: "components",
    cwd: "packages/components",
    script: "storybook",
    args: [],
  },
  {
    name: "components-native",
    cwd: "packages/components-native",
    script: "storybook",
    args: [],
  },
  ...(includeSite
    ? [
        {
          name: "site",
          cwd: "packages/site",
          script: "dev",
          args: [],
        },
      ]
    : []),
];

const children = [];
let exiting = false;
let siteUrlOpened = false;

function openInDefaultBrowser(url) {
  if (siteUrlOpened) return;
  siteUrlOpened = true;

  const openCommand =
    process.platform === "darwin"
      ? ["open", [url]]
      : process.platform === "win32"
      ? ["cmd", ["/c", "start", "", url]]
      : ["xdg-open", [url]];

  const [command, args] = openCommand;
  const child = spawn(command, args, {
    stdio: "ignore",
    detached: true,
  });

  child.unref();
}

function waitForSite(url) {
  const siteUrl = new URL(url);

  const poll = () => {
    if (exiting || siteUrlOpened) return;

    const request = http.get(
      {
        host: siteUrl.hostname,
        port: siteUrl.port,
        path: "/",
        timeout: 1000,
      },
      response => {
        response.resume();
        openInDefaultBrowser(siteUrl.toString());
      },
    );

    request.on("error", () => {
      setTimeout(poll, 500).unref();
    });

    request.on("timeout", () => {
      request.destroy();
    });
  };

  poll();
}

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
  const isSiteCommand = command.name === "site";
  const child = spawn("npm", ["run", command.script, ...command.args], {
    cwd: new URL(`../${command.cwd}/`, import.meta.url),
    stdio: isSiteCommand ? ["inherit", "inherit", "inherit"] : "inherit",
    shell: process.platform === "win32",
  });

  if (isSiteCommand) {
    waitForSite(SITE_URL);
  }

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
