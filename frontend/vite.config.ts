import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  const protocol = env.VITE_API_PROTOCOL ?? 'http';
  const host = env.VITE_API_HOST ?? 'localhost';
  const port = env.VITE_API_PORT ?? '8000';

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      outDir: 'build'
    },
    server: {
      proxy: {
        '/api': {
          target: `${protocol}://${host}:${port}`,
          changeOrigin: true
        }
      }
    }
  };
});
