# CURL

基于superagent内置了一个CURL，应用可以快捷地发起http请求。

## 通过app使用

```javascript
app.beforeStart(async () => {
  const result = await app.curl('https://www.jd.com')

  console.log(result)
})
```

## 通过Context使用

```javascript
class Test extends Service {
  await getVersion () {
    const result = await this.curl('http://xxx.xxx', {
      dataType: 'json'
    })

    return result.data && result.data.version
  }
}
```

## API详解

curl (url, options)

- url: 请求的URL路径
- options: 参数
- options.method: 请求方式，默认为GET
- options.timeout: 超时时间，单位为ms，默认为0
- options.retry: 重试次数，默认为0，表示不重试
- options.redirects: 跳转次数，如遇到302会自动跳转，默认不设置，表示自动跳转不限制
- options.contentType: 可设置为json,form，一般用于POST、PUT请求
- options.dataType: 可设置为json，会将输出的字符串进行处理，如果格式化出错，将会把错误写入到err中
- options.headers
- options.body
- options.query

输出结果：

result: 

- status: 状态码
- data: 输出数据
- headers: 输出的响应头
- err: 错误信息，无错误为空

### 全局默认参数设置：

根模块配置文件添加httpClient字段，如：

```javascript
module.exports = {
  httpClient: {
    timeout: 100, // 100ms
    retry: 2,
    redirects: 0,
    dataType: 'json',
    contentType: 'json',
    headers: { 'User-Agent': 'curl' }
  }
}
```
