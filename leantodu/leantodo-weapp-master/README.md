# LeanTodo × 微信小程序

使用 LeanCloud 存储 SDK 在微信小程序平台上实现的 LeanTodo 应用。通过这个 demo 你可以学到：

- 如何使用存储 SDK 对云端数据进行查询、增加、修改与删除
- 查询结果为一个列表时，如何将其绑定到视图层进行展示以及如何在点击事件中得到对应的数组项
- 如何自动登录 LeanCloud 用户系统
- 如何在登录后设置帐号与密码以供用户在其他平台的 LeanTodo 应用上登录
- 如何实现下拉刷新

### 本地运行与真机预览
目前小程序公测阶段暂时无法发布应用从而直接在微信上体验，但仍然可以获取源码通过微信开发者工具本地进行本地运行与真机预览：

1. 按照 [文档 - 准备工作](https://leancloud.cn/docs/weapp.html#准备工作) 的说明，完成准备工作。
2. 按照 [文档 - 一键登录](https://leancloud.cn/docs/weapp.html#一键登录) 的说明，在 LeanCloud 控制台配置小程序的 AppID 与 AppSecret。
3. clone 本项目代码，导入微信 web 开发者工具。
4. 打开 pages/todos/todos.js，将初始化 SDK 代码（`AV.init()`）中的 `appId` 与 `appKey` 替换为你的 LeanCloud 应用的 AppID 与 AppKey。

<img width="375" src="https://cloud.githubusercontent.com/assets/175227/20561252/b2fad728-b1b8-11e6-8d8e-a040bcac3e3c.png"> 
<img width="375" src="https://cloud.githubusercontent.com/assets/175227/20561251/b2cd82fa-b1b8-11e6-9783-afb868c9103e.png">
