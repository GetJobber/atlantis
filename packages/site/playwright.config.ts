import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  testMatch: ["**/*.e2e.ts", "**/*.visual.ts"],
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI
    ? [["html"], ["junit", { outputFile: "test-results/junit-results.xml" }]]
    : "html",
  use: {
    baseURL: process.env.CI ? "http://localhost:5173" : "http://localhost:5173",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
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
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1280, height: 720 },
      },
    },

    // Only run Firefox and WebKit in non-CI environments to speed up CI builds
    process.env.CI
      ? {}
      : {
          name: "firefox",
          use: {
            ...devices["Desktop Firefox"],
            viewport: { width: 1280, height: 720 },
          },
        },

    process.env.CI
      ? {}
      : {
          name: "webkit",
          use: {
            ...devices["Desktop Safari"],
            viewport: { width: 1280, height: 720 },
          },
        },
  ].filter(project => Object.keys(project).length > 0),
});
