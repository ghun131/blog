const path = require('path');

module.exports = {
    entry: "./src/App.js",
    mode: "none",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            { test: /\.jsx?$/, loader: "babel-loader?cacheDirectory"},
            { test: /\.css$/, use: ["style-loader", "css-loader"]},
            { test: /\.(png|svg|jpg|gif)$/, use: ["file-loader"]}
        ]
    }
}