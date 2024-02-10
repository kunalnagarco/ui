// Test
import type { Config } from 'jest';

export const ReactConfig: Config = {
  testMatch: ['**/*.spec.ts?(x)', '!**/*-e2e.spec.ts?(x)'],
  transformIgnorePatterns: [
    'node_modules/(?!(@kunalnagarco/*)/)',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
  },
  coveragePathIgnorePatterns: ['.stories.(ts|tsx)'],
};
