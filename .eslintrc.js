/* eslint-env node */
module.exports = {
  root: true,
  env: {
    es6: true,
    browser: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
  ],
  rules: {
    quotes: ['error', 'single'],
  },
  parser: "@babel/eslint-parser",
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2021,
  },
  overrides: [
    {
      files: ["*.js", "*.jsx", "*.ts", "*.tsx"]
    },
    {
      files: ["*.ts", "*.tsx"],
      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2021,
      }
    },
  ],
  globals: {
    process: true,
  },
  plugins: ['@typescript-eslint'],
};
