import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// IMPORTANT for GitHub Pages: base must equal "/<REPO_NAME>/"
// Repo: https://github.com/asy-stu/PCB-1  ->  base: "/PCB-1/"
// If you deploy to a custom domain or Vercel/Netlify instead, set base back to "/"
export default defineConfig({
  plugins: [react()],
  base: '/PCB-1/',
})
