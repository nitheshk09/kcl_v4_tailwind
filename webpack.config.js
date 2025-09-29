const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
 
module.exports = {
  entry: path.resolve(__dirname, 'index.web.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    alias: {
      'react-native$': 'react-native-web',
      'react-native-linear-gradient': 'react-native-web-linear-gradient',
      '@react-native-async-storage/async-storage': path.resolve(
        __dirname,
        'asyncStorage.web.js'
      ),
      'react-native-gesture-handler': path.resolve(
        __dirname,
        'node_modules/react-native-gesture-handler'
      ),
      '@react-navigation/drawer': path.resolve(
        __dirname,
        'node_modules/@react-navigation/drawer'
      ),
      'react-native/Libraries/Core/Devtools/openURLInBrowser': path.resolve(
        __dirname,
        'polyfills/openURLInBrowser.web.js'
      ),
 
      '@react-native-firebase/app': false,
      '@react-native-firebase/analytics': false,
      '@react-native-firebase/auth': false,
      '@react-native-firebase/firestore': false,
      '@react-native-firebase/messaging': false,
      '@react-native-firebase/crashlytics': false,
      '@notifee/react-native': false,
    },
    extensions: ['.web.js', '.web.tsx', '.js', '.jsx', '.ts', '.tsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules\/(?!react-native|react-native-web|@react-native-async-storage|react-native-gesture-handler|@react-navigation|@react-native\/new-app-screen)/,
        use: {
          loader: 'babel-loader',
          options: {
            configFile: path.resolve(__dirname, 'babel.web.config.js'),
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[hash][ext][query]',
        },
      },
      {
        test: /\.(mp4|webm|ogg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/videos/[hash][ext][query]',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(process.env.NODE_ENV !== 'production'),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.FIREBASE_APPCHECK_DEBUG_TOKEN': JSON.stringify(
        process.env.FIREBASE_APPCHECK_DEBUG_TOKEN || ''
      ),
      'process.env.JEST_WORKER_ID': JSON.stringify(''),
      'global.GESTURE_HANDLER_CONFIGURED': JSON.stringify(true),
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
    }),
  ],
 
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 8000,
    historyApiFallback: true,
  },
  stats: { errorDetails: true },
};