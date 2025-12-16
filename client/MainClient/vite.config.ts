import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    watch: {
      usePolling: true,
      interval: 200,
    },

    proxy: {
      "/api": {
        target: "http://finance-module:8080",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
