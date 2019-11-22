'use strict';
const resolve = require('resolve');
const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack');


module.exports = {
  entry: {
    main: "./src/index.js"
  },

  // mode: "development",
  // mode: "production",

  output:{
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, 'build'),
    publicPath: '/'
  },


  devServer: {
    port: 3000,
    open: true,
    historyApiFallback: true,
    hot: true,
    contentBase: './build',
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),

    new HtmlWebpackPlugin({ 
      template: "./public/index.html"
    }),

    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],

  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options:{
          presets: ["@babel/preset-env", "@babel/preset-react"],
          plugins: [
            "@babel/plugin-proposal-class-properties",
            "@babel/plugin-transform-runtime"
          ]
        }
      },


      { 
        test: /\.(css|scss|sass)$/,
        use:[
          MiniCssExtractPlugin.loader,  // store seperated file
          // 'style-loader',   // inject style into DOM
          'css-loader',     // css parse..in js
          'sass-loader'     // parse scss to css
        ]
      },

	    // {
      //   test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
      //   loader: require.resolve('url-loader'),
      //   options: {
      //     limit: 10000,
      //     name: 'static/media/[name].[hash:8].[ext]',
      //   },
      // },

      {
        test: /\.(woff2|woff|ttf|eot)$/,
        use:[
          {
            loader: 'file-loader',
            options:{
              name: "[name].[hash].[ext]",
              outputPath: "fonts" 
            }
          }
        ]
      },

      { 
        test: /\.(svg|jpg|png|gif|webp)$/,
        use:[
          {
            loader: 'file-loader',
            options:{
              name: "[name].[hash].[ext]",
              outputPath: "imgs" 
            }
          }
        ]
      }
    ]
  },
}
