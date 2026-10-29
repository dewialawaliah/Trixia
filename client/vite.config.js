import { cpSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const clientDirectory = fileURLToPath(new URL('.', import.meta.url));
const outputDirectory = fileURLToPath(new URL('./dist/', import.meta.url));

export default defineConfig({
    root: clientDirectory,
    base: './',
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true,
            }
        }
    },
    plugins: [
        react(),
        {
            name: 'copy-frontend-assets',
            closeBundle() {
                mkdirSync(outputDirectory, { recursive: true });
                cpSync(`${clientDirectory}Images`, `${outputDirectory}Images`, { recursive: true });
            }
        }
    ],
    build: {
        outDir: outputDirectory,
        emptyOutDir: true
    }
});
