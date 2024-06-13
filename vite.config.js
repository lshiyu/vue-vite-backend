import path from 'node:path'
import { defineConfig, loadEnv } from 'vite'

import createPlugins from './vite/plugins'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    base: env.VITE_APP_CONTEXT_PATH,
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './'),
        '@': path.resolve(__dirname, './src'),
      },
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    },
    plugins: createPlugins(env),
    server: {
      host: '0.0.0.0',
      port: env.VITE_APP_PORT,
      open: true
    },
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "@/styles/mixins.scss"; @import "@/styles/variables.scss";'
        },
      },
    },
  }
})
