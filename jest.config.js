module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src', '<rootDir>/test'],
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
  ],
  // Enhanced reporting configuration for better test failure details
  verbose: true,
  errorOnDeprecated: true,
  // Improve test output formatting
  testTimeout: 10000,
  // Show more context in diffs and run tests serially for cleaner output
  maxWorkers: 1,
  // Display individual test results
  silent: false,
};