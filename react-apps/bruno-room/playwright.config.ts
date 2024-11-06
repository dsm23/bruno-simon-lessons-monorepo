import { defineConfig } from "@playwright/test";
import config from "@repo/playwright-config";

const PORT = process.env.PORT || "30000";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig(config(PORT));
