---
id: plugin
title: 插件
---

框架提供了 [扩展](./extend.html) 功能，但只能在当前项目里面使用，如果需要提供给其他项目使用，可以封装成一个插件，发布成一个npm模块。

插件机制保证了框架核心足够精简、稳定和高效，也可以促进代码复用及生态形成。

框架内置的一些功能就是用插件的方式来实现的，如[salak-curl](https://github.com/salakjs/salak-curl)、output。

## 如何编写插件

插件入口文件可以直接返回object，或者返回函数，参数为options、app。

```javascript
// object
module.exports = {
  app: {},
  context: {},
  base: {}
}

// function
module.exports = (options, app) => {
  // do something
  return { // extend
    app: {},
    context: {},
    base: {}
  }
}
```

## 使用插件

### 插件通过npm安装

以 [salak-mongo](https://github.com/SalakJS/salak-mongo) 为例。

```bash
$ npm install --save salak-mongo
```

插件需要在公共模块配置中开启，需要配置 `plugin` 字段。

```javascript
module.exports = {
  plugin: [
    name: 'mongo',
    package: 'salak-mongo'
  ]
}
```

#### 参数介绍

- `name`：插件名称，用于配置插件属性
- `package`：通过npm安装的模块，直接使用模块名称即可；如果是项目中编写的插件，通过`require(pluginPath)` 导入

### 插件配置

#### 开启或关闭

- `enable`：设置插件开启或关闭，默认为true，即开启，如果需要关闭，设置为`false`即可

```javascript
module.exports = {
  mongo: {
    enable: false
  }
}
```

#### 插件options

插件如果需要在初始化时需要传递配置，则在配置文件中编写即可。

```javascript
module.exports = {
  mongo: {
    client: {
      uri: 'mongodb://localhost:27017/yourdb'
    }
  }
}
```
