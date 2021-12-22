/* eslint-env node */
const {
  env: { production = {}, ...env } = {},
  ...common
} = require('./babel.common');

module.exports = {
  ...common,
  env: {
    ...env,
    production: {
      ...production,
      only: ['src'],
      plugins: [
        [
          'transform-react-remove-prop-types',
          {
            removeImport: true,
          },
        ],
        '@babel/plugin-transform-react-constant-elements',
        '@babel/plugin-transform-react-inline-elements',
      ],
    },
  },
};
