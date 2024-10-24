import { defineConfig, devices } from "@playwright/test";

const config = (port: string) =>
  ({
    testDir: "./playwright-tests",
    fullyParallel: true,
    forbidOnly: Boolean(process.env.CI),
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: "html",
    use: {
      baseURL: `http://localhost:${port}/`,

      trace: "on-first-retry",
    },
    projects: [
      {
        name: "chromium",
        use: { ...devices["Desktop Chrome"] },
      },

      {
        name: "firefox",
        use: { ...devices["Desktop Firefox"] },
      },

      {
        name: "webkit",
        use: { ...devices["Desktop Safari"] },
      },
    ],
    webServer: {
      command: `pnpm run dev --port ${port}`,
      url: `http://localhost:${port}/`,
      reuseExistingServer: !process.env.CI,
      env: {
        PORT: port,
      },
    },
  }) satisfies Parameters<typeof defineConfig>[0];

export default config;
