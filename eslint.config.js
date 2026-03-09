/**
 * ESLint 9 flat config. Lints scripts and (with optional plugins) src.
 * For full TypeScript/React linting, add @typescript-eslint/* and eslint-plugin-react.
 */
import js from '@eslint/js'
import globals from 'globals'

export default [
  js.configs.recommended,
  {
    files: ['scripts/**/*.cjs', 'scripts/**/*.js'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'commonjs',
      globals: { ...globals.node },
    },
  },
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      'storybook-static/**',
      'coverage/**',
      '**/*.ts',
      '**/*.tsx',
      '**/*.mdx',
      'test/**',
      '.storybook/**',
    ],
  },
]
