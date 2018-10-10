package internal

import (
	"github.com/garyburd/redigo/redis"
	"github.com/name5566/leaf/gate"
	"github.com/name5566/leaf/log"
	"reflect"
	"server/msg"
)

func init() {
	// 向当前模块（game 模块）注册 Hello 消息的消息处理函数 handleHello
	handler(&msg.Hello{}, handleHello)
	handler(&msg.UserInfo{}, handleUserInfo)
	handler(&msg.Online{}, handleOnline)
}

func handler(m interface{}, h interface{}) {
	skeleton.RegisterChanRPC(reflect.TypeOf(m), h)
}

func handleHello(args []interface{}) {
	// 收到的 Hello 消息
	m := args[0].(*msg.Hello)
	// 消息的发送者
	a := args[1].(gate.Agent)

	// 输出收到的消息的内容
	log.Debug("hello %v", m.Name)
	log.Debug("client %v", a)

	// 给发送者回应一个 Hello 消息
	//a.WriteMsg(&msg.Hello{
	//	Name: m.Name,
	//})
	for a := range agents {
		a.WriteMsg(m)
	}
}

func handleUserInfo(args []interface{}) {

	m := args[0].(*msg.UserInfo)
	// 消息的发送者
	a := args[1].(gate.Agent)

	// 输出收到的消息的内容
	log.Debug("cmd %v :%v", m.Cmd, m.UserId)
	if m.Cmd == "list" {
		c, err := redis.Dial("tcp", "127.0.0.1:6379")
		if err != nil {
			return
		}
		if _, err := c.Do("AUTH", "leon"); err != nil {
			c.Close()
			return
		}
		v, err := redis.Values(c.Do("LRANGE", "message:list", "0", "13"))
		if err != nil {
			return
		}
		defer c.Close()
		var data [15]string
		for i, values := range v {
			data[i] = string(values.([]byte))
		}
		log.Debug("message  list %T %v", data, data)
		// 给发送者回应一个 消息列表
		a.WriteMsg(&msg.List{
			MessageJson: data,
		})
	} else {
		c, err := redis.Dial("tcp", "127.0.0.1:6379")
		if err != nil {
			return
		}
		if _, err := c.Do("AUTH", "leon"); err != nil {
			c.Close()
			return
		}
		v, err := c.Do("LPUSH", "message:list", "{\"UserName\":\""+m.UserName+"\",\"Message\":\""+m.Message+"\"}")
		if err != nil {
			return
		}
		defer c.Close()
		log.Debug("redis message %v", v)
		for a := range agents {
			a.WriteMsg(m)
		}
	}
}

func handleOnline(args []interface{}) {
	// 收到的 Hello 消息
	a := args[1].(gate.Agent)

	a.WriteMsg(&msg.Online{
		Number: len(agents),
		Cmd: "online_response",
	})
}
