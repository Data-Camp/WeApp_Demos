

协议设计

## `hello`: client -> server

客户端连上后发送 hello 信息，告知服务器自己身份以及位置。

```json
{
    user: { uid, uname, uavatar },
    cordinate: { lat, lng }
}
```

## `hi`: server -> client

服务器响应客户端打招呼，并且反馈附近有多少人

```json
{
    message: "welcome",
    nearby: 10
}
```

## `join`: client -> server

客户端请求加入一个房间进行游戏。无需任何参数。

## `leave`: client -> server

客户端请求退出房间。无需任何参数。

## `room`: server -> client

服务器收到加入房间请求后分配一个房间，告知房间里面都有哪些用户。当房间内部用户发生变更的时候（加入或退出），也会收到此消息。

```json
{
    roomId: "afkxeie5x",
    users: [{ uid, uname, uavatar, ready }],
    full: true
}
```

## `start`: server -> client

房间里面全部人都 ready 后，会发送游戏开始的信号。无需任何参数。

## `choice`: client -> server

客户端选择出剪刀、石头还是布。

```json
{
    choice: 1 // 剪刀 1，石头 2， 布 3
}
```

## `face`: client -> server

客户端更新自己的表情

```json
{
    face: 1 // 大笑 1，大哭 1，生气 1，坏笑 1
}
```

## `movement`: server -> client

有用户更新选择或者更新表情会通知其它用户。

```json
{
    movement: "choice" | "face",
    face: 1
}
```

## `result`: server -> client

超过选择时间后，游戏结束，广播游戏结果

```json
{
    result: [
        { uid, score, totalScore }
    ]
}
```