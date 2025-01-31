import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import tailwindcss from '@tailwindcss/vite'
import { dirname } from 'path';

// Define __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [react(),  tailwindcss()],
  resolve: {
    alias: {
      '@': `${__dirname}/src`, // Resolve alias for the src folder
    },
  },
});
