module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  "plugins": ["react"],
  globals: {
    fetch: true,
  },
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.jsx'] }],
    'consistent-return': [1],
    'no-console': [1],
    'no-underscore-dangle': [0],
    'prefer-template': [1],
    'max-len': [2, {"code": 100}],
  },
};
