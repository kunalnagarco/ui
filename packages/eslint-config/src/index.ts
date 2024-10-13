module.exports = {
  extends: ['airbnb', 'airbnb-typescript', 'prettier'],
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
