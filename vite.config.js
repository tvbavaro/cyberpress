import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/cyberpress/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@components': '/src/components',
      '@styles': '/src/styles',
      '@fonts': '/src/fonts',
      '@views': '/src/views',
      '@assets': '/src/assets',
      '@api': '/src/api',
      '@constants': '/src/constants',
      '@icons': '/src/components/icons',
      '@helpers': '/src/helpers',
      '@store': '/src/store',
      '@router': '/src/router',
    },
  },
})
