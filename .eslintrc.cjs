module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-console': [
      1,
      {
        allow: [
          'warn',
          'error'
        ]
      }
    ],
    'import/extensions': 'off',
    'no-unused-vars': 'off',
    'comma-dangle': 'off',
    'no-lonely-if': 'warn',
    'prefer-destructuring': 'warn',
    'valid-jsdoc': 'warn',
    'object-shorthand': 'warn',
    'import/prefer-default-export': 'off',
    'no-underscore-dangle': 'warn',
    indent: [
      0
    ],
    'func-names': [
      0
    ],
    'no-param-reassign': 'warn',
    'max-len': 'off',
    'no-undef': 'warn',
    'linebreak-style': 'off',
    'no-unreachable': 'off',
    'dot-notation': 'warn',
    'no-restricted-syntax': 'off',
    'no-await-in-loop': 'off',
    'class-methods-use-this': 'off',
    'no-else-return': 'off',
    'no-continue': 'off'
  },
};
