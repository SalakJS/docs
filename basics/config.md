# 配置

框架提供了强大且可扩展的配置功能，会自动合并功能模块、通用模块以及框架的配置，按顺序覆盖，且可以根据环境维护不同的配置。

配置文件存放在各自模块的config目录中。

## 多环境配置

框架支持根据环境来加载配置，定义多个环境的文件，如下：

```
config
├── default.js
├── production.js
├── development.js
└── test.js
```

## 配置写法

配置文件返回Object，可以覆盖框架默认的配置，也可以定义自己的配置。

```javascript
const path = require('path')

module.exports = {
  logger: {
    root: path.join('/tmp', 'logs') // 修改默认日志存放地址
  }
}
```

## 配置加载顺序

以development环境为例：

```
-> 公共模块默认配置 default.js
-> 公共模块环境配置 development.js
-> 功能模块默认配置 default.js
-> 功能模块环境配置 development
```

## 配置使用规则

后面的配置会覆盖前面的配置，在当前模块使用的配置，将是模块配置与通用配置合并后的配置。

## 通用模块常用配置字段

### bootstraps

type: Array(string|Object)

模块配置入口，用于定义功能模块，存在该字段说明为多模块模式，否则为单模块模式

```javascript
const path = require('path')

module.exports = {
  bootstraps: [
    'frontend',
    {
      backend: path.join(__dirname, 'backend')
    }
  ]
}
```

### routes

路由配置，提供了prefix, defaultRoute, defaultMethod字段，在功能模块中，该字段还提供了alias字段，用于设置模块在路由中的别名。

如：

功能模块:

```javascript
module.exports = {
  routes: {
    prefix: '/api', // 路由前缀
    alias: 'blog', // 注册路由时用alias代替module名字
    defaultRoute: 'post/show', // 标示Post控制器下actionShow方法进行处理
    defaultMethod: ['GET'] // 默认是GET请求
  }
}
```

公共模块：

```javascript
module.exports = {
  routes: {
    prefix: '/api',
    defaultRoute: 'blog/post', // 等同于blog/post/index 标示blog模块下post控制器中的actionIndex
    defaultMethod: 'GET'
  }
}
```

### logger

[日志配置](/basics/logger.html)

### swagger

[文档设置](/basics/docs.html)

## 中间件配置

在相应的config中添加中间件对应的options

对于内置的中间件设置，可以修改对应的设置

如static中间件（用于渲染静态资源）的设置：

```javascript
module.exports = {
  static: {
    root: '/exports/www',
    opts: {
      maxage: 3600000 // 缓存1小时
    }
  }
}
```
