import { defineConfig, globalIgnores } from "eslint/config";
import nextPlugin from "@next/eslint-plugin-next";
import tsParser from "@typescript-eslint/parser";

const nextRules = nextPlugin.configs["core-web-vitals"];

export default defineConfig([
  globalIgnores([".next/**", "node_modules/**"]),
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
        project: "./tsconfig.json",
      },
    },
    plugins: { "@next/next": nextPlugin },
    rules: {
      ...nextRules.rules,
      "@next/next/no-img-element": "off",
    },
  },
]);
