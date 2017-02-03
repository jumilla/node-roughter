
module.exports = {
	entry: __dirname + '/src/browser.ts',
	output: {
		path: __dirname + '/dist',
		filename: 'roughter.js'
	},

	module: {
		rules: [
			{ test: /\.ts$/, loader: 'ts-loader?sourceMaps' },
		]
	},

	devtool: 'inline-source-map',
}
