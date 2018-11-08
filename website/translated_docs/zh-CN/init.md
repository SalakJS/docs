---
id: init
title: 启动自定义
---

我们有时候需要在应用启动之前做一些初始化工作，等初始化完成之后启动服务。

框架提供了钩子进行启动自定义，例如，需要加载远程的配置。

## 如何编写

```javascript
const Salak = require('salak')

app.beforeStart(async () => {
  app.remoteConfigs = await app.curl('http://xxxx')
})

app.on('ready', () => {
  // ready
}).on('ready_timeout', () => {
  // timeout
})
```

在Controller中使用：

```javascript
const { Controller } = require('salak')

class Home extends Controller {
  async actionIndex () {
    console.log(this.app.remoteConfigs)
  }
}

module.exports = Home
```

## 配置

实例化Salak时，可以通过配置readyTimeout来指定启动自定义的超时时间，默认为120000，即120s

```javascript
// common/config/default.js
module.exports = {
  readyTimeout: 120000
}
```

同时，还暴露了ready 以及 ready_timeout 事件

- `ready`：表示已经应用已经加载完毕，可以注册服务了  
- `ready_timeout`：表示自定义服务启动超时
