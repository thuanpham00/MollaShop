import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
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
