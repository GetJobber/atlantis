import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  testMatch: ["**/*.e2e.ts", "**/*.visual.ts"],
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 4 : undefined,
  reporter: process.env.CI
    ? [["html"], ["junit", { outputFile: "test-results/junit-results.xml" }]]
    : "html",
  use: {
    baseURL: process.env.CI
      ? "http://localhost:5173"
      : "http://host.docker.internal:5173",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    contextOptions: {
      deviceScaleFactor: 1,
      forcedColors: "none",
    },
  },

  expect: {
    toHaveScreenshot: {
      maxDiffPixels: 500,
      threshold: 0.3,
    },
  },

  // Custom snapshot path that only includes browser name, not OS
  snapshotPathTemplate:
    "{testDir}/{testFileDir}/{testFileName}-snapshots/{arg}-{projectName}{ext}",

  projects: [
    // Always run Chromium in both CI and non-CI environments
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1280, height: 720 },
      },
    },

    // Run Firefox and WebKit only in non-CI environments
    ...(process.env.CI
      ? []
      : [
          {
            name: "firefox",
            use: {
              ...devices["Desktop Firefox"],
              viewport: { width: 1280, height: 720 },
            },
          },
          {
            name: "webkit",
            use: {
              ...devices["Desktop Safari"],
              viewport: { width: 1280, height: 720 },
            },
          },
        ]),
  ],
});
