# 定时任务

在我们的应用中，存在某些场景需要执行定时任务，比如：

1. 上报应用状态
2. 更新缓存
3. 日志文件清理

框架提供了一套机制可以更加优雅地编写和维护定时任务。

Schedule, 继承自[Context](./context.html)，用于在定时任务中可以访问到其他的service。

## 编写定时任务

所有定时任务放在每个模块的schedule目录下，如common/schedule, frontend/schedule，每个文件为单独的一个定时任务，可以配置相应的属性和运行逻辑。

以更新缓存为例，存放在common/schedule/updateCache.js

```javascript
const { Schedule } = require('salak')

class UpdateCache extends Schedule {
  static timer () {
    return {
      type: 'all',
      interval: '10s'
    }
  }

  async run () {
    const news = await this.service('cache').findAllNews()

    this.app.newsCache = news
  }
}

module.exports = UpdateCache
```

在静态方法timer中定义具体的属性，在run中编写具体的业务逻辑

## 定时方式

可以配置interval 或者 cron，只能选其一，都配置的情况下，会执行interval

### interval

通过配置interval参数，定时任务将会每隔一段时间执行一次

- 数字类型，单位为毫秒，如1000，即1s
- 字符串，通过ms转换，如'10s'，'2m'

### cron

定时任务将在特定的时间执行定时任务，cron表达式采用[cron-parser](https://github.com/harrisiirak/cron-parser)解析

```bash
*    *    *    *    *    *
┬    ┬    ┬    ┬    ┬    ┬
│    │    │    │    │    |
│    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
│    │    │    │    └───── month (1 - 12)
│    │    │    └────────── day of month (1 - 31)
│    │    └─────────────── hour (0 - 23)
│    └──────────────────── minute (0 - 59)
└───────────────────────── second (0 - 59, optional)
```

如：

```javascript
static timer () {
  return {
    cron: '*/10 * * * * *' // 表示秒数为10的倍数执行一次
  }
}
```

## 类型type

框架提供了三种类型，all, single, worker，默认为all

- all: 表示所有线程都会运行
- single: 表示在多机多线程情况下，只有唯一一台机器上的一个进程会运行，需要锁
- worker：表示每个机器只有唯一一个线程会运行，需要锁

其他参数:

- immediate: 为true时，定时任务会在app ready后立即执行一次
- cronOptions: 配合cron使用，参考[cron-parser](https://github.com/harrisiirak/cron-parser#options)
- enable: 默认为true，设置为false时，该定时任务不执行

```javascript
static timer () {
  return {
    type: 'worker',
    cron: '* * */2 * * *',
    immediate: true
  }
}
```

## 全局配置

只能在公共模块中设置定时任务配置，commmon/config/default.js

```javascript
module.exports = {
  schedule: {
  }
}
```

参数列表：

- enable: 表示定时任务是否需要开启，默认为true
- prefix: 用于锁，key前缀，默认为salakTimer
- Store: timer type 为 worker或single才需要，编写Store可参考[salak-schedule-store](https://github.com/SalakJS/salak-schedule#write-a-store)，默认为redLock，需要提供app.redis，引入[salak-redis](https://github.com/SalakJS/salak-redis)即可
- options: Store实例需要的参数

## API

### app.getSchedules()

获取当前所有的定时任务

### app.runSchedule(key)

- key: `${module}.${taskfilename}`

运行指定的定时任务

### app.closeSchedules()

关闭所有定时任务
