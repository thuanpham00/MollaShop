// eslint-disable-next-line import/no-unresolved
import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"
import path from "path"
import { visualizer } from "rollup-plugin-visualizer"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), visualizer()],
  server: {
    port: 4000 // có thể thay port khác
  },
  test: {
    environment: "jsdom", // or 'jsdom', 'node' // thay dổi môi trường để test
    setupFiles: path.resolve(__dirname, "./vitest.setup.js") // dùng để test mock API
  },
  css: {
    devSourcemap: true // thể hiện đường dẫn src map css
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, "./src")
    }
  }
})
