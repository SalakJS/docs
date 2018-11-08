---
id: service
title: Service
---

一般来说，Service用来封装业务逻辑，主要有以下几点好处：

- 保持Controller中逻辑简洁
- 保证业务逻辑独立性，抽离出来的Service能够被多个地方复用
- 代码解耦，提高代码可维护性

## 使用场景

- 第三方服务调用，比如发邮件、发送提醒之类的
- 数据处理，比如从数据库获取数据之后，再进行一些处理

## 定义Service

```javascript
// application/service/post.js
const { Service } = require('salak')

class Post extends Service {
  async findPost (id) {
    const post = await this.model('post').findById(id) // 这里的this.model可以使用salak-mongo插件来注入

    return post
  }
}

module.exports = Post
```

### 注意

- Service文件必须存放在模块的service目录中
- Service必须为Class，并且需要继承salak.Service
- 一个Service文件只能存在一个Service类

## 调用Service

框架提供了2种方式调用service，可通过app实例来调，也可在Controller/Service中调this.service

- app.service(name, module = this.root)
- Base.prototype.service(name, module = this.module)

## 使用Service

以下代码展示了如何使用Service。

```javascript
// application/service/post.js
const { Service } = require('salak')

class Post extends Service {
  async createPost () {
    return {
      title: 'Post'
    }
  }
}

module.exports = Post

// application/controller/post.js
const { Controller } = require('salak')

class Post extends Controller {
  async actionCreate () {
    const post = await this.service('post').createPost()

    return post
  }
}

module.exports = Post
```
