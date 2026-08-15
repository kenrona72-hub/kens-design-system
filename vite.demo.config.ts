import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Separate config for the browsable component showcase (src/dev), as opposed
// to vite.config.ts which builds the publishable library bundle. Deployed to
// GitHub Pages as a project site, hence the /kens-design-system/ base path.
export default defineConfig({
  plugins: [react()],
  base: "/kens-design-system/",
  build: {
    outDir: "demo-dist",
  },
});
