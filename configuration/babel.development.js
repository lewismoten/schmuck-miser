/* eslint-env node */
const { plugins = [], ...common } = require('./babel.common');

module.exports = {
  ...common,
  plugins: [...plugins, 'babel-plugin-typescript-to-proptypes'],
};
