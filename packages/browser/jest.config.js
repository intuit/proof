const base = require('../../jest.config.base');
const { name } = require('./package.json');

module.exports = {
  ...base,
  displayName: name,
};
