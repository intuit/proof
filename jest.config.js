const base = require('./jest.config.base');

module.exports = {
  ...base,
  roots: [
    //   '<rootDir>/plugins/',
    '<rootDir>/packages/'
  ],
  projects: [
    // '<rootDir>/plugins/*/jest.config.js',
    '<rootDir>/packages/*/jest.config.js'
  ],
  coverageDirectory: '<rootDir>/coverage/'
};
