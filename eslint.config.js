// eslint.config.js
import stylisticTs from '@stylistic/eslint-plugin-ts';
import parserTs from '@typescript-eslint/parser';

export default [
  {
    plugins: {
      '@stylistic/ts': stylisticTs,
    },
    parser: parserTs,
    rules: {
      '@stylistic/ts/indent': ['error', 2],
    },
  },
];
