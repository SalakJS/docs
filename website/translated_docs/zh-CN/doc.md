---
id: doc
title: 文档
---

框架提供了文档自动生成功能，减少了维护接口文档的工作量。

## 介绍

框架采用[Swagger 2.0](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md)，配合Joi校验规则来生成文档。

swagger配置只能出现在公共模块中。

我们先来看一个示例配置：

```javascript
// common/config/default.js
module.exports = {
  swagger: {
    enable: true,
    apiJson: '/api-json',
    apiDocs: '/api-docs',
    html: `
<!DOCTYPE html>
<html>
  <head>
    <title>Documents</title>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
      body {
        margin: 0;
        padding: 0;
      }
    </style>
  </head>
  <body>
    <redoc spec-url='./api-json'></redoc>
    <script src="https://storage.360buyimg.com/o2static/redoc.min.js"> </script>
  </body>
</html>`,
    spec: {
      info: {
        title: 'API',
        description: 'For api.',
        version: '1.0.0'
      },
      tags: [
        {
          name: 'Demo',
          description: 'For demo.'
        }
      ]
    }
  }
}
```

## 配置说明

- `enable`：是否开启swagger文档，默认根据是否为生产环境来设置
- `apiJson`：文档JSON地址，默认为 `/api-json`
- `apiDocs`：文档地址，默认为 `/api-docs`
- `html`：文档渲染html，默认为reDoc
- `spec`：swagger 选项
- `spec.info`：object, 必须，需要提供至少title，description，version字段，还可以提供contact、license字段，同Swagger info字段
- `spec.host`：string，可选，文档host地址
- `spec.tags`：Array，可选，item必须包含name和description字段，接口标签，用于整理接口分类

```javascript
const { Behavior } = require('salak')

class User extends Behavior {
  actionIndex () {
    return {
      meta: {
        summary: '',
        description: '',
        tags: ['User'] // ref to spec.tags name
      }
    }
  }
}

module.exports = User
```

## 文档访问

文档地址默认为：http://host/api-docs

文档swagger json地址默认为：http://host/api-json

框架在启动时，会将项目的swagger json生成到 `runtime/swagger/swagger.json` 中，可以从该位置获取文档信息。
