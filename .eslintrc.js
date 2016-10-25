module.exports = {
  extends: 'airbnb-base',
  env: {
    browser: true,
  },
  globals: {
    $: true,
  },
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true
    }
  },
  rules: {
    'new-cap': 0,
    'max-len': [2, { code: 100 }],
    'consistent-return': [0],
    'no-console': [1],
    'no-underscore-dangle': [0],
    'prefer-template': [1],
  }
};
