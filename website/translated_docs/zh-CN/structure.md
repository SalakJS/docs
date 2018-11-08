---
id: structure
title: Structure
---

在 [快速入门](./quick.html) 章节中，对salak有了初步的了解，接下来看下基本的目录规范。

在salak中，有两种模式，单模块模式、多模块模式。

## 多模块模式

多模块模式，需要通过配置文件来指定。

```javascript
// common/config/default.js:
module.exports = {
  bootstraps: [
    `${module}`
  ]
}
```

默认目录如下：

```
├── src
│   ├── common
│   │   ├── config
│   │   │   └── default.js
│   │   ├── extend (可选)
│   │   ├── helper (可选)
│   │   ├── middleware (可选)
│   │   ├── service (可选)
│   │   └── behavior (可选)
│   └── ${module}
│       ├── config
│       │   └── default.js
│       ├── controller
│       ├── extend (可选)
│       ├── middleware (可选)
│       ├── service (可选)
│       └── behavior (可选)
├── bin
│   └── www
├── index.js
├── logs
├── package.json
├── public (可选)
├── runtime
└── test
```

由框架约定的目录:

- `public`: 静态资源目录
- `bin/www`: 可执行文件
- `logs`: 应用日志存放目录
- `test`: 应用单元测试存放目录
- `runtime`: 应用执行过程中临时文件
- `src/comon`: 通用目录，存放公共的文件
- `src/common/config/${env}.js`: 用于编写配置文件
- `src/common/middleware`: 用于存放中间件
- `src/common/extend`: 用于存放框架基础类库扩展
- `src/common/helper`: 工具类目录，仅可以出现在公共模块
- `src/common/service`: 用于存放公共的业务逻辑
- `src/common/behavior`: 用于存放公共校验规则
- `src/${module}`: 功能模块
- `src/${module}/config/${env}.js`: 用于存放功能模块的配置
- `src/${module}/controller`: 控制器，用于处理用户请求
- `src/${module}/middleware`: 模块中间件
- `src/${module}/service`: 模块业务逻辑
- `src/${module}/behavior`: 模块校验规则

## 单模块模式

单模块模式，与多模块不同的是，通用模块与功能模块为同一模块, 目录如下：

```
├── application 
│   ├── config
│   │   └── default.js
│   ├── controller
│   ├── middleware (可选)
│   ├── helper (可选)
│   ├── extend (可选)
│   ├── behavior (可选)
│   └── service (可选)
├── bin
│   └── www
├── index.js
├── package.json
├── test
├── runtime
├── logs
└── public (可选)
```

由框架约定的目录:

- `public`: 静态资源目录
- `logs`: 应用日志存放目录
- `test`: 应用单元测试存放目录
- `runtime`: 应用执行过程中临时文件
- `application`: 应用模块目录
- `application/config/${env}.js`: 用于存放配置文件
- `application/controller`: 控制器，用于处理用户请求
- `application/middleware`: 中间件
- `application/extend`: 框架基础类库扩展
- `application/helper`: 工具类
- `application/view`: 视图存放目录
- `application/service`: 模块业务逻辑
- `application/behavior`: 模块校验规则

具体使用，在接下来的章节会进一步讲解。
