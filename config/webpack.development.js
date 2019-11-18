const path = require("path");

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, "../dist"),
    hot: true,
    port: 9000,
    quiet: true
  }
};
