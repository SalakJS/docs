---
id: controller
title: Controller
---

控制器，用于处理用户的请求，然后返回相应的结果。

控制器会自动校验数据，根据规则自动注册路由。

## Controller编写

所有的Controller文件必须存放在功能模块的controller目录下，支持多级目录，访问的时候通过相应的目录层级来访问。

框架默认提供了Controller基类，通过定义Controller类来编写代码：

```javascript
// user/controller/user.js
const { Controller } = require('salak')

class User extends Controller {
  async actionIndex () {
    // do something
  }

  async actionLogin () {
    // doLogin
  }
}

module.exports = User
```

我们定义了User类，类中actionXxx会自动注册到路由上，默认会注册：

```bash
actionIndex => GET /user
actionLogin => GET /user/login
```

### action定义

格式为：actionXxx，xxx为默认注册到路由上的地址，xxx为驼峰式

比如：

/frontend/controller/blog/post.js 中的actionIndex，默认注册到的路由为/frontend/blog/post

/frontend/controller/blog/post.js 中的actionShow，默认注册到的路由为/frontend/blog/post/show

action参数，会自动将ctx.params绑定上。

如：

```javascript
async actionIndex (id, user) { // 会注册成 /:id/:user
  // do something
}
```

#### action返回

默认情况下，actionXxx无需返回数据，如果actionXxx方法返回数据，且response未设置情况下，框架会将数据设置为该请求的响应数据。

```javascript
const { Controller } = require('salak')

class Post extends Controller {
  async actionIndex () {
    return {
      id: 'xxxx',
      title: 'Post'
    }
  }
}

module.exports = Post
```

如上，actionIndex 响应数据等同于 `this.ctx.body = { id: 'xxx', title: 'Post' }` 。

#### 覆盖路由规则

如果需要自定义路由规则覆盖默认规则，可以在controller或behavior中添加静态属性routes，如下：

```javascript
const { Controller } = require('salak')

class User extends Controller {
  get static routes () {
    return {
      'PATCH /:id': 'update'
    }
  }

  async actionUpdate (id) {
    // doUpdate
  }
}

module.exports = User
```

routes key规则：`METHOD path`

Controller 继承于 [Base](./objects.html#base)，除了Base提供的属性和方法，还有如下的属性和方法。

### 属性

#### ctx

当前请求的上下文 Koa.Context 对象的实例，可以通过它拿到框架封装以及应用扩展的便捷属性和方法。

#### header

当前请求头部信息。

#### query

获取请求query参数。

#### status

获取和设置状态码。

#### body

获取body，会拿到this.ctx.request.body。

设置body，会设置response返回内容。

#### type

获取和设置`Content-Type`。

### 方法

#### middleware (name, module, options)

中间件调用，只允许出现在constructor中，用于在进入action之前，执行相应的的中间件

- `name: string|Function`: 中间件名称，或控制器内中间件
- `module`: 可选，中间件所在的模块，默认为当前模块，也就是默认会加载当前模块的中间件
- `options`: 可选，配置，会往上回溯合并配置：options => module config

@return {object} Middleware实例: 提供了only和except两个方法

- `only (action)`: 只允许哪些函数可以执行中间件
- `except (action)`: 表示除了哪些action之外执行中间件

action: type: string|Array 执行的action

```javascript
this.middleware('test') // 表示所有方法都会执行test中间件
this.middleware('auth').except('logout') // 表示actionLogout方法不执行auth中间件
this.middleware(['cors', 'error']).only('index') // 表示只有actionIndex方法执行cors中间件和error中间件
this.middleware(async (ctx, next) => {
  await next()
})
```

#### send (body, status = 200)

设置response。

#### success (data, message = '', code = 0)

设置成功返回数据。

```javascript
{
  "code": 0,
  "msg": message,
  "data": data
}
```

#### failure (code, message = '', data)

设置失败数据返回。

```javascript
{
  "code": -1,
  "msg": "",
  "data": null
}
```

**注：返回字段名可以通过配置output fields属性**

## RestController

除了Controller之外，框架还提供了RestController，扩展自Controller。内部自定义了Restful映射关系，一般用在Restful接口上。

映射关系表：

|Action|Http|
|------|----|
|index|GET /|
|create|POST /|
|show|GET /:id|
|replace|PUT /:id|
|update|PATCH /:id|
|destroy|DELETE /:id|

代码如下：

```javascript
const { RestController } = require('salak')

class Post extends RestController {
  async actionIndex () {

  }

  async actionCreate () {

  }

  async actionShow (id) {

  }

  async actionReplace (id) {

  }

  async actionUpdate (id) {

  }

  async actionDestroy (id) {

  }
}

module.exports = Post
```

## 获取HTTP请求参数

在Controller中，提供了比较多的便捷属性来获取。在Salak中，在behavior有定义的情况下，所有的query、body、params参数经过behavior格式校验后，会转换为对应的数据类型。

如：`{ id: Joi.number() }`，那么在Controller中获取`/?id=123`，`this.query.id`返回的是number类型。

### query

query常用于 GET 请求用来传递参数，如 `GET /post?id=123&from=o2`，其中`id=123&from=o2`为传递过来的参数，可以通过如下方式获取：

```javascript
const { id, from } = this.query
```

### body

我们通过URL来传递参数时，可能会存在2个问题：

- 浏览器参数限制，参数过长会导致无法传递；
- 服务器一般会记录请求日志，一些敏感信息存到日志文件容易出现安全问题。

在POST，PUT，DELETE请求中，我们常用body来传递参数。

框架内置了 [bodyParser](./middleware.html#bodyparser) 中间件将请求body格式为object挂在到ctx.request.body。

可以通过如下方式来获取：

```javascript
// POST /post HTTP/1.1
// Host: localhost:3000
// Content-Type: application/json; charset=UTF-8
//
// {"title": "post"}

const { title } = this.body
```

#### body长度限制

默认情况下，bodyParser限制了1m大小，当用户请求body超过了该解析大小，会抛出 `status: 413` 的异常。

我们可以调整 /common/config/default.js bodyParser 的配置项来更变body解析大小限制，如：

```javascript
module.exports = {
  bodyParser: {
    jsonLimit: '1m',
    formLimit: '1m'
  }
}
```

一般情况下，如果使用了nginx作为代理转发，也需要调整 `client_max_body_size` 的大小。

### params

框架会将actionXxx的参数自动注册到路由上，方法参数即为params。

如：/post/show/123

```javascript
async actionShow (id) {

}
```

id 即为 ctx.params.id，为123
