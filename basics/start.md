# 启动自定义

我们有时候需要在应用启动之前做一些初始化工作，等初始化完成之后启动服务。

框架提供了钩子进行启动自定义，例如，需要加载远程的配置文件。

```javascript
const Salak = require('salak')
const app = new Salak({
  opts: {
    readyTimeout: 120000
  }
})

app.beforeStart(async () => {
  app.remoteConfigs = await curl('http://xxxx')
})

app.on('ready', () => {
  // 加载完成了，可以注册http server了
}).on('ready_timeout', () => {
  // 超时了，默认为120s
})
```

因为beforeStart在加载middleware、service以及controller之前加载，所以app.remoteConfigs可以在这些地方使用。

如：

```javascript
const { Controller } = require('salak')

class Home extends Controller {
  async actionIndex () {
    console.log(this.app.remoteConfigs)
  }
}
```

## 配置

实例化Salak时，可以通过配置readyTimeout来指定启动自定义的超时时间，默认为120000，即120s

同时，还暴露了ready 以及 ready_timeout 事件

ready: 表示已经应用已经加载完毕，可以注册服务了  
ready_timeout: 表示自定义服务启动超时
