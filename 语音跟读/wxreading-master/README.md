# wxreading
>[小程序跟读]

##项目介绍
    本项目是基于<微信小程序>做的一套语音跟读，
    分为【用户/登陆系统、查看教材、查看课程安排、参与跟读(录音/上传/合成)、结果展示】等功能
##开发/调试环境
    微信版本：6.3.30
    IOS版本：IOS_10.0.2
    微信开发调试工具：v0.10.102800
    操作系统：Win7
    开发/调试：iPhone6S真机/微信工具预览，PHPstorm编码

##使用说明
1. 由于微信安全域名的限制，如果你填了自己的APPID，所有请求都会失败
2. 无APPID的情况下，使用微信登录会存在问题，请使用手机号登录
3. 目前是测试版本，故未接入短信平台，所以手机是收不到验证码的，直接点获取验证码就已经填上了
4. 如需在微信中体验完整功能，请联系文末的邮箱，注明理由和微信号申请体验权限
    
##使用过程遇到的坑丶记录
1. 背景图不生效，改用image或者Base64
2. 执行POST请求异常，将data中的JSON对象格式化为from序列
3. 页面切换的参数接收异常，在onload方法中，默认的参数即使上一页面传过来的Object参数
4. 在使用data-readingItem的时候，微信解析为dataset的时候会转成小写
5. 多页面的时候，在app.json中重复配置，会编译失败
6. 直接使用 this.data.XXX = XXX 赋值的时候，数据是不会同步更新到VM即WXML中的，必须使用其setData方法
7. 循环加载JSON数据集合时，如果其中有项是null，在开发工具中加载正常，但是在手机中浏览时显示空白页，并且调试时没有错误信息，所以需要对可能为null的数据进行判断
PS:由于有预处理，所以没有遇到这个问题
8. 针对swiper控件，设置min-height不生效，必须设置height，同时swiper-item的间隙也有坑，项目中有实践
9. 使用uploadFile-formData传递参数的时候，formData是个三项的JSON,PHP通过$_REQUEST尽然只能接到最后一个参数
PS:怀疑是微信的坑，后来使用的是将其以GET方式提交，才正常接到
10. 在使用for循环的时候，用的是立即执行的闭包函数，但是PHP端接到的三个请求的time竟然是一样的，这直接导致了文件获取的异常，
目前未找到真实原因，是本人对for循环理解太浅？后通过额外加参数解决
11. 微信录制的音频格式为.silk格式，具体可以Google，强大的ffmpeg都没法直接解码，最后使用了GitHub上的一个开源Decoder库，
解码成功转成了MP3，感谢作者，地址：https://github.com/kn007/silk-v3-decoder
12.使用循环的时候注意for-items里面要有大括号，而for-item里面没有大括号，同时谨慎使用IDE的代码format功能

##未解之谜|改进方向
1. for循环中的立即执行函数时间是完全一致的？
2. 在页面切换的时候，切换到特定页面，需要先校验其是否登陆，然后跳转登陆页，结果真机上实践，几乎都是失败的
3. 后期考虑使用登陆蒙层来解决，但是每个页面怎么自动引入登陆的template？
4. 代码执行完之后，在回调中直接navigateTo或者redirectTo失败率很高，暂时用setTimeOut缓解。
5. 下拉刷新的样式后期考虑自己定制，封装成方法
6. 进一步扩充工具类，封装实用方法

##真机预览图
![p11](http://jfun.top/static/images/wxapp/p11.jpg)
![p1](http://jfun.top/static/images/wxapp/p1.jpg)
![p2](http://jfun.top/static/images/wxapp/p2.jpg)
![p3](http://jfun.top/static/images/wxapp/p3.jpg)
![p4](http://jfun.top/static/images/wxapp/p4.jpg)
![p5](http://jfun.top/static/images/wxapp/p5.jpg)
![p6](http://jfun.top/static/images/wxapp/p6.jpg)
![p7](http://jfun.top/static/images/wxapp/p7.jpg)
![p8](http://jfun.top/static/images/wxapp/p8.jpg)
![p9](http://jfun.top/static/images/wxapp/p9.jpg)
![p10](http://jfun.top/static/images/wxapp/p10.jpg)

##Connect Me
######email:  jxk854613@163.com
######blog:   jfun.top/wordpress
