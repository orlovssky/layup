// noinspection JSUnusedGlobalSymbols

import react from '@vitejs/plugin-react'
import autoprefixer from 'autoprefixer'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  css: {
    postcss: {
      plugins: [autoprefixer()],
    },
  },
})
