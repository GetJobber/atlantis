import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mdx from '@mdx-js/rollup';
import path from 'path';

export default defineConfig({
  plugins: [react(), mdx()],
  optimizeDeps: {
    include: ['@jobber/formatters', '@jobber/hooks']
  },
  resolve: {
    alias: {
      '@jobber/hooks': path.resolve(__dirname, '../hooks/src'),
    },
  },
  server: {
    open: true
  }
});
