/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it
const webpack = require('webpack');

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    plugins: [
      new webpack.ProvidePlugin({
          Buffer: ['buffer', 'Buffer']
      })
      ],
      resolve: {
          fallback: {
              crypto: require.resolve("crypto-browserify"),
              stream: require.resolve("stream-browserify")
          }
      }
  })
}