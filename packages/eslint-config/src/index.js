import airbnbConfig from 'airbnb';
import airbnbTypescriptConfig from 'airbnb-typescript';
import prettierConfig from 'prettier';

module.exports = {
  airbnbConfig,
  airbnbTypescriptConfig,
  prettierConfig,
  plugins: ['import', '@typescript-eslint', 'jest'],
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
