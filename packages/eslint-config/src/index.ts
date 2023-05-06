module.exports = {
  extends: ['react-app', 'react-app/jest', 'prettier'],
  plugins: ['import'],
  rules: {
    // Decides import order
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
