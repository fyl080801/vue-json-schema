const path = require('path')
const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const webpackBase = require('./webpack.config.common')

module.exports = merge(webpackBase, {
  entry: path.resolve(__dirname, './src/index.js'),
  devtool: 'inline-source-map',
  mode: 'development',
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'vue-json-schema.esm.js',
    libraryTarget: 'commonjs2'
  }
})
