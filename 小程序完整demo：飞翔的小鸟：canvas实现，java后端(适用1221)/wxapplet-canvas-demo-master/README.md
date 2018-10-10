# 微信小程序demo

试验性质的一个微信小程序，用canvas做的一个类似flappy-bird的小游戏。

包含一些基本的功能：躲避障碍物、计分、排行榜等等。后端的工程也一并上传了，在[java目录](java/)中，很简单的一个SpringMVC工程。

游戏原型见[这里](http://www.w3schools.com/graphics/game_intro.asp)。

# 截图

![](screenshot.jpg)

# 使用说明

直接`git clone`下来，用[微信开发者工具](https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/download.html?t=20161122)导入即可。

导入的时候，最好填上appid，原因下方说明。

# 注意事项

1. 小程序目前还在公测状态，个人可以去[公众平台](https://mp.weixin.qq.com)上申请，但无法认证，最终的程序也无法发布。不过对于demo而言，有appid，能在手机上预览就可以了。
2. 如果不填写appid，小程序无法在手机上预览，只能在开发者工具里使用。
3. 小程序要求后端接口都是https的（必须事先在公众平台上配置好），对个人而言搞https证书实在太麻烦了。有两个办法绕过去：不填写appid，就不会有https的限制，但这样就不能在手机上预览；或者使用代理，将针对`https://xxx`的请求都代理到`http://localhost:8080`。我的做法是使用神器[Charles](https://www.charlesproxy.com/)的SSL Proxy和Map Remote功能，实现对https请求的代理。
4. 我尽量使用ES6的写法，但微信对ES6的支持还不太完善。
