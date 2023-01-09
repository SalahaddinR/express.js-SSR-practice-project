const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;

module.exports = {
    mode: 'development',
    entry: {
        main: path.resolve(__dirname, 'src/main.ts'),
        catalog: path.resolve(__dirname, 'src/catalog.ts'),
        product: path.resolve(__dirname, 'src/product.ts'),
        authenticate: path.resolve(__dirname, 'src/authenticate.ts'),
        payment: path.resolve(__dirname, 'src/payment.ts')
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                test: /.(css|scss)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /.ts$/,
                use: ['ts-loader']
            },
            {
                test: /.(png|jpg|svg)$/,
                type: 'asset/resource'
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'stylesheets.css'
        }),
        new CleanWebpackPlugin(),
        /*
        new CopyWebpackPlugin({
            patterns: [
                {from: 'public', to: 'views'}
            ]
        })
        */
        new CopyWebpackPlugin({
            patterns: [
                {from: 'public'}
            ]
        })
    ],
    resolve: {
        extensions: ['.js', '.ts', '.css', '.scss'],
        alias: {
            styles: path.resolve(__dirname, 'src/stylesheets'),
            assets: path.resolve(__dirname, 'assets'),
            loaders: path.resolve(__dirname, 'src/loaders')
        }
    },
    devtool: 'cheap-source-map'
}

// CAUTION: DO NOT SHARE WITH THIS HASH, IT IS NOT SAFE FOR SECURITY PURPOSES
const SECURITY_HASH = '3223 4243 4390 2354';