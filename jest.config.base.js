module.exports = {
  roots: ['<rootDir>', '<rootDir>/src'],
  reporters: ['default', 'jest-junit'],
  preset: 'ts-jest',
  collectCoverage: true,
  verbose: true,
  moduleFileExtensions: ['js', 'json', 'ts', 'tsx'],
  setupFiles: [],
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/helpers/'],
  moduleNameMapper: {},
  transform: {},
  coverageDirectory: 'target/coverage',
  coverageReporters: ['text', 'cobertura', 'html', 'lcov'],
  collectCoverageFrom: [
    '**/src/**',
    '!**/theme.*',
    '!**/*.stories.*',
    '!**/*.snippet.*',
    '!**/__tests__/**',
    '!**/*.snap',
    '!**/dist/**'
  ]
};
