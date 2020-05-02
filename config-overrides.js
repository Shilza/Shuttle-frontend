const {override, addBabelPlugins, addWebpackPlugin} = require("customize-cra");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = override(
  ...addBabelPlugins(
    "@babel/plugin-proposal-export-default-from"
  )
);
