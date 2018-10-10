# 微信小程序客户端腾讯云增强 SDK

## 会话管理服务

微信的网络请求接口 `wx.request()` 没有携带 Cookies，这让传统基于 Cookies 实现的会话管理不再适用。为了让处理微信小程序的服务能够识别会话，腾讯云推出的微信小程序客户端增强 SDK 支持会话管理服务。配合云端 SDK 使用，可以轻松集成安全的会话管理能力。

### SDK 获取

本 SDK 已经发布为 bower 模块，可以直接安装到小程序目录中。

```sh
npm install bower -g
bower install qcloud-weapp-client-sdk
```

### SDK 使用

客户端 SDK 的使用比较简单，提供了一个和 `wx.request` 参数一样的方法，使用该方法发起的请求会和服务端的 SDK 配合获得登录态。

```js
var qcloud = require('./bower_components/qcloud-weapp-client-sdk/index.js');

qcloud.request({
    url: 'https://www.mydomain.com/myapi',
    success: function (data) {
        console.log(data);
    }
});
```

## SDK 实现

## 长连接服务