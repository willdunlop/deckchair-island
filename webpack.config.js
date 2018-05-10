
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
