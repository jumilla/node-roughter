
module.exports = {
	entry: __dirname + '/src/browser.ts',
	output: {
		path: __dirname + '/dist',
		filename: 'roughter.js'
	},

	resolve: {
		extensions: ['.ts'],
	},

	module: {
		rules: [
			{ test: /\.ts$/, loader: 'ts-loader', options: {
			} },
		]
	},

	devtool: 'inline-source-map',
}
