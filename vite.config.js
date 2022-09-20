import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Unocss from 'unocss/vite'
import path from 'path'
//导入问题 https://github.com/mdx-js/mdx/issues/1973
import mdx from '@mdx-js/rollup'

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    plugins: [
      react(),
      mdx(),
      Unocss()],
    base: './',
  }
)
