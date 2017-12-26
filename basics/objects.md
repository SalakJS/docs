# 内置对象

## Salak

Salak，基于Koa，在一个应用中，只会被实例化一次

### 实例获取方式

在中间件中，第二个参数就是app实例，应用会自动加载进去

如：

```javascript
module.exports = (options, app) => {}
```

在Service，Controller中，可以通过this.app可以访问到

### 实例对象

- BaseContext
- logger
- root
- configs
- loader

## BaseContext

Salak Context基类

## Service

业务逻辑基类

## Controller

控制器

## RestController

restful 形式 控制器

## Joi

refer: [https://github.com/hapijs/joi](https://github.com/hapijs/joi)

## makeOutputSchema (data)

type: Function

@return: Joi object

配合output插件使用，用于便捷校验响应数据
