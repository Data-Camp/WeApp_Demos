# 微信小程序demo - 后端

一个很简单的SpringMVC工程，只是试验性质的，都没有用到DB，而用一个Map去模拟。

使用jetty作为容器，clone下来后执行`mvn jetty:run`即可启动。

# 接口说明

| 接口名  | 说明 |
| :---: | :---: |
| /flappy/send  | 游戏结束后，向服务端汇报用户名和对应的分数 |
| /flappy/getList  | 获取排行榜数据，按分数降序排列返回top20 |
