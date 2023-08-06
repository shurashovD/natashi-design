const path = require("path");
const nodeExternals = require('webpack-node-externals')
const CopyPlugin = require('copy-webpack-plugin')
const mode = process.env.NODE_ENV || 'development'
const port = process.env.PORT || 3001

module.exports = {
    name: 'server',
    entry: {
        server: path.resolve(__dirname, 'server/index.ts')
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist')
        },
        compress: true,
        port
    },
    devtool: 'inline-source-map',
    mode,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    externals: [nodeExternals()],
    target: 'node',
    node: {
        __dirname: false
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                    configFile: 'tsconfig.json'
                }
            }
        ]
    },
    plugins: [
        new CopyPlugin({
            patterns: [{
                from: 'server/views', to: 'views',
                noErrorOnMissing: true,
            }]
        })
    ]
}