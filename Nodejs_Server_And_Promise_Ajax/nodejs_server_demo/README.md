# 应用说明
* 这个应用模拟了前端通过post请求和数据库的交互
* 体现了 <img> 发起请求的特性.
* 体现了 jsonp 的特性.

## 实现
* 使用 nodejs 服务器, 对请求路径做出不同的响应
* 使用了 'db.txt' 文件作为数据源.
* 使用 js 修改 HTML 页面的关键字 $tobereplaced$, 实现动态数据的显示.
* 在 nodejs 脚本中根据url的查询参数来响应JSONP

## 启动应用

`node server.js



