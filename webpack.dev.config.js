const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');

const commonConfig = require('./webpack.common.config.js');

const devConfig = {
    devtool: 'inline-source-map',
    entry: {
        app: [
            'babel-polyfill',
            'react-hot-loader/patch',
            path.join(__dirname, 'src/index.js')
        ]
    },
    output: {
        /*这里本来应该是[chunkhash]的，但是由于[chunkhash]和react-hot-loader不兼容。只能妥协*/
        filename: '[name].[hash].js'
    },
    module: {
        rules: [{
            test: /\.css$/,
            // use: ["style-loader", "css-loader?modules&localIdentName=[local]-[hash:base64:5]", "postcss-loader"]
            use: ["style-loader", "css-loader", "postcss-loader"]
        }]
    },
    devServer: {
        port: 3000,
        contentBase: path.join(__dirname, './dist'),
        historyApiFallback: true,
        host: '0.0.0.0',
        proxy: {
            "/api/*": "http://localhost:8090/$1",
            "/v1":{
                target: "http://120.79.33.178/p2g",
                // target: "http://192.168.0.120:8080/p2g",
                secure:false,
                changeOrigin: true,
                pathRewrite: {
                    '^/v1': '/v1'
                }
            }
        }
    }
};

module.exports = merge({
    customizeArray(a, b, key) {
        /*entry.app不合并，全替换*/
        if (key === 'entry.app') {
            return b;
        }
        return undefined;
    }
})(commonConfig, devConfig);
