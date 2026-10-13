import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Relative assets work at /Portfolio/ (Pages) and at / (other hosts).
  base: "./",
  build: { target: "es2022" },
});
