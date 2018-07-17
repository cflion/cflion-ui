// development config
const paths = require('./paths');
const merge = require('webpack-merge');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');

module.exports = merge(webpackConfig, {
    mode: 'development',
    entry: [
        'react-hot-loader/patch', // activate HMR for React
        'webpack-dev-server/client?http://0.0.0.0:8082/',   // bundle the client for webpack-dev-server and connect to the provided endpoint
        'webpack/hot/only-dev-server', // bundle the client for hot reloading, only- means to only hot reload for successful updates
        paths.appIndexJs // the entry point of our app
    ],
    output: {
        filename: 'js/dist.[hash].min.js',
        path: paths.appDist,
        publicPath: '/',
    },
    devServer: {
        hot: true, // enable HMR on the server
        host: '0.0.0.0',
        port: 8082,
        historyApiFallback: true,
    },
    devtool: 'cheap-module-eval-source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin(), // enable HMR globally
        new webpack.NamedModulesPlugin(), // prints more readable module names in the browser console on HMR updates
    ],
});
