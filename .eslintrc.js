module.exports = {
  root: true,
  env: {
    node: true,
    commonjs: true,
    es6: true,
    jest: true,
    jasmine: true,
    browser: true,
  },
  extends: 'eslint:recommended',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: '2021',
  },
  rules: {
    'prefer-const': [
      'warn',
      {
        destructuring: 'any',
        ignoreReadBeforeAssign: true,
      },
    ],
    'arrow-parens': ['warn', 'as-needed'],
    quotes: ['warn', 'single', { avoidEscape: true }],
    semi: ['error', 'always'],
    'no-var': ['error'],
    'no-console': ['warn'],
    'no-unused-vars': ['warn'],
    'no-mixed-spaces-and-tabs': ['warn'],
    'no-param-reassign': ['warn', { props: false }],
  },
};
