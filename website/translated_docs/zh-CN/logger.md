---
id: logger
title: 日志
---

日志在web开发中是必不可少的一部分，对于应用运行状态、问题排查有着很重要的作用。

框架提供的日志功能基于 [winston 3](https://github.com/winstonjs/winston)。

## 主要特性

- 日志分级
- 统一错误日志，错误日志会打印一份到默认的错误日志中
- 支持日志切割，可以按年、月、日切割

## 配置

配置示例：

```javascript
// common/config/default.js
module.exports = {
  logger: {
    root: '/tmp/logs',
    injectConsole: true,
    formatType: 'log4js',
    fileType: 'file',
    capture: {
      enable: true,
      category: 'http',
      level: 'auto'
    },
    categories: {
      user: {
        transports: [
          'user',
          'error'
        ]
      }
    },
    transports: {
      user: {
        type: 'file',
        filename: 'user/user.log',
        maxsize: '50m',
        maxFiles: 30
      }
    }
    defaultLevel: 'debug'
  }
}
```

### root

string，路径，日志文件存放目录，默认存放在logs下

### injectConsole

boolean，是否输出到stdout，默认根据是否为生产环境来判断

### formatType

string，日志格式类型，`log4js` | `json`，默认为`log4js`

### fileType

string，默认日志文件类型，`file` | `dateFile`，默认为`file`

### capture

object，http请求日志配置，会详细记录请求来源以及响应结果

- `enable`: 是否开启，默认为true
- `category`: 采用哪个category来保存请求日志，默认为`http`
- `level`: 日志记录级别，默认为auto，自动根据状态码输出到对应的日志

### category

object，日志类别，单日志模式下定义，默认为`undefined`

- `transports`：Array，日志传输类型
- `level`：日志记录级别

### categories

object，日志类别，在category未定义时生效。

默认设置为：

```javascript
categories: {
  default: {
    transports: [
      'default',
      'error'
    ]
  },
  app: {
    transports: [
      'app',
      'error'
    ]
  },
  http: {
    transports: [
      'http'
    ]
  }
}
```

- `key` **{string}** category名称
- `value` **{object}** category属性
- `value.transports` **{Array<string|Transport>}** 日志传输
- `value.level` **{string}** 日志级别

### defaultLevel

日志默认级别，有silly，debug，verbose，info，warn，error。默认情况下，开发环境为debug，生产环境为info。

### transports

object，日志传输设置

- `key`：string，传输类型名称
- `value`：object，日志参数
- `value.type`：类型，可以为`console`，`file`，`dateFile`

value设置可参考[Winston Transport](https://github.com/winstonjs/winston/blob/master/docs/transports.md#winston-core)，[dateFile](https://github.com/winstonjs/winston-daily-rotate-file#options)

## 使用

logger挂载在app实例上，可以直接通过app.logger直接访问。

在Base上，可以通过this.logger访问

app.logger 默认挂载了['silly', 'debug', 'verbose', 'info', 'warn', 'error']这些方法，他们会输出到default category上。

如果需要访问对应category，只需要在app.logger上调用相应的category。

示例如下：

```
// app
app.logger.error('error!!')
app.logger.user.info('find the user')

// controller
const { Controller } = require('salak')

class Log extends Controller {
  async actionLog () {
    this.logger.info('test')
    this.logger.user.info('user')
  }
}

module.exports = Log
```
