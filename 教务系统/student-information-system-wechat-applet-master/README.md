# 教务系统 微信小程序 

## 说明

正方教务系统的（微信）小程序，~~成绩数据爬虫~~

**准备用服务端做数据抓取，客户端仅作数据显示**

~~请见下方局限~~

**此项目使用 Applet 名称仅为借古讽今只之用**

## 演示

1. 从 GitHub 克隆项目

2. 启动微信 Web 开发着工具，添加项目

3. 选择无 AppID ，填写任意名称，找到项目目录添加

4. 点击“查询”

![教务系统 微信小程序](https://raw.githubusercontent.com/zh-h/student-information-system-wechat-applet/master/image/1.png)

![教务系统 微信小程序](https://raw.githubusercontent.com/zh-h/student-information-system-wechat-applet/master/image/2.png)


## ~~局限~~ ##

**由于 Javascript 跨域限制暂时无法直接通过小程序去抓取目标网站的 Cookie**

xhr
```
Date: Fri, 30 Sep 2016 12:46:33 GMT
Server: Microsoft-IIS/6.0
X-AspNet-Version: 1.1.4322
X-Powered-By: ASP.NET
MicrosoftOfficeWebServer: 5.0_Pub
Content-Type: image/Gif; charset=gb2312
Access-Control-Allow-Origin: *
Cache-Control: private
Access-Control-Allow-Headers: X-Requested-With, Content-Type
Content-Length: 2245

```
chrome
```
HTTP/1.1 200 OK
Date: Fri, 30 Sep 2016 12:46:33 GMT
Server: Microsoft-IIS/6.0
MicrosoftOfficeWebServer: 5.0_Pub
X-Powered-By: ASP.NET
X-AspNet-Version: 1.1.4322
Set-Cookie: ASP.NET_SessionId=hw4tpo55f4005ojii14d2e3r; path=/
Cache-Control: private
Content-Type: image/Gif; charset=gb2312
Content-Length: 2245
```

**小程序暂时使用直接 GET 获取到的 HTML 内容进行解析然后填充视图作为演示**

```
var achievementUrl = isDebug ? mockUrl + 'achievements.html' : sisUrl + '/xscj.aspx?xh='
```

**如果能够避免跨域访问的限制，小程序可以不依赖服务端完成抓取的任务**

```
// XMLHttpRequest 完备
var test = function (url, callback) {
  var xhr = new XMLHttpRequest()
  xhr.responseType = 'blob'
  xhr.onload = function () {
    var reader = new FileReader()
    var headers = xhr.getAllResponseHeaders()
    reader.onloadend = function () {
      callback(reader.result, headers)
    }
    reader.readAsDataURL(xhr.response)
  }
  xhr.open('GET', url)
  xhr.send()
}
```