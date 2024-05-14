import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"
import { visualizer } from "rollup-plugin-visualizer"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), visualizer()],
  server: {
    port: 4000 // có thể thay port khác
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
