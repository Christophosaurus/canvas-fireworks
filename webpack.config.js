const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const mode = process.env.NODE_ENV ? process.env.NODE_ENV : 'development'

module.exports = {
    mode,
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.ts$/,
                include: [path.resolve(__dirname, 'src/')],
                use: 'ts-loader',
            },
            {
                test: /\.(scss|css)$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    devtool: 'eval-source-map',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build/'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'webpack-typescript-scss-starter',
            template: './src/page-templates/index.html',
            // this line stopped the console from loggin twice?
            // Don't actually know what it is doing though
            inject: false,
        }),
    ],
    devServer: {
        watchOptions: {
            aggregateTimeout: 200,
            poll: 1000,
            // poll: true,
            ignored: ['**/node_modules/'],
        },
        contentBase: path.join(__dirname, './build'),
        compress: true,
        port: 42069
    }
};

