/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  css: { postcss: { plugins: [] } },
  test: {
    include: ["./app/**/*.spec.{ts,tsx}"],
    globals: true,
    environment: "happy-dom",
    setupFiles: ["./test/polyfills.ts", "./test/setup-test-env.ts"],
  },
});
