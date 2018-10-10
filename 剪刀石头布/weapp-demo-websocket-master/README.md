微信小程序示例 - 剪刀石头布
=====================

> 没事打开小程序，和附近的人剪刀石头布，想来就来，想走就走。谁能成为武林高手？！

微信小程序提供了一套在微信上运行小程序的解决方案，有比较完整的框架、组件以及 API，在这个平台上面的想象空间很大。

腾讯云拿到了小程序内测资格，研究了一番之后，发现微信支持 WebSocket 还是很值得玩味的。这个特性意味着我们可以做一些实时同步或者协作的小程序。

这篇文章分享一个简单的剪刀石头布的小游戏的制作，希望能对想要在小程序中使用 WebSocket 的开发者有帮助。

![运行截图](screenshot.gif)

整个游戏非常简单，连接到服务器后自动匹配在线玩家（没有则分配一个机器人），然后两人进行剪刀石头布的对抗游戏。当对方进行拳头选择的时候，头像会旋转，这个过程使用 WebSocket 会变得简单快速。

## 部署和运行

拿到了本小程序源码的朋友可以尝试自己运行起来。

### 整体架构

![整体架构](http://easyimage-10028115.file.myqcloud.com/internal/xqscn2zj.he3.jpg)

小程序的架构非常简单，这里有两条网络同步，一条是 HTTPS 通路，用于常规请求。对于 WebSocket 请求，会先走 HTTPS 后再切换协议到 WebSocket 的 TCP 连接，从而实现全双工通信。 

### 1. 准备域名和证书

在微信小程序中，所有的网路请求受到严格限制，不满足条件的域名和协议无法请求，具体包括：

* 只允许和在 MP 中配置好的域名进行通信，如果还没有域名，需要注册一个。
* 网络请求必须走 HTTPS 协议，所以你还需要为你的域名申请一个 SSL 证书。

> 腾讯云提供[域名注册](https://www.qcloud.com/product/dm.html)和[证书申请](https://console.qcloud.com/ssl)服务，还没有域名或者证书的可以去使用

域名注册好之后，可以登录[微信公众平台](https://mp.weixin.qq.com)配置通信域名了。

![配置通信域名](http://easyimage-10028115.file.myqcloud.com/internal/tjzpgjrz.y5a.jpg)

### 2. Nginx 和 Node 代码部署

本示例长连接服务要运行，需要进行以下几步：

* 部署 Nginx，Nginx 的安装和部署请大家自行搜索（注意需要把 SSL 模块也编译进去）
* 配置 Nginx 反向代理到 `http://127.0.0.1:9595` 
* Node 运行环境，可以安装 [Node V6.6.0](https://nodejs.org/)
* 部署 `server` 目录的代码到服务器上，如 `/data/release/qcloud-applet-websocket`
* 使用 `npm install` 安装依赖模块
* 使用 `npm install pm2 -g` 安装 pm2

> 上述环境配置比较麻烦，剪刀石头布的服务器运行代码和配置已经打包成[腾讯云 CVM 镜像](https://buy.qcloud.com/cvm?marketImgId=371)，推荐大家直接使用。
> * 镜像部署完成之后，云主机上就有运行 WebSocket 服务的基本环境、代码和配置了。
> * 腾讯云用户可以[免费领取礼包](https://www.qcloud.com/act/event/yingyonghao.html#section-voucher)，体验腾讯云小程序解决方案。
> * 镜像已包含「剪刀石头布」和「小相册」两个小程序的服务器环境与代码，需要体验两个小程序的朋友无需重复部署

### 3. 配置 HTTPS

在 `/etc/nginx/conf.d` 下修改配置中的域名、证书、私钥。

![证书 Nginx 配置](http://easyimage-10028115.file.myqcloud.com/internal/agfty0fn.gfi.jpg)

配置完成后，即可启动 nginx。

```sh
nginx
```

### 4. 域名解析

我们还需要添加域名记录解析到我们的云服务器上，这样才可以使用域名进行 HTTPS 服务。

在腾讯云注册的域名，可以直接使用[云解析控制台](https://console.qcloud.com/cns/domains)来添加主机记录，直接选择上面购买的 CVM。

![添加域名解析](http://easyimage-10028115.file.myqcloud.com/internal/uw25hdj2.k1u.jpg)

解析生效后，我们在浏览器使用域名就可以进行 HTTPS 访问。

![HTTPS 访问效果图](http://easyimage-10028115.file.myqcloud.com/internal/bxfkmjea.g41.jpg)

### 5. 启动 WebSocket 服务

在镜像的 nginx 配置中（`/etc/nginx/conf.d`），已经把 `/applet/websocket` 的请求转发到 `http://127.0.0.1:9595` 处理。我们需要把 Node 实现的 WebSocket 服务在这个端口里运行起来。

进入镜像中源码位置：

```bash
cd /data/release/qcloud-applet-websocket
```

使用 `pm2` 启动服务：

```bash
pm2 start process.json
```

![启动效果](http://easyimage-10028115.file.myqcloud.com/internal/1fdg1alb.1gq.jpg)

> 如果不是使用腾讯云的镜像，还需要把源码编译成 js
> * 使用 `npm install typescript -g` 安装 [TypeScript](http://www.typescriptlang.org/)
> * 在源码目录使用 `tsc` 进行编译

### 6. 启动微信小程序

在微信开发者工具中修改小程序源码中的 `config.js` 配置，把通讯域名修改成上面申请的域名。完成后点击调试即可连接到 WebSocket 服务进行游戏。

![修改通信域名](http://easyimage-10028115.file.myqcloud.com/internal/pmbcwr2k.mj0.jpg)

配置完成后，运行小程序就可以看到成功搭建的提示！

![成功搭建微信小程序](http://easyimage-10028115.file.myqcloud.com/internal/sslzo4ip.xvh.jpg)

## 为什么要用 WebSocket

使用传统的 HTTP 轮询或者长连接的方式也可以实现类似服务器推送的效果，但是这类方式都存在资源消耗过大或推送延迟等问题。而 WebSocket 直接使用 TCP 连接保持全双工的传输，可以有效地减少连接的建立，实现真正的服务器通信，对于有低延迟有要求的应用是一个很好的选择。

目前浏览器对 WebSocket 的支持程度已经很好，加上微信小程序的平台支持，这种可以极大提高客户端体验的通信方式将会变得更加主流。 
 
Server 端需要实现 WebSocket 协议，才能支持微信小程序的 WebSocket 请求。鉴于 [SocketIO](http://socket.io/) 被广泛使用，剪刀石头布的小程序，我们选用了比较著名的 [SocketIO](http://socket.io/) 作为服务端的实现。

Socket IO 的使用比较简单，仅需几行代码就可启动服务。

```js
export class Server {

    init(path: string) {
        /** Port that server listen on */
        this.port = process.env.PORT;

        /** HTTP Server instance for both express and socket io */
        this.http = http.createServer();

        /** Socket io instance */
        this.io = SocketIO(this.http, { path });

        /** Handle incomming connection */
        this.io.on("connection", socket => {
            // handle connection
        });
    }

    start() {
        this.http.listen(this.port);
        console.log(`---- server started. listen : ${this.port} ----`);
    }
}

const server = new Server();
server.init("/applet/ws/socket.io");
server.start();
```

但是，SocketIO 和一些其它的服务器端实现，都有其配套的客户端来完成上层协议的编码解码。但是由于微信的限制（不能使用 window 等对象）， SocketIO 的客户端代码在微信小程序平台上是无法运行的。

经过对 SocketIO 通信进行抓包以及研究其客户端源码，笔者封装了一个大约 100 行适用于微信小程序平台的 `WxSocketIO` 类，可以帮助开发者快速使用 SocketIO 来进行 WebSocket 通信。

```js
const socket = new WxSocketIO();
socket.on('hi', packet => console.log('server say hi: ' + packet.message));
socket.emit('hello', { from: 'techird' });
```

如果想要使用微信原生的 API，那么在服务器端也可以直接使用 [ws](https://github.com/websockets/ws) 来实现 W3C 标准的接口。不过 SocketIO 支持多进程的特性，对于后续做横向扩张是很有帮助的。腾讯云在后面也会有计划推出支持大规模业务需求的 WebSocket 连接服务，减小业务的部署成本。

## 通信协议设计

实现一个多客户端交互的服务，是需要把中间涉及到所有的消息类型都设计清楚的，就像是类似剪刀石头布这样一个小程序，都有下面这些消息类型。

消息      | 方向        | 说明 
----------|-------------|--------
`hello`   | c => s      | 客户端连上后发送 hello 信息，告知服务器自己身份以及位置。
`hi`      | s => c      | 服务器响应客户端打招呼，并且反馈附近有多少人
`join`    | c => s      | 客户端请求加入一个房间进行游戏
`leave`   | c => s      | 客户端请求退出房间
`start`   | s => c      | 房间里面全部人都 ready 后，会发送游戏开始的信号，并且告知客户端游戏时间。
`choice`  | c => s      | 客户端选择出剪刀、石头还是布
`face`    | c => s      | 客户端更新自己的表情
`movement`| s => c      | 有用户更新选择或者更新表情会通知其它用户
`result`  | s => c      | 超过选择时间后，游戏结束，广播游戏结果

具体每个消息的参数可以参考 [server/protocol.brief.md](./server/protocol.brief.md)

## 服务器逻辑

服务器的逻辑很简单：

* 收到用户请求加入房间（`join`），就寻找还没满的房间
    * 找到房间，则加入
    * 没找到房间，创建新房间
* 有用户加入的房间检查是否已满，如果已满，则：
    * 给房间里每个用户发送开始游戏的信号（`start`）
    * 启动计时器，计时器结束后进行游戏结算
* 游戏结算
    * 两两之间 PK，赢方分数加一，输方减一，最终得每个玩家基本得分 x
    * 对于每个玩家，如果分数 x 大于 0，则视为胜利，连胜次数加一，否则连胜次数归零
    * 本局得分为分数 x 乘以连胜次数
* 发送本局游戏结果给房间里的每位玩家

## 微信端实现

微信小程序直接使用上面的协议，针对不同的场景进行渲染。整体的状态机如下。

![状态机](http://easyimage-10028115.file.myqcloud.com/internal/rnjaef4n.pnp.jpg)

状态机整理清楚后，就是根据状态机来控制什么时候发送消息，接到消息后如何处理的问题了。具体实现请参照 `app/pages/game/game.js` 里的源码。

## LICENSE

[MIT](LICENSE)
