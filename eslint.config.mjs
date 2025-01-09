import globals from 'globals';

import pluginJs from '@eslint/js';

import pluginReact from 'eslint-plugin-react';

import babelParser from '@babel/eslint-parser';

import stylistic from '@stylistic/eslint-plugin';

/** @type {import('eslint').Linter.Config[]} */

export default [

  { files: ['**/*.{js,mjs,cjs,jsx}'], ignores: ['webpack.*.js', 'build/', 'buildInfos/'] },
  { languageOptions: { parser: babelParser, globals: globals.browser } },
  pluginJs.configs.recommended,
  stylistic.configs['recommended-flat'],
  pluginReact.configs.flat.recommended,
  {
    rules: {
      '@stylistic/semi': ['error', 'always'],
    },
  },
  {
    files: ['webpack.*.js'],
    languageOptions: { sourceType: 'module', globals: globals.node },
  },
];
