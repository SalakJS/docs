---
id: router
title: 路由
---

Router主要是用来描述请求URL与具体承担执行动作的Controller的映射关系。

框架采用了自动映射的关系，无需配置文件来定义具体路由的指向。

## 路由与Controller如何映射

Controller文件必须存放在功能模块的controller目录下，支持多级目录，访问时通过相应的目录层级即可。

如：

```bash
user/controller/login.js

Module: user, Controller: login, Action: index => GET /user/login
```

## 路由配置

在模块配置文件中，添加`routes`字段，如

```javascript
module.exports = {
  routes: {
    defaultRoute: 'blog/post'
  }
}
```

### 单模块模式路由设置

- `prefix: string`: 路由前缀
- `defaultRoute: string`: 设置默认路由，/${controller}(/${action})?，action未设置时，默认为`index`
- `defaultMethods: string|string[]`: 默认注册的HTTP Methods，默认为GET
- `loadOrder: string[]`: Controller加载顺序，可指定加载模块哪些控制器以及相应的路由注册顺序
- `replaceIndex: boolean`: 是否保留路由中index，如index.js控制器，如保留，则路由为 /index/${action}，否则为/${action}，默认为true，即不保留`index`

### 多模块模式路由配置

#### 公共模块路由配置

- `prefix: string`: 路由前缀
- `defaultRoute: string`: 设置默认路由，/${module}/${controller}(/${action})?，action未设置时，默认为`index`
- `defaultMethods: string|string[]`: 默认注册的HTTP Methods，默认为GET
- `loadOrder: string[]`: Controller加载顺序，可指定加载模块哪些控制器以及相应的路由注册顺序
- `replaceIndex: boolean`: 是否保留路由中index，如index.js控制器，如保留，则路由为 /index/${action}，否则为/${action}，默认为true，即不保留`index`

#### 功能模块路由设置

- `prefix: string`: 路由前缀
- `alias: string`: 模块路由别名，如user模块`alias: person`，路由会重命名为/person/${controller}/${action}
- `defaultRoute: string`: 设置默认路由，/${controller}(/${action})?，action未设置时，默认为`index`
- `defaultMethods: string|string[]`: 默认注册的HTTP Methods，默认为GET
- `loadOrder: string[]`: Controller加载顺序，可指定加载模块哪些控制器以及相应的路由注册顺序

## 路由匹配顺序
在URL可以匹配多个路由的情况下，路由的选择默认是由对应actionXXX方法在controller中注册的先后顺序决定，与behavior或controller中Routes中配置顺序无关。使用loadOrder配置可以覆盖默认行为。


## 路由注册路径

在框架启动时，会生成 `/runtime/router/definitions.json`，该文件包含了注册的所有路由，可以根据该文件来排查一些问题。
