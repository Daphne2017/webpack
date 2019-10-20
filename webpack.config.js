const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    entry: './src/js/index.js',  // 打包文件入口
    output: {
        path: path.resolve(__dirname, 'public'),  // 打包输出的目录名称是什么，打包出口目录
        filename: 'js/bundle-[hash].js'  // 配置哈希随机文件名,打包到js目录下,如果文件没有修改
        // 则随机的哈希名字没有改变
    },
  // 代理配置地址：https://segmentfault.com/a/1190000016199721
  // 代理配置地址：https://www.cnblogs.com/beka/p/8479710.html
    devServer:{
      
        contentBase:'./public', // 配置本地服务器的路径
        proxy: {
          '/api': {
            target: ' https://segmentfault.com',
            // https://segmentfault.com/a/1190000018704305
            pathRewrite: { '^/api': '' },
            changeOrigin: true,     // target是域名的话，需要这个参数，
            secure: true,          // 设置支持https协议的代理
          }
        },
        port:8080,
        hot:true, // 实时刷新
        inline:true,
    },
    module:{
        rules:[
            {
                test:/(\.jsx|\.js)$/,
                use:{
                   loader:"babel-loader",
                   options:{
                     presets:["env",'react']
                   }
                },
                exclude:/node_modules/
            },
            // css提取配置信息
            { 
                test:/\.css$/,
                // use: ['style-loader','css-loader'],
                use:ExtractTextPlugin.extract({
        
                    fallback:"style-loader",
                    use:[{
                        loader:'css-loader',
                        options:{
                            // minimize: true //css压缩  1.0.0 以后 minimize 选项是 breaking change 了
                        }
                    }],
                    publicPath:"../"  // 如何配置 publicPath？
                })
            },
            {test:/\.(jpg|jpeg|png|mp3|mp4|)$/,  use: 'file-loader?limit=1024&name=./imgs/[name].[ext]'}, // 打包到imgs文件夹下
            {
                test:/\.html$/,
                use: 'html-withimg-loader'
            },
            {
                test:/\.(woff|ttf|svg|eot|xttf|woff2)$/,
                use: 'file-loader?limit=1024&name=./fonts/[name].[ext]' // 打包到fonts文件夹下
            },
        ]
    },
    plugins:[
      new ExtractTextPlugin('./css/[name].css'), // 输出css文件，打包css文件
	    new HtmlWebpackPlugin({
          template:"./src/index.html",
        //   filename:'a.html',  // 生成的文件名，不写默认打包生成输出口目录下的index.html,
	      minify:{
	          removeAttributeQuotes:true,//去除引号
	          removeComments:true,//去除注释
	          removeEmptyAttributes:true,//去除空属性
	          collapseWhitespace:true//去除空格
	        }

	    })

  ]
};