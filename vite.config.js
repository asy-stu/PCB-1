import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// IMPORTANT for GitHub Pages: base must equal "/<REPO_NAME>/"
// Example: if your repo URL is https://github.com/ahmed/ahmed-saad-portfolio
// then base should be "/ahmed-saad-portfolio/"
// If you deploy to a custom domain or Vercel/Netlify instead, set base back to "/"
export default defineConfig({
  plugins: [react()],
  base: '/ahmed-saad-portfolio/',
})
