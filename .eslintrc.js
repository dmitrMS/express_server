module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true
  },
  plugins: ['jest', 'prettier'],
  extends: ['eslint:recommended', 'plugin:jest/recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: { 'prettier/prettier': 2 }
};
