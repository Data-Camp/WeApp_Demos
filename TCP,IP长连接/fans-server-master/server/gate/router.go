package gate

import (
    "server/game"
    "server/msg"
)

func init() {
    // 这里指定消息 Hello 路由到 game 模块
    // 模块间使用 ChanRPC 通讯，消息路由也不例外
    msg.Processor.SetRouter(&msg.Hello{}, game.ChanRPC)
    msg.Processor.SetRouter(&msg.UserInfo{}, game.ChanRPC)
    msg.Processor.SetRouter(&msg.Online{}, game.ChanRPC)
}
