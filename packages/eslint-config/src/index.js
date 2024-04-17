import airbnbConfig from 'airbnb';
import airbnbTypescriptConfig from 'airbnb-typescript';
import prettierConfig from 'prettier';
import importPlugin from 'eslint-plugin-import';
import typescriptEslintPlugin from '@typescript-eslint';
import jestPlugin from 'jest';

module.exports = {
  airbnbConfig,
  airbnbTypescriptConfig,
  prettierConfig,
  plugins: {
    importPlugin,
    typescriptEslintPlugin,
    jestPlugin,
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
