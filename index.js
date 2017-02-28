var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

var config = require("./webpack.config.js");

var compiler = webpack(config);

var server = new WebpackDevServer(compiler, {
	hot: true,
	proxy: {
	 	"*": "http://localhost:1995"
 	},
	watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  },
	stats: {
		colors: true
	}
});

server.listen(1995);
