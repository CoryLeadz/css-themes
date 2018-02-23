var path = require('path');

module.exports = {
    entry: {
        app: './Natours/dev/assets/scripts/app.js',
        vendor: './Natours/dev/assets/scripts/vendor.js'

    },
    output: {
        path: path.resolve(__dirname, './Natours/dev/temp/scripts/'),
        filename: "[name].js"
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                },
                test: /\.js$/,
                exclude: /node_modules/
            }
        ]
    }
}