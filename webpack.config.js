const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: [
        './src/main.js'
    ],
    mode: 'development',
    output: {
        path: __dirname + '/build',
        publicPath: '/',
        filename: 'main.min.js',
    },
    // plugins: [
    //     new HtmlWebpackPlugin({
    //         title: '𝕀 ℕ 𝔽 𝕀 ℕ 𝕀 ~ 𝕆 ℂ 𝔼 𝔸 ℕ',
    //         template: 'src/index.template.html',
    //         inject: 'body',
    //     })
    // ],
    devServer: {
      contentBase: __dirname + "/build",
      compress: false,
      port: 8080,
    },
    module: {
        rules: [{
            exclude: /node_modules/,
            loader: 'babel-loader',
        }]
    },
    resolve: {
        extensions: ['.js']
    },
}
