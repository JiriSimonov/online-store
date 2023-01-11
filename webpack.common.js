const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const getTemplate = (title, lang) => `<!DOCTYPE html>
<html lang="${lang}">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
  </head>
  <body class="body">
    <div class="root" id="root"></div>
  </body>
</html>`;

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src', 'index.ts'),
    404: path.resolve(__dirname, 'src', '404.ts'),
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    assetModuleFilename: 'assets/[name][ext]',
  },

  plugins: [
    new ESLintPlugin({ extensions: ['ts'] }),
    new HtmlWebpackPlugin({
      templateContent: getTemplate('Keyboards Store', 'ru-RU'),
      filename: 'index.html',
      favicon: path.resolve('src', 'assets', 'icons', 'k-button.svg'),
      chunks: ['app'],
    }),
    new HtmlWebpackPlugin({
      templateContent: getTemplate('Keyboards Store', 'ru-RU'),
      filename: '404.html',
      favicon: path.resolve('src', 'assets', 'icons', 'k-button.svg'),
      chunks: ['404'],
    }),
    new CopyPlugin({
      patterns: [
        { from: './src/assets/images/keyboards', to: './assets/images/keyboards' },
        { from: './src/assets/images/switches', to: './assets/images/switches' },
        { from: './src/assets/icons/cards', to: './assets/icons/cards' },
      ],
    }),
  ],

  module: {
    rules: [
      { test: /\.(ts|tsx)$/i, loader: 'ts-loader', exclude: ['/node_modules/'] },
      { test: /\.s[ac]ss$/i, use: ['style-loader', 'css-loader', 'sass-loader'] },
      { test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif|webp)$/i, type: 'asset' },
    ],
  },

  resolve: { extensions: ['.tsx', '.ts', '.jsx', '.js', '...'] },
};
