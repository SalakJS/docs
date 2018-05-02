# Controller

控制器，继承自[Context](./context.html)，用于处理用户的请求，然后返回相应的结果。

控制器会自动校验数据，会根据规则自动注册路由。

比较推荐的做法是，在Controller编写对应的校验规则，然后调用相应的Service处理业务逻辑，最后输出结果。

## 如何编写Controller

所有的Controller文件必须存放在功能模块的controller目录下，支持多级目录，访问的时候通过相应的目录层级来访问。

框架默认提供了Controller基类，我们先来看下除了Context属性和方法之外，还提供了哪些方法。

### Controller

#### middleware (name, module, options)

中间件调用，只允许出现在constructor中，用于在进入action之前，执行相应的的中间件

- name: 中间件名称，或控制器内中间件
- module: 可选，中间件所在的模块，默认为当前模块，也就是默认会加载当前模块的中间件
- options: 可选， 配置，会往上回溯合并配置：options => module config => common config

**在执行过程中，如果查询不到中间件，会查询框架自带的中间件。**

@return {Object} Middleware实例: 提供了only和except两个方法

- only (action): 只允许哪些函数可以执行中间件
- except (action): 表示除了哪些action之外执行中间件

action: type: string|Array 执行的action

```javascript
this.middleware('test') // 表示所有方法都会执行test中间件
this.middleware('auth').except('logout') // 表示actionLogout方法不执行auth中间件
this.middleware(['cors', 'error']).only('index') // 表示只有actionIndex方法执行cors中间件和error中间件
this.middleware(async (ctx, next) => {
  await next()
})
```

#### behaviors ()

静态方法，可选，用于定义路由规则以及校验规则，需要返回一个对象，包含两个字段routes、rules。

建议定义，特别是rules字段，用于自动输出文档。

routes: type: Object

rules: type: Object

示例：

```javascript
static behaviors () {
  return {
    routes: {
      'GET /unknow': 'index' // 表示将actionIndex注册为/unknow，method为GET的路由
    },
    rules: {
      index: {
        meta: { // 接口信息
          summary: '', // 接口概要
          description: '', // 接口描述
          tags: ['Test'] // 接口类别
        },
        validate: { // 接口校验规则，包含query，params，body, formData，header，responses
          query: {
            id: Joi.number().required() // 表示query参数id必须为数字，并且必须提供
          },
          responses: {
            200: {
              body: { // 表示校验状态码为200是的body体
                code: Joi.number().required()
              },
              headers: { // 表示校验状态码为200是的header
              }
            }
          }
        }
      }
    }
  }
}
```

#### sendJson (code, msg, data)

快捷输出方法，输出json

- code: 接口状态，一般0表示成功
- msg: 接口描述
- data: 接口数据

#### send (status, body)

接口输出

- status: http状态码
- body: 接口数据

#### render (name, variables, module)

Async Function，必须打开view中间件

视图渲染

- name: 视图名称
- variables: 视图变量
- module: 模块，视图所在模块，默认为当前模块

#### action定义

格式为：actionXxx，xxx为默认注册到路由上的地址

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

除了Controller之外，框架还提供了RestController，扩展自Controller。

### RestController

内部自定义了Restful映射关系，一般用在Restful接口上。

映射关系表：

|Action|Http|
|------|----|
|index|GET /|
|create|POST /|
|show|GET /:id|
|replace|PUT /:id|
|update|PATCH /:id|
|destroy|DELETE /:id|

## 示例

以/blog/post.js为例，如下

```javascript
const { Controller, Joi } = require('salak')

class Post extends Controller {
  constructor (...args) {
    super(...args)
    this.middleware('auth').only('index')
  }

  static behaviors () {
    return {
      routes: { // 可选，默认只会注册GET请求
        'POST /:id': 'index',
        'GET /:id': 'index'
      },
      rules: {
        index: {
          meta: {
            summary: '文章详情'
            description: '获取文章详情',
            meta: ['Blog']
          },
          validate: {
            params: {
              id: Joi.number().required()
            }
          }
        }
      }
    }
  }

  async actionIndex (id) {
    const post = await this.service('post').findPost(id)
    this.sendJson(0, 'ok', post)
  }
}

module.exports = Post
```
