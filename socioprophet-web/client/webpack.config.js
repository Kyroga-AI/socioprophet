const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // For docker
  // entry: "./usr/src/app/",
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "/build"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/react"],
            plugins: [
              "@babel/plugin-proposal-class-properties",
              "@babel/transform-runtime",
            ],
          },
        },
      },
      {
        test: /\.(s*)css$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(jpg|gif)$/i,
        use: ["file-loader"],
      },
      {
        test: /\.(mov|mp4)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
            },
          },
        ],
      },
    ],
  },
  devServer: {
    host: "0.0.0.0",
    port: 8081,
    historyApiFallback: true,
    allowedHosts: [
      "localhost.socioprophet.com",
      "socioprophet.com",
      "www.socioprophet.com",
    ],
    proxy: {
      "/api/users": "http://localhost:5001",
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
