---
id: extend
title: 扩展
---

框架引入了扩展机制，方便进行扩展，支持扩展的类型为：app，context，base，controller，service，schedule，behavior。

## 如何编写扩展

项目的扩展默认存放在公共模块extend目录下。

以common模块为例，

- `common/extend/app.js` 扩展app对象
- `common/extend/context.js` 扩展ctx对象
- `common/extend/base.js` 扩展Base基类，Controller/Service/Schedule/Behavior 继承于 Base，也能获取相应的扩展
- `common/extend/behavior.js` 扩展Behavior
- `common/extend/service.js` 扩展Service
- `common/extend/schedule.js` 扩展Schedule

### 扩展编写

比如，需要给Controller提供一个this.isAjax()的方法来快速判断是否为ajax请求，可以通过以下方式来实现：

```javascript
// common/extend/controller.js
module.exports = {
  isAjax () {
    return this.header['x-requested-with'] === 'XMLHttpRequest'
  }
}
```

这样在controller中就可以方便地使用 `this.isAjax()` 来判断是否为ajax请求了。

### 扩展里使用app对象

如果需要在扩展中使用app对象，那么可以导出一个函数，函数的参数即为app，如下：

```javascript
// common/extend/base.js
module.exports = (app) => {
  return {
  }
}
```
