package msg

import (
    "github.com/name5566/leaf/network/json"
)

// 使用默认的 JSON 消息处理器（默认还提供了 protobuf 消息处理器）
var Processor = json.NewProcessor()

func init() {
    // 这里我们注册了一个 JSON 消息 Hello
    Processor.Register(&Hello{})
    Processor.Register(&UserInfo{})
    Processor.Register(&List{})
    Processor.Register(&Online{})
}

// 一个结构体定义了一个 JSON 消息的格式
// 消息名为 Hello
type Hello struct {
    Name string
}

type UserInfo struct {
   Cmd string
   UserId int
   UserName string
   Message string
}

type List struct {
    MessageJson [15]string
}

type Online struct {
	Cmd string
	Number int
}



