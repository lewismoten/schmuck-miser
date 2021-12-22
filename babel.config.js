/* eslint-env node */

const {
  env: { NODE_ENV },
} = process;

module.exports = require(`./configuration/babel.${NODE_ENV}.js`);
