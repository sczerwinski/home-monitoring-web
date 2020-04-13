module.exports = {
  mode: "production",
  devtool: "source-map",
  resolve: {
    extensions: [".ts", ".tsx"]
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader"
          }
        ]
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      }
    ]
  },
  externals: {
    "Config": JSON.stringify({
      "apiBaseUrl": "http://192.168.0.21/home-monitoring/api"
    }),
    react: "React",
    "react-dom": "ReactDOM",
    "@material-ui/core": "MaterialUI",
    "@material-ui/core/styles": "MaterialUI",
    "@material-ui/core/colors": "MaterialUI"
  }
};
