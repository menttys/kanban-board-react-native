module.exports = {
  globals: {
    __DEV__: true,
  },
  preset: 'react-native',
  rootDir: './src',
  moduleNameMapper: {
    '^react$': '<rootDir>/../node_modules/react',
    '^react-native$': '<rootDir>/../node_modules/react-native',
    '\\.svg': '<rootDir>/__mocks__/svgMock.js',
    '\\.(jpg|jpeg|png|svg|ico|otf)$': '<rootDir>/__mocks__/file-mock.js',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|d3|internmap|native-base|@react-native|delaunator|robust-predicates)',
  ],
  transform: {
    '^.+\\.[j|t]sx?$': '<rootDir>/../jest.preprocess.js',
  },
  setupFiles: [
    '<rootDir>/../node_modules/react-native-gesture-handler/jestSetup.js',
  ],
  setupFilesAfterEnv: ['<rootDir>/../jest-setup-after-env.js'],
};
