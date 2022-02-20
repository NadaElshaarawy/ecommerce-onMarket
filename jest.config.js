module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  moduleDirectories: ['node_modules', 'src'],
  rootDir: './',
  testRegex: '.spec.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest'
  },
  transformIgnorePatterns: ['/node_modules/'],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  collectCoverage: false,
  verbose: true,
  moduleNameMapper: {
    './src/index-minimal': '<rootDir>/node_modules/@apollo/protobufjs/src/index-minimal',
    'src/(.*)': '<rootDir>/src/$1'
  },
  setupFilesAfterEnv: [],
  displayName: {
    name: 'ONMARKET',
    color: 'blue'
  }
};
