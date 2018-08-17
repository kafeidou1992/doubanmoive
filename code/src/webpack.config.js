const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, './js/index.js'),
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, '../public/js')
  },
  devtool: 'inline-source-map',
  module: {
        rules: [
           {
             test: /\.less$/,
             use: [
               'style-loader',
               'css-loader',
               'less-loader'
                ]
            },
            { 
              test: /\.js$/, 
              exclude: /node_modules/, 
              loader: "babel-loader" 
            }
        ]
    }   
};
