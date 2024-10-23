import config from "@repo/eslint-config/react-internal.js";
import globals from "globals";

/** @type {import("eslint").Linter.Config} */
export default [
  ...config,
  {
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        project: "./packages/**/tsconfig.lint.json",
      },
    },
  },
];
