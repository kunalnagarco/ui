import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import importX from 'eslint-plugin-import-x';
import jest from 'eslint-plugin-jest';
import prettier from 'eslint-config-prettier';
import type { Linter } from 'eslint';

const config: Linter.Config[] = tseslint.config(
  js.configs.recommended,

  ...tseslint.configs.recommendedTypeChecked,

  importX.flatConfigs.recommended,
  importX.flatConfigs.typescript,

  {
    files: ['**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts', '**/*.spec.tsx'],
    ...jest.configs['flat/recommended'],
  },

  {
    rules: {
      'import-x/order': [
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
  },

  prettier,
) as Linter.Config[];

export default config;
