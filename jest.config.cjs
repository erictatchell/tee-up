const { defaults } = require('jest-config');

module.exports = {
  transform: {
    '^.+\\.(ts|tsx)$': ['babel-jest', {
      presets: ['@babel/preset-env', '@babel/preset-typescript', '@babel/preset-react']
    }]
  },
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  transformIgnorePatterns: ['/node_modules/(?!next-auth)'],
  extensionsToTreatAsEsm: ['.ts'],
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
};
