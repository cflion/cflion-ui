// production config
const {resolve} = require('path');
const paths = require('./paths');
const merge = require('webpack-merge');
const webpackConfig = require('./webpack.config');

module.exports = merge(webpackConfig, {
    mode: 'production',
    entry: paths.appIndexJs,
    output: {
        filename: 'js/bundle.[hash].min.js',
        path: paths.appBuild,
        publicPath: '/',
    },
    devtool: 'source-map',
    plugins: [],
});
