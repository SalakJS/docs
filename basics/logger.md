# 日志

日志在web开发中是必不可少的一部分，对于应用运行状态、问题排查有着很重要的作用。

目前是基于winston。

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
- level: 日志记录级别，默认为auto，自动根据状态码输出到对应的日志

### categories

Object，格式如下：

```javascript
category: {
  type: 'dateFile',
  filename: 'xxx/xxx.log',
  dataPattern: 'YYYY-MM-DD',
  level: 'info'
}
```

- type: dateFile，可以使用日期切割；levelFilter，根据日志级别存放
- filename: 日志存放目录以及文件名
- datePattern：dateFile下存在，用于切割日志
- level: 日志记录级别
- transport：同winston3，用于配置需要输出到远程日志服务器，配置了transport会忽略dateFile的配置

type为logLevelFilter如下：

```javascript
error: {
  type: 'levelFilter',
  filename: 'error/error.log',
  dataPattern: 'YYYY-MM-DD',
  level: 'error'
}
```

### defaultLevel

日志默认级别，有debug, info, warn, error

### autoCategory

Boolean，默认为true，自动创建目录，减少配置的麻烦，默认创建按日切割的目录，第一次创建存在一定的损耗，谨慎配置。

## logger配置实例

```javascript
const path = require('path')

module.exports = {
  logger: {
    root: path.join('/tmp', 'logs'),
    injectConsole: true,
    capture: {
      enable: true,
      category: 'http',
      level: 'auto'
    },
    categories: {
      default: {
        type: 'dateFile',
        filename: 'default/default.log',
        datePattern: 'YYYY-MM-DD'
      },
      http: {
        type: 'dateFile',
        filename: 'access/access.log',
        datePattern: 'YYYY-MM-DD'
      },
      user: {
        type: 'dateFile',
        filename: 'user/user.log',
        datePattern: 'YYYY-MM',
        level: 'error'
      },
      error: {
        type: 'levelFilter',
        filename: 'error/error.log',
        datePattern: 'YYYY-MM-DD'
        level: 'error'
      }
    },
    autoCategory: true,
    defaultLevel: 'info'
  }
}
```

## 使用

logger挂载在app实例上，可以直接通过app.logger直接访问。

在Context上，可以通过this.logger访问

app.logger 默认挂载了['debug', 'info', 'warn', 'error']这些方法，他们会输出到default category上。

如果需要访问对应category，只需要在app.logger上调用相应的category。

示例如下：

```
app.logger.error('error!!')
app.logger.user.info('find the user')
```
