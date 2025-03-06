const globals = require('globals');
const pluginNode = require('eslint-plugin-node');
const pluginJs = require('@eslint/js');

module.exports = [
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'commonjs',
      globals: {
        ...globals.node, // Use Node.js globals (require, module, process, etc.)
      },
    },
    plugins: {
      node: pluginNode,
    },
    rules: {
      'no-unused-vars': ['warn', { varsIgnorePattern: '^unused$|^jwt$|^bcrypt$' }], // Allow specific unused vars with comments
      'semi': ['error', 'always'], // Require semicolons
      'quotes': ['error', 'single'], // Use single quotes
      'indent': ['error', 2], // 2-space indentation
      'no-console': ['warn', { allow: ['log', 'error'] }],
    },
  },
  pluginJs.configs.recommended, // Apply recommended JavaScript rules
];