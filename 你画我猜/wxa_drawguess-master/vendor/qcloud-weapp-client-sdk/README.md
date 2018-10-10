# 微信小程序客户端腾讯云增强 SDK

[![Build Status](https://travis-ci.org/tencentyun/weapp-client-sdk.svg?branch=master)](https://travis-ci.org/tencentyun/weapp-client-sdk)
[![Coverage Status](https://coveralls.io/repos/github/tencentyun/weapp-client-sdk/badge.svg?branch=master)](https://coveralls.io/github/tencentyun/weapp-client-sdk?branch=master)
[![License](http://img.shields.io/npm/l/qcloud-weapp-client-sdk.svg)](LICENSE)

本 SDK 是腾讯云[微信小程序一站式解决方案](https://github.com/tencentyun/weapp-solution)的组成部分，为小程序客户端开发提供 SDK 支持会话服务和信道服务。

## SDK 获取与安装

解决方案[客户端 Demo](https://github.com/tencentyun/weapp-client-demo/) 已经集成并使用最新版的 SDK，需要快速了解的可以从 Demo 开始。

如果需要单独开始，本 SDK 已经发布为 bower 模块，可以直接安装到小程序目录中。

```sh
npm install bower -g
bower install qcloud-weapp-client-sdk
```

安装之后，就可以使用 `require` 引用 SDK 模块：

```js
var qcloud = require('./bower_components/qcloud-weapp-client-sdk/index.js');
```

## 会话服务

[会话服务](https://github.com/tencentyun/weapp-solution/wiki/%E4%BC%9A%E8%AF%9D%E6%9C%8D%E5%8A%A1)让小程序拥有会话管理能力。

### 登录

登录可以在小程序和服务器之间建立会话，服务器由此可以获取到用户的标识和信息。

```js
var qcloud = require('./bower_components/qcloud-weapp-client-sdk/index.js');

// 设置登录地址
qcloud.setLoginUrl("https://199447.qcloud.la/login");
qcloud.login({
    success: function(userInfo) {
        console.log("登录成功", userInfo);
    },
    fail: function(err) {
        console.log("登录失败", err);
    }
});
```
本 SDK 需要配合云端 SDK 才能提供完整会话服务。通过 [setLoginUrl](#setLoginUrl) 设置登录地址，云服务器在该地址上使用云端 SDK 处理登录请求。

> `setLoginUrl` 方法设置登录地址之后会一直有效，因此你可以在微信小程序启动时设置。

登录成功后，可以获取到当前微信用户的基本信息。

### 请求

如果希望小程序的网络请求包含会话，登录之后使用 [request](#request) 方法进行网络请求即可。

```js
qcloud.request({
    url: 'http://199447.qcloud.la/user',
    success: function(response) {
        console.log(response);
    },
    fail: function(err) {
        console.log(err);
    }
});
```

如果调用 `request` 之前还没有登录，则请求不会带有会话。`request` 方法也支持 `login` 参数支持在请求之前自动登录。

```js
// 使用 login 参数之前，需要设置登录地址
qcloud.setLoginUrl('https://199447.qcloud.la/login');
qcloud.request({
    login: true,
    url: 'http://199447.qcloud.la/user',
    success: function(response) {
        console.log(response);
    },
    fail: function(err) {
        console.log(err);
    }
});
```

关于会话服务详细技术说明，请参考 [Wiki](https://github.com/tencentyun/weapp-solution/wiki/%E4%BC%9A%E8%AF%9D%E6%9C%8D%E5%8A%A1)。

## 信道服务

[信道服务](https://github.com/tencentyun/weapp-solution/wiki/%E4%BF%A1%E9%81%93%E6%9C%8D%E5%8A%A1)小程序支持利用腾讯云的信道资源使用 WebSocket 服务。

```js
// 创建信道，需要给定后台服务地址
var tunnel = this.tunnel = new qcloud.Tunnel('https://199447.qcloud.la/tunnel');

// 监听信道内置消息，包括 connect/close/reconnecting/reconnect/error
tunnel.on('connect', () => console.log('WebSocket 信道已连接'));
tunnel.on('close', () => console.log('WebSocket 信道已断开'));
tunnel.on('reconnecting', () => console.log('WebSocket 信道正在重连...'));
tunnel.on('reconnect', () => console.log('WebSocket 信道重连成功'));
tunnel.on('error', error => console.error('信道发生错误：', error));

// 监听自定义消息（服务器进行推送）
tunnel.on('speak', speak => console.log('收到 speak 消息：', speak));

// 打开信道
tunnel.open();
// 发送消息
tunnel.emit('speak', { word: "hello", who: { nickName: "techird" }});
// 关闭信道
tunnel.close();
```

信道服务同样需要业务服务器配合云端 SDK 支持，构造信道实例的时候需要提供业务服务器提供的信道服务地址。通过监听信道消息以及自定义消息来通过信道实现业务。

关于信道使用的更完整实例，建议参考客户端 Demo 中的[三木聊天室应用源码](https://github.com/tencentyun/weapp-client-demo/blob/master/pages/chat/chat.js)。

关于信道服务详细技术说明，请参考 [Wiki](https://github.com/tencentyun/weapp-solution/wiki/%E4%BF%A1%E9%81%93%E6%9C%8D%E5%8A%A1)。

## API


### setLoginUrl
设置会话服务登录地址。

#### 语法
```js
qcloud.setLoginUrl(loginUrl);
```

#### 参数
|参数         |类型           |说明
|-------------|---------------|--------------
|loginUrl     |string         |会话服务登录地址

### login
登录，建立微信小程序会话。

#### 语法
```js
qcloud.login(options);
```

#### 参数
|参数         |类型           |说明
|-------------|---------------|--------------
|options      |PlainObject    |会话服务登录地址
|options.success | () => void | 登录成功的回调
|options.error | (error) => void | 登录失败的回调


### request
进行带会话的请求。

#### 语法
```js
qcloud.request(options);
```

#### 参数
|参数         |类型           |说明
|-------------|---------------|--------------
|options      |PlainObject    | 会话服务登录地址
|options.login | bool         | 是否自动登录以获取会话，默认为 false
|options.url   | string       | 必填，要请求的地址
|options.header | PlainObject | 请求头设置，不允许设置 Referer
|options.method | string      | 请求的方法，默认为 GET
|options.success | (response) => void | 登录成功的回调。<ul><li>`response.statusCode`：请求返回的状态码</li><li>`response.data`：请求返回的数据</li></ul>
|options.error | (error) => void | 登录失败的回调
|options.complete | () => void | 登录完成后回调，无论成功还是失败

### Tunnel

表示一个信道。由于小程序的限制，同一时间只能有一个打开的信道。

#### constructor

##### 语法
```js
var tunnel = new Tunnel(tunnelUrl);
```

#### 参数
|参数         |类型           |说明
|-------------|---------------|--------------
|tunnelUrl    |String         | 会话服务登录地址


#### on
监听信道上的事件。信道上事件包括系统事件和服务器推送消息。

##### 语法
```js
tunnel.on(type, listener);
```

##### 参数
|参数         |类型           |说明
|-------------|---------------|--------------
|type         |string         | 监听的事件类型
|listener     |(message?: any) => void | 监听器，具体类型的事件发生时调用监听器。如果是消息，则会有消息内容。

##### 事件
|事件         |说明
|-------------|-------------------------------
|connect      |信道连接成功后回调
|close        |信道关闭后回调
|reconnecting |信道发生重连时回调
|reconnected  |信道重连成功后回调
|error        |信道发生错误后回调
|[message]    |信道服务器推送过来的消息类型，如果消息类型和上面内置的时间类型冲突，需要在监听的时候在消息类型前加 `@`
|\*           |监听所有事件和消息，监听器第一个参数接收到时间或消息类型 

#### open
打开信道，建立连接。由于小程序的限制，同一时间只能有一个打开的信道。

##### 语法
```js
tunnel.open();
```

#### emit
向信道推送消息。

##### 语法
```js
tunnel.emit(type, content);
```

##### 参数
|参数         |类型           |说明
|-------------|---------------|--------------
|type         |string         | 要推送的消息的类型
|content      |any            | 要推送的消息的内容

#### close
关闭信道

##### 语法
```js
tunnel.close();
```

## LICENSE

[MIT](LICENSE)
