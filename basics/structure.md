# 目录结构

在【[快速入门](../intro)】章节中，对salak有了初步的了解，接下来看下基本的目录规范。

在salak中，有两种模式，单模块模式、多模块模式，通过配置文件来指定。

首先来看下多模块模式，目录如下：

```
├── common
│   ├── config
│   │   └── default.js
│   ├── middleware (可选)
│   ├── helper (可选)
│   ├── service (可选)
│   └── view (可选)
├── ${module}
│   ├── config
│   │   └── default.js
│   ├── controller
│   ├── middleware (可选)
│   ├── view (可选)
│   └── service (可选)
├── index.js
├── bin
│   └── www
├── package.json
├── test
├── logs
└── public (可选)
```

由框架约定的目录:

- public: 静态资源目录
- bin/www: 可执行文件
- logs: 应用日志存放目录
- comon: 通用目录，存放公共的文件
- common/config/${env}.js: 用于编写配置文件
- common/middleware: 用于存放中间件
- common/helper/index.js: 工具类，仅可以出现在公共模块
- common/view: 用于公共的视图
- common/service: 用于存放公共的业务逻辑
- ${module}: 功能模块
- ${module}/config/${env}.js: 用于存放功能模块的配置
- ${module}/controller: 控制器，用于处理用户请求
- ${module}/middleware: 模块中间件
- ${module}/view: 模块视图
- ${module}/service: 模块业务逻辑

再来看下单模块模式，与多模块不同的是，通用模块与功能模块为同一模块, 目录如下：

```
├── application 
│   ├── config
│   │   └── default.js
│   ├── controller
│   ├── middleware (可选)
│   ├── helper (可选)
│   ├── view (可选)
│   └── service (可选)
├── bin
│   └── www
├── index.js
├── package.json
├── test
└── public (可选)
```

由框架约定的目录:

- public: 静态资源目录
- application: 应用模块目录
- application/config/${env}.js: 用于存放配置文件
- application/controller: 控制器，用于处理用户请求
- application/middleware: 中间件
- application/helper/index.js: 工具类
- application/view: 视图存放目录
- application/service: 模块业务逻辑

具体使用，在接下来的章节会进一步讲解。
