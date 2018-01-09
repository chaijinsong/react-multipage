## creat-react-app的多页脚手架

### 使用方法
> 1.git clone到本地，添加多个页面就按照以下步骤来添加

> 2.在config中修改webpack.config.dev.js文件
* 修改entry
```js 
//这里我已经写成对象格式了，有多少个页面就添加多少个key:value对，这里我已经添加了一个admin，数组中的paths.appSrc+'/admin.js'就是这个html页面的入口文件
    entry: { 
        index:[
            require.resolve('./polyfills'),
            require.resolve('react-dev-utils/webpackHotDevClient'),
            paths.appIndexJs,
        ],
        admin:[
            require.resolve('./polyfills'),
            require.resolve('react-dev-utils/webpackHotDevClient'),
            paths.appSrc + '/admin.js',
        ]
    }
```
* 修改plugins中的HtmlWebpackPlugin
```js 
    //多少个页面就new 多少个 HtmlWebpackPlugin 并且在每一个里面的chunks都需要和上面的entry中的key匹配，例如上面entry中有index和admin这两个。这里的chunks也需要是index和admin
    new HtmlWebpackPlugin({
        inject: true,
        chunks:["index"],
        template: paths.appHtml,
    }),
    new HtmlWebpackPlugin({
        inject: true,
        chunks:["admin"],
        template:paths.appHtml,
        filename:'admin.html'
    }),
```
> 3.修改config下的webpack.config.prod.js文件
* 修改entry
```js 
    //这里的paths.appIndexJs和paths.appSrc+'/admin.js'依然是每个html的入口文件
    entry:{
        index:[
            require.resolve('./polyfills'), 
            paths.appIndexJs
        ],
        admin:[
            require.resolve('./polyfills'),
            paths.appSrc+'/admin.js'
        ]
    }
```
* 修改plugins中的HtmlWebpackPlugin
```js
    //和开发环境下一样，多少个html就new多少个 HtmllWebpackPlugin，每个都需要指定chunks,并且指定filename，在minify中配置是否压缩js、css等，这是生产环境下的配置
    new HtmlWebpackPlugin({
      inject: true,
      chunks:["index"],
      template: paths.appHtml,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new HtmlWebpackPlugin({
      inject: true,
      chunks:["admin"],
      template: paths.appHtml,
      filename:'admin.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
```
> 3.在开发环境中如果想通过地址访问不同的页面，需要修改webpackDevServer.config.js
* 修改historyApiFallback
```js
    //这里的rewrites:[ {from: /^\/admin.html/, to: '/build/admin.html' }] 数组里面是一个个对象，对象中前面的值是在开发时候访问的路径，例如 npm run start之后会监听 localhost:3000 ，此时在后面加上 /admin.html就会访问admin.html中的内容，默认是访问index.html；数组中的第二个值是生产环境下的文件的路径。如果有很多页面，就在rewrites中添加更多对象
    historyApiFallback: {
      disableDotRule: true,
      rewrites: [
        { from: /^\/admin.html/, to: '/build/admin.html' },
      ]
    },
```

### 如果对您有用请star一下，还没收到过star呢。。。。。。 thanks!! 如果哪里错了，提一下issue，虽然我还不大会用github。。
