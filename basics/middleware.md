# 中间件

Salak是基于Koa 2.0开发，所以Salak的中间件形式与Koa中间件一致。

## 编写中间件

### 写法

```javascript
module.exports = (options, app) => {
  // do something
}
```

如果没有返回 async function，那么该中间只会在初始化时调用一次，否则会加入到中间件执行队列中。

那么，这就可以用中间件的方式来做一些初始化的工作，如数据库连接。

接下来，我们以写简单的error中间件为例：

```javascript
module.exports = (options, app) => {
  options = Object.assign({}, {
    status: 500
  }, options)

  return async (ctx, next) => {
    try {
      await next()

      if (ctx.status === 404 && !ctx.response.body) {
        ctx.throw(404)
      }
    } catch (err) {
      app.logger.error(err)

      ctx.status = err.status || options.status
      ctx.body = err.message
    }
  }
}
```

### 使用中间件


#### 模块配置中使用

通过配置middleware字段，中间件配置通过配置对应的key即可

middleware配置有两种写法：

- 直接写中间件对应文件的名字，如error.js:

```javascript
module.exports = {
  middleware: [
    'error'
  ],
  error: {
    status: 500
  }
}
```

- 写中间件名字，以及中间对应的位置，如：

```javascript
module.exports = {
  middleware: [
    {
      name: 'error',
      package: require('path/error')
    }
  ]
}
```

#### 控制器构造函数中使用

```javascript
this.middleware('error', this.module, {
  status: 503
})
```

### 中间件查询原则

在模块配置中，功能模块中间件 =》公共模块中间件 =》框架内建中间件

在控制器中，指定模块中间件，查询不到，会查询框架内建中间件

## 通用配置

无论是在模块中加载，还是在控制器加载的中间件，都支持如下配置：

- enable: 中间件是否开启，默认为true

## 框架默认中间件

- output
- bodyparser
- cors
- jsonp
- view
- error
- swagger

### output

单次调用，用于定义app.output，控制输出json的默认字段。

可以通过修改如下配置修改默认字段名：

- code: 输出接口状态
- msg: 输出接口信息
- data: 输出接口数据
- details: 错误相关

### bodyparser

采用了koa-bodyparser，默认支持json、form解析

配置可参考[koa-bodyparser](https://github.com/koajs/bodyparser#options)

**注：koa-bodyparser已经不包含multipart/form-data解析**

### cors

跨域请求中间件

配置：

- allowMethods 允许的方法
- exposeHeaders 允许暴露的响应首部
- allowHeaders 允许的头部
- maxAge 用于设置preflight缓存时间
- credentials 是否允许cookie

### jsonp

jsonp输出中间件，会自动包装callback

### view

视图中间件，基于[koa-views](https://github.com/queckezz/koa-views)

配置(即[views opts](https://github.com/queckezz/koa-views#viewsroot-opts))：

- extension
- map
- engineSource
- options

### error

error中间件，处理应用请求过程中报错

配置:

- status: 状态码设置，默认为'auto'，表示根据出错状态来自动设置http响应状态码；否则为200状态码
- type: 错误输出类型，可以为json或者html，无配置情况下，框架根据accept-type自动选择
- template: 错误视图路径，默认为框架自带的error.ejs

### swagger

单次调用，用于注册文档路由以及json所在路由

配置：

- apiDocs: api访问地址，默认为/api-docs
- json: api json访问地址，默认为/api-json
- html: api 渲染默认，默认采用[ReDoc](https://github.com/Rebilly/ReDoc)

### 替换默认中间件

在模块middleware中编写同名中间件即可。
