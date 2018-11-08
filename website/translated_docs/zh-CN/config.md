---
id: config
title: 配置
---

框架提供了强大且可扩展的配置功能，会自动合并功能模块、通用模块以及框架的配置，按顺序覆盖，且可以根据环境维护不同的配置。

配置文件存放在各自模块的config目录中。

## 多环境配置

框架支持根据环境来加载配置，定义多个环境的文件，如下：

```bash
config
├── .local.js
├── default.js
├── production.js
├── development.js
└── test.js
```

.local.js 一般用于存放本地开发相关的配置，如密码，需要在.gitignore添加该文件，防止被上传

## 配置写法

配置文件返回object，可以覆盖框架默认的配置，也可以定义自己的配置。

```javascript
const path = require('path')

module.exports = {
  port: 8080
}
```

配置也可以返回一个function，参数为app，如：

```javascript
module.exports = (app) => {
  const config = {}

  return config
}
```

配置也支持yaml来编写，如default.yml：

```yaml
port: 8080
```

## 配置加载顺序

以development环境为例：

```bash
-> 公共模块默认配置 default.js
-> 公共模块环境配置 development.js
-> 公共模块本地配置 .local.js
-> 功能模块默认配置 default.js
-> 功能模块环境配置 development.js
-> 功能模块本地配置 .local.js
```

## 配置使用规则

后面的配置会覆盖前面的配置，在当前模块使用的配置，将是模块配置与通用配置合并后的配置。

## 配置结果

框架启动后会将合并后的配置结果默认存放在runtime/config/${module}.json
