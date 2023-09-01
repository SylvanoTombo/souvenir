import path from 'path';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';

export default defineConfig({
  plugins: [
    laravel({
      input: 'resources/ts/app.tsx',
      refresh: true,
    }),
    react(),
    checker({
      typescript: true,
      eslint: { lintCommand: 'eslint --ext .ts,.tsx resources/ts' },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'resources/ts'),
    },
  },
});
