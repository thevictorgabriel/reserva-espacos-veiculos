import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // Importando o módulo path para resolver os caminhos

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),  // Define o alias para a pasta src
    },
  },
});
