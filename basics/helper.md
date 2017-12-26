# Helper

Helper 用来提供一些实用的工具类函数，避免一些通用的逻辑分散到各处。

存放在公共模块/helper/index.js文件中，返回一个对象

## 定义Helper

```javascript
const helper = {}

// 自动补全0
helper.zeroPadding = (num) => {
  if (num < 10) {
    return `0${num}`
  }

  return num
}

module.exports = helper
```

## 使用Helper

helper默认会被挂在在app.helper上，在Context上提供了便捷方式可以访问到，如：

```javascript
this.helper.zeroPadding(9)
```
