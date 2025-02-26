import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['test/**/*.ts'],
    testTimeout: 300000,
    setupFiles: ['./vitest.setup.ts'],
  },
})
