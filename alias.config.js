const path = require('path');

const resolve = (...args) =>
  path.resolve.apply(null, [__dirname, 'src', ...args]);

const extensions = [
  '.ios.tsx',
  '.android.tsx',
  '.native.tsx',
  '.tsx',
  '.ts',
  '.ios.js',
  '.android.js',
  '.native.js',
  '.mjs',
  '.js',
  '.jsx',
  '.json',
  '.svg',
];

const aliases = {
  '@app': resolve(''),
  'react-native': path.resolve(__dirname, 'node_modules', 'react-native'),
};

module.exports = {
  extensions,
  aliases,
};
