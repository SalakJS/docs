---
id: behavior
title: Behavior
---

当Action处理用户请求时，经常需要先校验用户提交过来的数据，然后才进行后续的操作，如果把这些逻辑代码放到Action中，会使Action变得比较冗长。

所以，框架提供了Behavior层，用于处理数据校验，同时能够根据这些校验规则生成接口文档。

## Behavior

Behavior目录存放在模块`${module}/behavior`下，Behavior类编写如下：

```javascript
// user/behavior/user.js
const { Behavior, Joi } = require('salak')

class User extends Behavior {
  actionIndex () {
    return {
      meta: {
        summary: '',
        description: '',
        tags: ['User']
      },
      validate: {
        query: {
          id: Joi.number().required()
        }
      }
    }
  }
}

module.exports = User
```

其中，文件名和层级与Controller文件保持一致，Behavior中的Action与Controller中的Action一一对应。

如果请求信息校验不通过，将会返回 `code：400` 的异常；如果响应信息校验不通过，将会返回 `code: 500` 的异常。同时会将异常详细信息默认写在details中。

## 方法

Behavior 继承于 [Base](./objects.html#base)，除Base之外的属性和方法，默认提供了`behavior`方法

### behavior (name, module = this.module)

用于调用其他Behavior实例。

- `name`：Behavior名称
- `module`：Behavior所在的模块，默认为当前模块

@return Behavior实例

## 校验规则编写

### meta

描述接口详情，用于生成文档接口的描述。

- `summary`：接口概要
- `description`：接口描述
- `tags`：接口标签

### validate

接口校验规则采用 [Joi](https://github.com/hapijs/joi/blob/master/API.md) 编写，用于校验数据和生成文档时接口字段描述。

#### query

用户请求URL query参数规则定义，如：

```javascript
query: {
  id: Joi.number().required().description('ID desc')
}
```

#### body

用户请求body参数规则定义，如：

```javascript
body: {
  title: Joi.string().required().description('Title')
}
```

#### params

用户请求路由 params 规则定义，如：

```javascript
params: {
  id: Joi.number().min(5).required().description('ID desc')
}
```

#### header

用户请求header规则定义，如：

```javascript
header: {
  'Authorization': Joi.string().required().description('Auth')
}
```

#### formData

用户请求formData规则定义，如：

```javascript
formData: {
  file: Joi.binary()
}
```

#### responses

响应信息规则定义，由状态码和具体的校验规则组成，如：

```javascript
responses: {
  200: {
    headers: {
    },
    body: {
    }
  }
}
```

- `key`：statusCode，可以为状态码，或状态码范围，如：301-307
- `value`：object，可包含headers、body字段

### method

接口请求HTTP Method，如需要将默认注册HTTP Method修改，更改该属性即可。

## Routes 规则自定义

框架提供了静态方法routes，可以覆盖默认路由加载规则，推荐统一在behavior中定义。

如：

```javascript
static get routes () {
  return {
    'POST /:id': 'create'
  }
}
```
