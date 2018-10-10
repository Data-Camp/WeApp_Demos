# wxapp
> 最近跟小伙伴一起开发微信小程序, 发现在内容显示这块没法很好的解析。所以记录了下

## 查看效果
* 下载项目，在小程序工具新建项目选择开发文件夹。
* 注意：新建项目不使用appId, 在项目配置中勾选：开发环境不校验请求域名。 因为测试数据使用的是[rap](http://rap.taobao.org/)的模拟数据。

## 图片高宽适配
**小程序图片高宽没法自动适配，只能指定高宽进行裁剪。在详情页显示体验很差，用image组件的bindload解决**

## 富文本解析
**小程序没有提供富文本解析, 服务端可以转换为json(当然前端也可以有个js库解决[html2json](https://github.com/jxck/html2json.git))在小程序里面用对应的组件适配**
## 效果图
![demo](http://7xkcpo.com1.z0.glb.clouddn.com/QQ20161209-1@2x.png)
![demo](http://7xkcpo.com1.z0.glb.clouddn.com/QQ20161209-0@2x.png)