const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const DESTINATION = path.resolve(__dirname, 'build')

const BASE_DEVELOPMENT_URL = '/'
const BASE_PRODUCTION_URL = '/video-auto-player/'

module.exports = (_, argv) => ({
  entry: ['./src/index.tsx'],
  output: {
    filename: 'bundle.js',
    path: DESTINATION
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src')
    },
    extensions: ['.ts', '.tsx', '.js', '.json'],
    modules: ['./src', 'node_modules']
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        use: 'source-map-loader'
      },
      {
        enforce: 'pre',
        test: /\.ts$/,
        exclude: /node_modules/,
        use: 'tslint-loader'
      },
      {
        test: [/\.ts$/, /\.tsx$/],
        exclude: [/node_modules/],
        use: 'awesome-typescript-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html'
    }),
    new webpack.EnvironmentPlugin({
      BASE_URL: argv.mode === 'production' 
        ? BASE_PRODUCTION_URL 
        : BASE_DEVELOPMENT_URL
    })
  ],
  devtool: 'cheap-module-source-map',
  devServer: {
    publicPath: '/',
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, 'build'),
    hot: true
  }
})
