# BaseContext

BaseContext是Controller以及Service的基类，在运行过程中进行实例化，并且会把koa ctx注入到实例中，同时提供了很多使用方法。

在实际开发过程中，一般不直接使用BaseContext。不过，在一些中间件开发中，可能会为了提供更简便的功能而对BaseContext注入一些方法。

接下来，我们就来看下BaseContext提供了哪些实用的函数以及对象。

## constructor (context, module)

- context: Object，koa请求过程的ctx
- module: string，调用的模块

## config (key, module)

获取配置信息

- key: string，配置key
- module: string, 默认为当前模块

## service (key, module)

获取service实例

- key: string，service名称
- module: string, service所在的模块，默认查询当前模块

## query, body

type: Object

用于获取当前response中query、body相关数据

## helper

type: Object

用于获取应用的工具类

## 其他公有属性

- module: 调用的模块
- ctx: 当前请求的ctx
- app: 应用app实例
- logger: 日志
