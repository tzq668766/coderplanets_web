/* eslint-disable */
const webpack = require('webpack')

require('dotenv').config()
const path = require('path')
const fs = require('fs')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const Dotenv = require('dotenv-webpack')

/* eslint-enable */

const { ANALYZE } = process.env

module.exports = {
  // https://github.com/zeit/next.js/blob/canary/examples/with-static-export/next.config.js
  // exportPathMap: () => {},

  webpack: (config, { isServer }) => {
    config.plugins = config.plugins || []

    config.plugins.push(new webpack.IgnorePlugin(/(?:\/tests|__mocks)/))
    // moment locale size is too big
    config.plugins.push(
      new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /(en)/)
    )

    /*
       // see https://github.com/RubyLouvre/anu/issues/640
       config.resolve.alias = {
       react: 'anujs',
       'react-dom': 'anujs',
       'prop-types': 'anujs/lib/ReactPropTypes',
       'create-react-class': 'anujs/lib/createClass',
       }
     */

    if (ANALYZE) {
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'server',
          analyzerPort: isServer ? 8888 : 8889,
          openAnalyzer: true,
        })
      )
    }

    if (fs.existsSync('./.env')) {
      config.plugins.push(
        new Dotenv({
          path: path.join(__dirname, '.env'),
          systemvars: true,
        })
      )
    }

    return config
  },
}
