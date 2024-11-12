import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Split code into smaller chunks for better performance
        }
      }
    }
  },
  server: {
    historyApiFallback: true
  },
  preview: {
    historyApiFallback: true
  }
});
