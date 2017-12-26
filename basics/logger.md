# 日志

日志在web开发中是必不可少的一部分，对于应用运行状态、问题排查有着很重要的作用。

目前是基于log4js。

## 主要特性

- 日志分级
- 统一错误日志，错误日志会打印一份到默认的错误日志中
- 支持日志切割，可以按年、月、日切割

## 配置

### root

string，路径，日志文件存放目录

### injectConsole

Boolean，是否输出到stdout，默认根据是否为生产环境来判断

### capture

Object，http请求日志配置，会详细记录请求来源以及响应结果

- enable: 是否开启，默认为true,
- category: 采用哪个category来保存请求日志
- level: 日志记录级别

### categories

Object，格式如下：

```javascript
category: {
  type: 'dateFile',
  filename: 'xxx/xxx.log',
  pattern: '-yyyy-MM-dd.log',
  level: 'info'
}
```

- type: 基本上log4js支持的都支持，目前比较推荐使用的dateFile，可以使用日期切割。
- filename: 日志存放目录以及文件名
- pattern：dateFile下存在，用于切割日志
- level: 日志记录级别

type为logLevelFilter如下：

```javascript
errors: {
  type: 'logLevelFilter',
  appender: {
    type: 'dateFile',
    filename: 'errors/errors.log',
    pattern: '-yyyy-MM-dd.log'
  },
  level: 'error'
}
```

### defaultLevel

日志默认级别，有trace, debug, info, warn, error, fatal

### pm2

Boolean，解决log4js在pm2 cluster工作不正常，在pm2 cluster模式下需要设置为true。


## logger配置实例

```javascript
const path = require('path')

module.exports = {
  logger: {
    root = path.join('/tmp', 'logs'),
    injectConsole = true,
    capture = {
      enable: true,
      category: 'http',
      level: 'info'
    },
    categories = {
      default: {
        type: 'dateFile',
        filename: 'default/default.log',
        pattern: '-yyyy-MM-dd.log'
      },
      http: {
        type: 'dateFile',
        filename: 'access/access.log',
        pattern: '-yyyy-MM-dd.log'
      },
      user: {
        type: 'dateFile',
        filename: 'user/user.log',
        pattern: '-yyyy-MM.log',
        level: 'debug'
      },
      errors: {
        type: 'logLevelFilter',
        appender: {
          type: 'dateFile',
          filename: 'errors/errors.log',
          pattern: '-yyyy-MM-dd.log'
        },
        level: 'error'
      }
    },
    defaultLevel = 'info',
    pm2 = false
  }
}
```

## 使用

logger挂载在app实例上，可以直接通过app.logger直接访问。

在Context上，可以通过this.logger访问

app.logger 默认挂载了['trace', 'debug', 'info', 'warn', 'error', 'fatal']这些方法，他们会输出到default category上。

如果需要访问对应category，只需要在app.logger上调用相应的category。

示例如下：

```
app.logger.error('error!!')
app.logger.user.info('find the user')
```
