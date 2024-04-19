const airbnbConfig = require('airbnb');
const airbnbTypescriptConfig = require('airbnb-typescript');
const prettierConfig = require('prettier');
const importPlugin = require('eslint-plugin-import');
const typescriptEslintPlugin = require('@typescript-eslint');

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
