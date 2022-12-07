const webpack = require('webpack')
const path = require('path')

module.exports = {
  target:  "node",
  entry: {
    app: path.resolve(__dirname, 'src/index.ts')
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: [/node_modules/],
        loader: 'ts-loader'
      }
    ]
  },
  resolve: { extensions: ['.ts', '.js'] },
  output: {
    path:  path.resolve(__dirname, "./dist"),
    filename:  "index.js"
  },
  mode: 'development',
  optimization: {
    minimize:  false,
  },
  devtool: 'source-map',
  externals: {
    phantombuster:  "commonjs2 phantombuster",
    bufferutil: "bufferutil",
    "utf-8-validate": "utf-8-validate",
    puppeteer: 'require("puppeteer")',
    commander: 'require("commander")'
  },
}
