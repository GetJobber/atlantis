import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mdx from '@mdx-js/rollup';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), mdx()],
  optimizeDeps: {
    include: ['@jobber/formatters']
  },
  resolve: {
    alias: {
      '@jobber/hooks': path.resolve(__dirname, 'packages/hooks/src'),
    },
  },
  server: {
    open: true
  }
});
