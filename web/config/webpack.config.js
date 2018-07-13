const paths = require('./paths');
const {resolve} = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    //基础目录，绝对路径，用于从配置中解析入口起点(entry point)和 loader
    context: resolve(__dirname, '../../'+paths.appSrc),

    resolve: {
        extensions: [
            '.mjs',
            '.ts',
            '.tsx',
            '.web.js',
            '.js',
            '.json',
            '.jsx',
        ],
    },

    module: {
        rules: [
            // "url" loader works like "file" loader except that it embeds assets
            // smaller than specified limit in bytes as data URLs to avoid requests.
            // A missing `test` is equivalent to a match.
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                loader: 'url-loader',
                options: {
                    limit: 10000,
                },
            },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                test: /\.(js|jsx)$/,
                enforce: "pre",
                exclude: /node_modules/,
                use: [
                    'babel-loader',
                    'source-map-loader'
                ],
            },

            // "postcss" loader applies autoprefixer to our CSS.（自动修复程序应用到CSS）
            // "css" loader resolves paths in CSS and adds assets as dependencies.(解析css中的url)
            // "style" loader turns CSS into JS modules that inject <style> tags.（将css样式转换为<style>标签引入js中）
            // In production, we use a plugin to extract that CSS to a file, but
            // in development "style" loader enables hot editing of CSS.（style loader运行对css进行热修改）
            {
                test: /\.css$/,
                use: [
                    {
                        loader:'style-loader',
                        //singleton: true;每一个css文件会变为一个<style>标签引入到页面中，此设置将多个<style>标签会被合并成一个<style>标签
                        options: {singleton: true},
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            // Necessary for external CSS imports to work
                            // https://github.com/facebookincubator/create-react-app/issues/2677
                            ident: 'postcss',
                            plugins: () => [
                                require('postcss-flexbugs-fixes'),
                                autoprefixer({   //插件autoprefixer，针对不同浏览器某些css属性需要用到不同内核前缀（例：-webkit-transfrom，-moz-transfrom)
                                    browsers: [
                                        '>1%',
                                        'last 4 versions',
                                        'Firefox ESR',
                                        'not ie < 9', // React doesn't support IE8 anyway
                                    ],
                                    flexbox: 'no-2009',
                                }),
                            ],
                        },
                    },
                ],
            },
        ]
    },
    plugins: [
        // Generates an `index.html` file with the <script> injected.
        new HtmlWebpackPlugin({
            inject: true,
            template: paths.appHtml,
        }),
    ],
    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    /*externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },*/
};