const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const px2vwLoaderPath = path.resolve(__dirname, "loader/px2vw-loader.js");
module.exports = {
  mode: "development",
  devtool: false,
  entry: path.resolve(__dirname, "src/index.js"),
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  // 提供loader 默认都是
  // resolveLoader:{
  //   // 别名
  //   alias:{
  //     // 'px2rem2-loader':px2rem2LoaderPath
  //   },
  //   modules:['node_module','loaders']
  // }
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              // 预先编译
              // preset-env  转换兼容js  preset-react 转化react
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        // exclude:/antd\.css/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: px2vwLoaderPath,
            options: {
              remUnit: 75,
              remPrecision: 8,
              exclude: /antd\.css/, // 对于第三方库  第一种方法
            },
          },
        ],
      },
      // 第二种单独使用
      // {
      //   test:/antd\.css/,
      //   use:[
      //     'style-loader',
      //     'css-loader',
      //   ]
      // }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
};
