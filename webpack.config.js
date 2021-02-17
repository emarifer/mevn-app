const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, { mode }) => ({
    entry: './src/app/main.js',
    output: {
        path: path.join(__dirname, 'src/public'),
        filename: 'js/bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
              test: /\.js$/i,
              use: ['babel-loader'],
              exclude: /node_modules/
            },
            {
              test: /\.vue$/i,              
              loader: 'vue-loader'
            },
            {
              test: /\.(png|jpe?g|gif)$/i,              
              loader: 'file-loader',
              options: {
                name: 'assets/[name].[ext]',
              }
            }
        ],        
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/app/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'css/bundle.css'
        }),
        new VueLoaderPlugin()
    ],
    devServer: {
        historyApiFallback: {
          rewrites: [
            { from: /^\/$/, to: '/index.html' },
            { from: /^\/landing/, to: '/index.html' }
          ],
        },
    },
});
// https://webpack.js.org/configuration/dev-server/#devserverhistoryapifallback
// https://webpack.js.org/loaders/file-loader/#options
