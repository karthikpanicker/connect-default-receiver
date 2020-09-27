const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: {
        app: './src/index.js',
    },
    optimization:{
        minimize: false
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            tether: 'tether',
            Tether: 'tether',
            'window.Tether': 'tether',
        }),
        new HtmlWebpackPlugin({
            title: 'Cantiz Connect',
            template: './src/index.html',
            filename: 'index.html'
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/images/placeholder.png', to: '' },
                { from: 'src/images/Logo.png', to: '' },
                { from: 'src/images', to: 'images' }
            ],
        }),
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader',
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader',
                ],
            }

        ],
    },
};
