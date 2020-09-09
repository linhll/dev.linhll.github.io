const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

module.exports = (env, argv) => {
  argv.mode = argv.mode || 'development';
  argv.port = argv.port || argv.PORT || 3000;
  return {
    mode: argv.mode,
    entry: './src/index.tsx',
    devtool: 'source-map',
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    module: {
      rules: [
        {
          test: /\.ts(x?)$/,
          include: /src/,
          use: [{ loader: 'ts-loader' }],
        },
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'static/fonts/',
              },
            },
          ],
        },
      ],
    },
    output: {
      path: path.join(__dirname, 'build'),
      filename: 'index.js',
    },
    plugins: [
      new CopyPlugin([{ from: './public', to: './', ignore: ['index.html'] }]),
      new HtmlWebpackPlugin({
        template: './public/index.html',
      }),
      new MiniCssExtractPlugin(),
      // new webpack.HotModuleReplacementPlugin(),
      new Dotenv(),
    ],
    devServer: {
      contentBase: path.join(__dirname, 'build'),
      compress: true,
      hot: true,
      inline: true,
      open: true,
      port: 3000,
    },
  };
};
