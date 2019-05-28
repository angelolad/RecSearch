const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    
    //Where webpack will start looking for the dependencies to bundle
    entry: ['babel-polyfill','./src/js/index.js'],
    //Where to save the bundle file
    output: {
        //Combines the current path we are in with the dist folder
        path: path.resolve(__dirname,'dist'),
        filename: 'js/bundle.js'
    },
    devServer:{
        //Where webpack will use the files
        contentBase: './dist'
    },
    //This is used to automatically copy the html source code to the dist folder
    //and inject the script tag 
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        })
    ],
    //For Babel
    module: {
        rules: [
            {   
                //Test for all javaScript files
                test: /\.js$/,
                //Dont need to convert the npm files
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
   
}