// eslint.config.ts
import { defineConfig } from "eslint/config";

export default defineConfig({
  extends: ["next/core-web-vitals", "next/typescript"],

  rules: {
    "@typescript-eslint/no-explicit-any": "off", // Allow 'any' type
  },

  ignores: [".next/**", "out/**", "build/**", "next-env.d.ts"],
});
