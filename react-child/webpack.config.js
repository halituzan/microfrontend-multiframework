const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  entry: "./src/bootstrap.tsx",
  mode: "development",
  devServer: {
    port: 3002,
    historyApiFallback: true,
    hot: true,
    static: {
      directory: './public',
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    allowedHosts: "all",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "reactApp",
      filename: "remoteEntry.js",
      exposes: {
        "./App": "./src/App",
      },
      remotes: {
        host: "host@http://localhost:3000/remoteEntry.js",
      },
      shared: {
        react: { 
          singleton: true, 
          requiredVersion: "^18.0.0",
          eager: true
        },
        "react-dom": { 
          singleton: true, 
          requiredVersion: "^18.0.0",
          eager: true
        },
        "react-router-dom": {
          singleton: true,
          requiredVersion: "^6.0.0",
          eager: true
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
  output: {
    publicPath: "auto",
  },
};
