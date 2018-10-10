# wechat-weapp-gank

## GIF展示

![Gank](https://github.com/lypeer/wechat-weapp-gank/blob/master/gif/weapp.gif)

## 如何导入？

```java
项目的appid：95279527 
项目名：Gank
```

## 利益相关

首先声明，我是一名地道的Android开发者，之前几乎从未接触过前端开发相关的工作（甚至HTML，CSS和JS都只知道一点点）。

在21号晚上得知微信小程序的诞生之后，我的心情是错综复杂的，尤其是在发现小程序一夜之间似乎就火的无法无天了之后，我的心情就更错综复杂了——有好奇，有担忧，有欣喜，有抗拒——但是不管怎么样，我决定先搞搞，毕竟如果小程序真如微信官方说的那样棒的话那么他对原生的移动端所产生的影响是巨大的。

——于是22号我开始研究怎么装环境，之后上了一些网站，*w3school* 之类的，看了一下 JS ，HTML 和 CSS 的基本概念和用法，研究了一下微信的教程，24号开始着手写这个项目，25号晚基本完成项目。

##踩过的坑

已经解决的坑：：

 - 关于编辑器，使用什么编辑器怎样使用才能最愉快的开发？老实说微信自己的那个开发工具用起来有些蛋疼。
 - 在跳转page的时候怎样传递数据？官方文档没有把这个说清楚，其实是可以做的。
 - 某些图片无法加载？经测试，有些网络图片是没有办法加载的，其中以新浪图床的 *ww1 / ww2 / ww3 / ww4* 开头的为甚。怎么解决？
 - 调用 *this.setData()* 结果说没有这个方法？呵呵，当前this不对。
 - 后台接收数据需要表单？小程序并不能很方便的获得数据的表单，甚至 `<form>` 标签获得的数据也不是。
 - 解析 HTML 块？没有document，没有window，解析它简直是一种折磨。
 - `<form>` 里面无法获取 `<picker>` 的取值？明明文档里有说在 `<form>` 里面是可以支持 `<picker>` 的，结果你会发现死活无法获得他的值。
 - 要实现多层列表？有的时候也许需要在一个列表项的每一项下面又有一个子列表，在小程序里怎么做？

还没有解决的坑：

 - 如何在小程序里面内嵌网页？没有提供调用浏览器的接口，也没有办法引入外部库用js模拟浏览器。
 - `<video>` 标签只能播放直接的视频文件或视频网址，要是你是一个优酷上的视频链接的话这个标签就没办法播放链接对应的视频。
 - 使用小程序的文件下载后会一直处于请求状态，无法下载文件。（这个问题有可能是因为当前我的程序处于模拟环境）

我正在整理上面那些已经解决的问题的解决方案，敬请期待。

更新：其中一些问题的解决方案已经写出来了，在这里：**[一名Android开发者的微信小程序填坑之路(1)](http://blog.csdn.net/luoyanglizi/article/details/52681245)**

##功能相关

已经完成的功能：

 - 获得 Gank 历史数据并显示。
 - 获得 Gank 特定日期数据并显示。
 - 下载特定日期 Gank 发布的妹子图。
 - 投稿到 Gank 后台。

todo：

 - 解决无法内嵌网页的问题，实现点击特定日期里面的干货item跳转到目标网页。
 - 想办法解决无法播放视频的问题。
 - 增加下拉刷新和上拉加载更多功能。
 - 增加搜索功能。

##开源协议

```java
  Copyright 2014-2016 lypeer.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```
