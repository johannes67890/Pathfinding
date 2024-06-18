module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    // Other Jest configurations
    transformIgnorePatterns: [
      "node_modules/(?!flowbite-react/)"
    ],
    transform: {
      "^.+\\.js$": "babel-jest"
    }
  };