const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  entry: "./src/main.tsx",
  mode: "development",
  devServer: {
    port: 3000,
    historyApiFallback: true,
    proxy: [
      {
        context: ['/api'],
        target: 'https://676fd18db353db80c323a516.mockapi.io',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/api': '/api'
        }
      }
    ]
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
      name: "host",
      filename: "remoteEntry.js",
      remotes: {
        host: "host@http://localhost:3000/remoteEntry.js",
        vueApp: "vueApp@http://localhost:3001/remoteVueApp.js",
        reactApp: "reactApp@http://localhost:3002/remoteEntry.js",
        angularApp: "angularApp@http://localhost:3003/remoteEntry.js",
      },
      exposes: {
        "./GlobalStore": "./src/store/GlobalStore.ts",
        "./network": "./src/network/network.ts",
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: "^18.0.0",
          eager: true,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: "^18.0.0",
          eager: true,
        },
        "react-router-dom": {
          singleton: true,
          requiredVersion: "^6.0.0",
          eager: true,
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
  ],
  output: {
    publicPath: "/",
  },
};
