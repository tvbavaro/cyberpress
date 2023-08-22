import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@components': '/src/components',
      '@styles': '/src/styles',
      '@fonts': '/src/fonts',
      '@views': '/src/views',
      '@assets': '/src/assets'
    },
  },
})
