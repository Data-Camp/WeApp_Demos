wechat-Development

# 微信小应用-小程序-demo-仿芒果TV (持续更新)

由于时间的关系，没有办法写一个完整的说明，重点是页面展示效果，还有其中遇到的一些坑分享一下，后期不定期更新坑和DEMO

* 官方文档：https://mp.weixin.qq.com/debug/wxadoc/dev/

* 基础的一些就不多说了，主要是DEMO，风格是模仿芒果TV的风格和几个展示公开接口，对应的最新视频并不能观看(请自行下载芒果tv App观看)。

* 纯粹是对微信小程序的尝新以及大家分享研究，并无其他用途。

##今日更新微信开发工具遇到问题(11/25)
* 修复Promise报错
	* 问题原因：TypeError: Cannot read property 'Promise' of undefined
	* 解决方案：微信开发工具更新后不支持Promise对象，需要引入第三方库来支持Promise

##今日更新微信开发工具遇到问题(10/28)

* Failed to load resource: net::ERR_NAME_NOT_RESOLVED http://4587851578.appservice.open.weixin.qq.com/appservice
	* 问题原因：通常是由于系统设置了代理如Shadowsocks等。
	* 解决方案：关闭代理，或者依次点击工具栏“动作”-"设置"，选择“不使用任何代理，勾选后直连网络”。

* 修复asdebug.js报错
	* 问题原因：TypeError: Cannot read property 'MaxRequestConcurrent' of undefined
	* 解决方案：替换 /Resources/app.nw/app/dist/weapp/appservice/asdebug.js

* 开发工具报错需要wx:key
	* 问题原因：TypeError: Cannot read property 'MaxRequestConcurrent' of undefined
	* 解决方案：渲染数据的时候增加属性wx:key,一般跟着wx:fo属性后面,两个方法,[官方文档有公示](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/view/wxml/list.html?t=1477656501986)
		* wx:key="*this" (上次Bug因为用了this，之后入坑了，
		key设置this的状态应该是场景数据交互只需要请求一次的情况，一般我们常用是下面的property)
		* wx:key="property" 循环的item里面其中一个属性名字(需要属性名字的值是唯一性，不然会引起一些不会响应的错误！！！)

* 公测了,有认证号的可以再微信后台服务器设置那边设置请求接口，获取ID，在手机体验一下
	* 可以再手机做静态页面展示 或者拉取数据本地化 弄一个appleID 就可以展示了
	

## DEMO (前方gif图高能预警，需等待，等待！！)

![](https://github.com/web-Marker/wechat-Development/raw/master/image/3.gif) 

![](https://github.com/web-Marker/wechat-Development/raw/master/image/4.gif) 

![](https://github.com/web-Marker/wechat-Development/raw/master/image/5.gif)

## 有问题加我微信

![](https://github.com/web-Marker/wechat-Development/blob/master/image/code.png)

## 遇到坑(虽然之前有人说过，还是重新一下)

* 好像没有自定义组件的机制~~
* 没有热更新
* 修改代码即时同步问题
* 一些组件样式不能扩展（这个可能以后公测的时候会放出来）



