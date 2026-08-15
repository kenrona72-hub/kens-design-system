import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { resolve } from "path";

export default defineConfig({
  plugins: [
    react(),
    dts({ include: ["src"], exclude: ["src/**/*.stories.*"], rollupTypes: true }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "KensDesignSystem",
      fileName: "kens-design-system",
      formats: ["es"],
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
    },
    cssCodeSplit: false,
    sourcemap: true,
  },
});
