import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['packages/**/src/**/*.test.ts', 'packages/**/tests/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      include: ['packages/*/src/**/*.ts'],
      exclude: [
        'packages/*/src/**/*.test.ts',
        'packages/utils/src/index.ts',
        'packages/utils/src/types.ts',
      ],
      thresholds: {
        branches: 100,
        functions: 100,
        lines: 100,
        statements: 100,
      },
      reporter: ['text', 'html'],
    },
  },
})
