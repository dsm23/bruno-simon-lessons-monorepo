import { resolve } from "node:path";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import onlyWarn from "eslint-plugin-only-warn";
import react from "eslint-plugin-react";
import ts from "typescript-eslint";

const project = resolve(process.cwd(), "tsconfig.json");

const compat = new FlatCompat();

const compatConfig = compat.config({
  extends: ["plugin:@next/eslint-plugin-next/core-web-vitals", "turbo"],
});

/** @type {import("eslint").Linter.Config} */
export default ts.config(
  {
    ignores: [".*.js", "node_modules/", "dist/"],
  },
  js.configs.recommended,
  ...ts.configs.recommended,
  react.configs.flat["jsx-runtime"],
  prettier,
  ...compatConfig,
  {
    plugins: {
      "only-warn": onlyWarn,
    },
  },
  {
    rules: {
      "@next/next/no-duplicate-head": "off",
    },
  },
  {
    settings: {
      "import/resolver": {
        typescript: {
          project,
        },
      },
    },
  },
);
