const path = require('path')
// const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isDevelopment = () => {
	const check = process.env.NODE_ENV === 'development';
	console.log(`is Development check ${check}`);
	return check;
}

module.exports = {
    mode: 'development',
    // verbose: true,
    entry: {
        index: './src/client/index.js',
        print: './src/client/print.js'
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
    },
    resolve: {
        modules: [path.resolve(__dirname, 'src'), 'node_modules``']
    },
    module: {
        rules: [
            {
                test: '/\.js$/',
                exclude: /node_modules/,
                loader: "babel-loader"
            },
			{
				test: /\.s(a|c)ss$/,
				use: [
					isDevelopment() ? 'style-loader' : MiniCssExtractPlugin.loader,
					'css-loader',
					{
						loader: 'sass-loader',
						options: {
							sourceMap: isDevelopment()
						}
					}
				]
				// exclude: /\.module.(s(a|c)ss)$/,
			//     loader: [
			//         isDevelopment() ? 'style-loader' : MiniCssExtractPlugin.loader,
			//         'css-loader',
			//         {
			//             loader: 'sass-loader',
			//             options: {
			}
        ]
    },
    plugins: [
        new CleanWebpackPlugin({
            // // Simulate the removal of files
            // // dry: true,
            // // Write Logs to Console
            // verbose: true,
            // // Automatically remove all unused webpack assets on rebuild
            cleanStaleWebpackAssets: false,
            // protectWebpackAssets: false
        }),
		new MiniCssExtractPlugin({
			filename: isDevelopment() ? '[name].css' : '[name].min.css',
			chunkFilename: isDevelopment() ? '[id].css' : '[id].min.css'
		}),
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html"
        })
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
    },
}
