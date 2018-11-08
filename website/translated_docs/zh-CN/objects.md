---
id: objects
title: 内置对象
---

## Salak

Salak，继承于Koa，在一个应用中，只会被实例化一次。

### constructor (options)

Options:

- `baseDir`: 应用根目录，默认为当前执行目录
- `opts`: 配置
  - `opts.root`: 根模块，默认为common
  - `opts.app`: 模块代码存放目录，默认为当前目录
  - `opts.runtime`: 框架启动临时文件存放目录，默认为当前目录runtime目录

### 实例属性/方法

属性：

- `root`: string 应用根模块名称
- `baseDir`: string 项目源码目录
- `appDir`: string 项目模块目录
- `runtime`: string 临时文件存放目录
- `logger`: object [Logger](./logger.html)日志对象
- `configs`: object 配置
- `modules`: object 模块
- `version`: string Salak版本号
- `loader`: object [Loader](./loader.html)
- `context`: object ctx对象

方法：

- `callback (): Promise<Server>` 返回callback适配http.createServer()接收请求
- `listen (...args): Promise<Server>` 传参至Server#listen
- `run (port): Promise<void>` 启动应用
- `beforeStart (fn: Function): void` 框架启动前执行
- `beforeClose (fn: Function): void` 框架关闭前执行，可执行数据库关闭等
- `close (): Promise<void>` 关闭实例，用于触发beforeClose()
- `config (name, module = app.root): any` 返回配置信息
- `setConfig (name, value, module = app.root): void` 设置配置信息，默认设置所有模块
- `service (name, module = app.root): any` 调用Service
- `curl (uri: string, opts?: object): Promise` 发起http请求

#### app.context

- `curl (uri: string, opts?: object): Promise` 发起http请求

### 事件

在框架运行时，会在实例上触发一些事件，可以监听这些事件做一些操作。

- `ready`: 应用加载完资源时触发
- `ready_timeout`: beforeStart超时触发
- `error`: 运行时出现异常，会触发error事件

### 实例获取方式

#### 扩展

定义框架基类扩展时，通过函数参数获取到实例。

```javascript
module.exports = (app) => {}
```

#### 中间件/插件

在中间件/插件中，第二个参数就是app实例，应用会自动加载进去。

如：

```javascript
module.exports = (options, app) => {}
```

#### Service/Controller/Schedule/Behavior

在Service，Controller, Schedule, Behavior中，可以通过this.app可以访问到。

## Base

框架私有类，Controller、Service、Behavior、Schedule均继承于该类，不能直接使用。

属性：

- `app`: Salak实例
- `module`: 模块名称
- `root`: 根模块名称
- `helper`: 工具类
- `logger`: object [Logger](./logger.html)日志对象

方法：

- `config (key: string, module: string): any` 获取配置信息
- `service (name: string, module: string, args?: any[]): Service` service调用
- `curl (uri: string, opts?: object): Promise` 发起http请求
- `throw (...args): void` 抛出错误

## Controller

框架提供了一个 **[Controller](./controller.html)** 基类，所有的Controller推荐继承于该基类。

```javascript
const { Controller } = require('salak')

class Blog extends Controller {
  async actionIndex () {

  }
}

module.exports = Blog
```

## RestController

**[RestController](./controller.html#restcontroller)** 继承于Controller，主要是提供便捷的Restful 风格的路由机制。

```javascript
const { RestController } = require('salak')

class Blog extends RestController {
  async actionIndex () {

  }

  async actionShow (id) {

  }
}

module.exports = Blog
```

## Behavior

**[Behavior](./behavior.html)** 用于定义路由器校验规则，用于校验输入输出及文档生成。

```javascript
const { Behavior, Joi } = require('salak')

class Blog extends Behavior {
  actionShow () {
    return {
      validate: {
        params: {
          id: Joi.number().required()
        }
      }
    }
  }
}

module.exports = Blog
```

## Service

**[Service](./serivice.html)** 基类，推荐所有Service都继承于该基类，主要用于封装业务逻辑。

```javascript
const { Service } = require('salak')

class Post extends Service {
  async create (data) {
    return data
  }
}

module.exports = Post
```

调用:

```javascript
const { Controller } = require('salak')

const Blog extends Controller {
  async actionCreate () {
    const post = await this.service('post').create(this.body)

    return post
  }
}

module.exports = Blog
```

## Schedule

框架提供了 **[Schedule](./schedule.html)** 用于编写定时任务，所有的定时任务推荐基于该基类来实现。

```javascript
const { Schedule } = require('salak')

class Task extends Schedule {
  static get timer () {
    return {
      interval: '10s'
    }
  }

  async run () {

  }
}

module.exports = Task
```

## Joi

数据校验，refer: [https://github.com/hapijs/joi](https://github.com/hapijs/joi)
