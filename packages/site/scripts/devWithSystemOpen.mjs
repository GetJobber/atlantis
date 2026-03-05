import { spawn } from "node:child_process";
import process from "node:process";

const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";
const env = { ...process.env };
delete env.BROWSER;
delete env.npm_config_browser;

let hasOpened = false;

const viteProcess = spawn(npmCommand, ["exec", "--", "vite", "--force"], {
  env,
  stdio: ["inherit", "pipe", "pipe"],
});

const stripAnsi = text => text.replace(/\x1B\[[0-?]*[ -/]*[@-~]/g, "");

const openInDefaultBrowser = url => {
  if (hasOpened) return;
  hasOpened = true;

  if (process.platform === "darwin") {
    const child = spawn("open", [url], { stdio: "ignore", detached: true });
    child.unref();
    return;
  }

  if (process.platform === "win32") {
    const child = spawn("cmd", ["/c", "start", "", url], {
      stdio: "ignore",
      detached: true,
    });
    child.unref();
    return;
  }

  const child = spawn("xdg-open", [url], { stdio: "ignore", detached: true });
  child.unref();
};

const maybeOpenFromOutput = data => {
  const cleanText = stripAnsi(data.toString("utf8"));
  const match = cleanText.match(/https?:\/\/[^\s)]+/);
  if (match?.[0]) {
    openInDefaultBrowser(match[0]);
  }
};

viteProcess.stdout.on("data", data => {
  process.stdout.write(data);
  maybeOpenFromOutput(data);
});

viteProcess.stderr.on("data", data => {
  process.stderr.write(data);
  maybeOpenFromOutput(data);
});

const shutdown = signal => {
  if (!viteProcess.killed) {
    viteProcess.kill(signal);
  }
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

viteProcess.on("close", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 1);
});
