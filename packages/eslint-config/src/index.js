const airbnbConfig = require('eslint-config-airbnb');
const airbnbTypescriptConfig = require('eslint-config-airbnb-typescript');
const prettierConfig = require('eslint-config-prettier');
const importPlugin = require('eslint-plugin-import');
const typescriptEslintPlugin = require('@typescript-eslint/eslint-plugin');

module.exports = {
  airbnbConfig,
  airbnbTypescriptConfig,
  prettierConfig,
  plugins: {
    importPlugin,
    typescriptEslintPlugin,
  },
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  parser: '@typescript-eslint/parser',
  rules: {
    'import/order': [
      'error',
      {
        pathGroupsExcludedImportTypes: ['builtin'],
        groups: [
          'builtin',
          ['external', 'internal'],
          'parent',
          ['sibling', 'index'],
        ],
        'newlines-between': 'always',
      },
    ],
  },
};
