import webpack from 'webpack';
import path from 'path';

export default {
    entry: {
        'app': path.join(__dirname, 'src', 'main', 'js', 'app.js'),
    },
    output: {
        path: path.join(__dirname, 'dist', 'assets', 'js'),
        filename: '[name].js',
    },
    plugins: [
        // new webpack.optimize.DedupePlugin(),
    ],
    module: {
        loaders: [
            { test: /\.js$/,  loaders: ['babel'], exclude: /node_modules/ },
            { test: /\.vue$/, loaders: ['vue'] },
        ],
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.js',
        },
    },
    devtool: '#source-map',
};
