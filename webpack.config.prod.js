const path = require('path')
const webpack = require('webpack')
const HtmlPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanPlugin = require('clean-webpack-plugin')

const config = {
    mode: 'production',
    entry: path.join(__dirname, 'src', 'index'),

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name]-[hash].js'
    },

    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'standard-loader'
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.styl$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader'
                        },
                        {
                            loader: 'postcss-loader'
                        },
                        {
                            loader: 'stylus-loader',
                            options: {
                                sourceMap: false
                            }
                        }
                    ]
                })
            },
            {
                test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
                exclude: /node_modules/,
                loader: 'file-loader',
                query: {
                    name: 'media/[name].[hash:8].[ext]'
                }
            },
            {
                test: /\.(mp4|webm|wav|mp3|m4a|aac|oga)(\?.*)?$/,
                exclude: /node_modules/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: 'media/[name].[hash:8].[ext]'
                }
            }
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': 'production'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new HtmlPlugin({
            title: 'SW API Challenge',
            template: path.join(__dirname, 'src', 'template.html')
        }),
        new ExtractTextPlugin('[name]-[hash].css'),
        new CleanPlugin(['dist'])
    ]
}

module.exports = config
