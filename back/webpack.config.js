const path = require('path');
const NodeExternals = require('webpack-node-externals');

module.exports = {
    target: 'node',
    mode: 'development',
    entry: {
        server: path.resolve(__dirname, 'src/server.ts')
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                test: /.(js|ts)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-typescript']
                }
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js', '.json']
    },
    externals: [NodeExternals()]
}