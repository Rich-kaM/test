import { defineConfig } from 'vite';

export default defineConfig({
  appType: 'spa',
  base: process.env.GITHUB_PAGES === 'true' ? '/test/' : '/',
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: false
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
    strictPort: false
  }
});
