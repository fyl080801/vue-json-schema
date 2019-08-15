const path = require('path')
const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const common = require('./webpack.config.common')

const production = {
  entry: path.resolve(__dirname, './src/index.js'),
  devtool: 'source-map',
  mode: 'production',
  optimization: {
    minimize: true
  }
}

module.exports = [
  merge(common, production, {
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'vue-json-schema.umd.js',
      libraryTarget: 'umd',
      library: 'VueJsonSchema',
      umdNamedDefine: true
    }
  }),
  merge(common, production, {
    externals: [nodeExternals()],
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'vue-json-schema.esm.js',
      libraryTarget: 'commonjs2',
      library: 'VueJsonSchema'
    }
  })
]
