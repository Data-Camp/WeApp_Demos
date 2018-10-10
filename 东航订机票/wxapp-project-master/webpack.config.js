var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var merge=require('utils-merge');
var configBase={
    module:{
        loaders:[
            {
                test: /\.js[x]?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                  presets: ['react', 'es2015', 'stage-0'],
                  plugins:[ "transform-runtime",
                            'react-html-attrs',
                            'transform-class-properties',
                            'transform-decorators-legacy'
                          ]
                }
            },
            {
                test: /\.(css|less)$/,
                exclude:/\.(jpe?g|png|jpg|eot|woff|ttf|svg|gif)$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader?-url!postcss-loader!less-loader')
            }
        ]
    },
    postcss: [
          require('postcss-px2rem')({remUnit:37.5}),
          require('autoprefixer')({browsers: ['> 1%', 'last 2 versions']}),
          require('cssnano')()
        ],
    plugins: [
        new ExtractTextPlugin("[name]/[name].wxss", { allChunks: true })
    ]
}
var lessBasePath='less';
var entryBasePath='scripts';
var outpath='src/utils';
var lessOutPath='src/pages'
var fs=require('fs');
var configs= fs.readdirSync(path.join(__dirname,entryBasePath)).filter(function(dirname){
    return /\.js[x]?$/.test(dirname)
}).map(function(name){
    var config={};
    merge(config,configBase);
    config.entry=path.join(__dirname,entryBasePath,name);
    config.output={
        path:path.resolve(__dirname, outpath),
        filename:name,
        libraryTarget:'commonjs2'
    }
    return config;
})

var lessConfig={
    entry:{}
};
fs.readdirSync(path.join(__dirname,lessBasePath)).filter(function(dirname){
    return /\.less$/.test(dirname)
}).forEach(function(name){
    var filename=name.split('.')[0];
    lessConfig.entry[filename]=path.join(__dirname,lessBasePath,name);
    lessConfig.output={
        path:path.resolve(__dirname, lessOutPath),
        filename:'../../lib/less.js',
    }
})
if(lessConfig.output){
    merge(lessConfig,configBase);
    configs.push(lessConfig);
}

module.exports = configs;
