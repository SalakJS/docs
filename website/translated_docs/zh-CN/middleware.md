---
id: middleware
title: 中间件
---

Salak是基于Koa 2.0开发，所以Salak的中间件形式与Koa中间件一致。

## 编写中间件

### 写法

```javascript
module.exports = (options, app) => {
  return async (ctx, next) => {
    // do something
  }
}
```

or:

```javascript
module.export = async (ctx, next) => {
  // do something
  await next()
}
```

如果返回 async function，会加入到中间件执行队列中，否则会先执行mw(options, app)，然后将返回结果加入到中间件执行队列。

接下来，我们以写简单的error中间件为例：

```javascript
module.exports = ({ status = 500 } = {}, app) => {
  return async (ctx, next) => {
    try {
      await next()

      if (ctx.status === 404 && !ctx.response.body) {
        ctx.throw(404)
      }
    } catch (err) {
      ctx.status = err.status || status
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

- 写中间件名字，以及中间对应的位置，如果中间件通过npm安装，只需指定包名即可，如：

```javascript
module.exports = {
  middleware: [
    {
      name: 'error',
      package: require('path/error')
    },
    {
      name: 'jsonp',
      package: 'koa-jsonp'
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

控制器构造函数还支持控制器内自定义中间件，如

```javascript
this.middleware(async (ctx, next) => {
  await next()
})
```

### 中间件查询原则

在模块配置中，功能模块中间件 =》公共模块中间件

在控制器中，指定模块中间件，查询不到，会查询框架内建中间件

### 使用Koa中间件

以[koa-etag](https://github.com/koajs/etag)为例，在框架运行中加载这个中间件，只需要在配置文件中添加如下代码：

```javascript
module.exports = {
  const config = {}

  config.middleware = [{
    name: 'etag',
    package: 'koa-etag'
  }]

  // etag配置
  config.etag = {}

  return config
}
```

## 通用配置

框架自带的中间件或应用层中间件，都支持如下配置：

- `enable`: Boolean，控制中间件是否开启，默认为true
- `match`: Regex|string|Array|Function，设置只有符合条件的请求才经过该中间件
- `ignore`: Regex|string|Array|Function，设置符合某些规则的请求不经过该中间件

### enable

如果我们需要禁用某个中间件，只需要将其设置为false即可。

```javascript
module.exports = {
  meta: {
    enable: false
  }
}
```

### match/ignore

match和ignore参数一致，但作用相反，不允许同时配置。

如想让仅以/meta开头的请求使用meta中间件，配置如下：

```javascript
module.exports = {
  meta: {
    match: '/meta'
  }
}
```

match和ignore支持的参数如下：

- `string`: 当参数为字符串时，配置的是URL前缀，也能配置成字符串数组；
- `Regex`: 正则表达式，直接匹配路径是否符合条件；
- `Function`: 允许传入函数，由用户控制具体的规则，参数为ctx，通过返回 true/false 来判断是否满足条件。

```javascript
module.exports = {
  meta: {
    match (ctx) {
      if (ctx.path.indexOf('meta') !== 0) {
        return true
      }

      return false
    }
  }
}
```

## 框架默认中间件

框架自带中间件默认执行顺序：

- `static`
- `siteFile`
- `bodyParser`
- `notFound`
- `error`

### 禁用默认中间件

在根模块配置中，将内置中间件enable设置为false即可。

如：

```javascript
module.exports = {
  error: {
    enable: false
  }
}
```

### static

静态资源渲染，采用koa-static

配置：

- `root`: 默认为应用public
- `opts`: 同[koa-static opts](https://github.com/koajs/static#options)

### bodyParser

采用了koa-bodyparser，默认支持json、form解析

配置可参考[koa-bodyparser](https://github.com/koajs/bodyparser#options)

**注：koa-bodyparser已经不包含multipart/form-data解析**

### error

error中间件，处理应用请求过程中报错

配置:

- `status`: 状态码设置，默认为'auto'，表示根据出错状态来自动设置http响应状态码；否则为200状态码
- `type`: 错误输出类型，可以为json或者html，无配置情况下，框架根据accept-type自动选择

### notFound

notFound中间件，处理应用请求404错误

配置：

- `type`: 输出类型，可以为json或html，无配置情况下，框架根据accept-type自动选择
- `pageUrl`: 如设置，出现404时，则跳转至相应URL
- `notFoundHtml`: 定制错误页面

### siteFile

siteFile中间件，用于配置网站文件

如：

- `/favicon.ico`: path.join('/favicon.ico')
