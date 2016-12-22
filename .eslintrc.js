module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  "plugins": ["react"],
  globals: {
    fetch: true,
  },
  "env": {
    "browser": true,
    "node": true,
  },
  rules: {
    'consistent-return': [0],
    'no-console': [1],
    'no-underscore-dangle': [0],
    'prefer-template': [1],
    'max-len': [2, {"code": 100}],
    'react/no-unescaped-entities': [0],
    'jsx-a11y/no-static-element-interactions': [0],
  },
};
