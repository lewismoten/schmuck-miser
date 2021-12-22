/* eslint-env node */
// module.exports = require("./node_modules/@eslint/eslintrc/dist/eslintrc.cjs");
//module.exports = require("@eslint/eslintrc/dist/eslintrc.cjs");

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
  plugins: ['@typescript-eslint/eslint-plugin'],
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
      "@typescript-eslint": [".ts", ".tsx"],
    },
    "import/resolver": {
      "typescript": {}
    }
  }
};
