const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const context = path.resolve(__dirname, '../');

module.exports = {
	mode: 'production',
    entry: {
        all: ['babel-polyfill', './src/js/main.js', './src/sass/main.scss'],
        images: './webpack/images.js'
    },
    output: {
        path: path.resolve(context, 'dist/'),
        filename: 'js/[name].js?[hash]'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        })
	],
	target: "webworker", // or 'node' or 'node-webkit'
    externals:{
        fs:    "commonjs fs",
        path:  "commonjs path"
	},
	node: {
		fs: "empty"
	},
    module: { 
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
				test: /\.(sass|scss)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: 'css/[name].css?[hash]',
						},
					},
					{
						loader: 'extract-loader',
						options: {
							publicPath: '../',
						},
					},
					{
						loader: 'css-loader',
						options: {
							sourceMap: true,
						},
					},
					{
						loader: 'sass-loader',
						options: {
							compress: true
						},
					},
				],
            },
            {
				test: /\.(jpg|jpeg|png|svg|ico|gif)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[path][name].[ext]',
							context: 'src/',
						},
					},
					{
						loader: 'image-webpack-loader',
						options: {
							svgo: {
								plugins: [{removeEmptyAttrs: true}],
							},
							optipng: {
								optimizationLevel: 5,
							},
							mozjpeg: {
								quality: 80,
							},
						},
					},
				],
			}
        ]
    }
};