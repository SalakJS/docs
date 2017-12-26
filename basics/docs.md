# 文档

## 介绍

框架采用[Swagger 2.0](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md)，配合Joi校验规则来生成文档。

swagger配置只能出现在公共模块中。

我们先来看一个示例配置：

```javascript
module.exports = {
  swagger: {
    enable: true,
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

## 配置

enable: 是否开启swagger文档

spec: swagger 选项

spec.info: Object, 必须，需要提供至少title，description，version字段，还可以提供contact、license字段，同Swagger info字段

spec.host: string，可选，文档host地址

spec.tags: Array，可选，item必须包含name和description字段
