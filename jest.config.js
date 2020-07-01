module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testRegex: 'test',
  testPathIgnorePatterns: ['.eslintrc.test.js', 'helpers.ts', 'cordova'],
  moduleFileExtensions: ['ts', 'js'],
  globals: {
    'ts-jest': {
      tsConfig: './test/tsconfig.json'
    }
  },
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0
    }
  }
}
