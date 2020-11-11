const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = (env, argv) => {
  argv.mode = argv.mode || 'development';
  const PUBLIC_URL = argv.mode === 'development' ? '' : '';
  return {
    mode: argv.mode,
    entry: './src/index.tsx',
    devtool: argv.mode === 'development' ? 'source-map' : undefined,
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
      publicPath: PUBLIC_URL,
    },
    plugins: [
      new CopyPlugin([{ from: './public', to: './', ignore: ['index.html'] }]),
      new HtmlWebpackPlugin({
        template: './public/index.html',
      }),
      new MiniCssExtractPlugin(),
      new webpack.DefinePlugin({
        'process.env.PUBLIC_URL': JSON.stringify(PUBLIC_URL),
      }),
      new webpack.HotModuleReplacementPlugin(),
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
