const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
      filename: "bundle.js",
      path: path.join(__dirname, "./public")
  },
  devtool: "source-map",
  resolve: {
    extensions: [".jsx", ".js", ".json"]
  },
  devServer: {
    historyApiFallback: true
  },
  optimization: {
    splitChunks: { chunks: "all" }
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.js|\.jsx$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "index.html")
    })
  ]
};