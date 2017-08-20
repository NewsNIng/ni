var path = require("path");
var webpack = require("webpack");

module.exports = {
	devtool: false,
	entry: {
		'ni': ['./src/index.js'],
		'vue.ni': ['./src/Vue/index.js']
	},
	output: {
		// path: path.resolve(__dirname, "dist"), 
		path: path.resolve(__dirname, "App/js"),
		filename: '[name].js'
	},
	module: {
		loaders: [
			{test: /\.js$/, loader: "babel"}
  	]
	},
	plugins: [
		new webpack.BannerPlugin("ni v0.0.1 by NewsNing"),
    // new webpack.HotModuleReplacementPlugin()
		new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
};
