const path = require('path')
const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const common = require('./webpack.config.common')

const development = {
  entry: path.resolve(__dirname, './src/index.js'),
  devtool: 'inline-source-map',
  mode: 'development'
}

module.exports = [
  merge(common, development, {
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'vue-json-schema.umd.js',
      libraryTarget: 'umd',
      library: 'VueJsonSchema',
      umdNamedDefine: true
    }
  }),
  merge(common, development, {
    externals: [nodeExternals()],
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'vue-json-schema.esm.js',
      libraryTarget: 'commonjs2',
      library: 'VueJsonSchema'
    }
  })
]
