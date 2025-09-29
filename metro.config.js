const {getDefaultConfig} = require('@react-native/metro-config');
const {withNativeWind} = require('nativewind/metro');
const path = require('path');

const defaultConfig = getDefaultConfig(__dirname);

module.exports = withNativeWind(defaultConfig, {
  input: path.resolve(__dirname, 'global.css'),
  tailwindConfigPath: path.resolve(__dirname, 'tailwind.config.js'),
});
