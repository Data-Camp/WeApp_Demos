一个微信小程序--简易计算器
============================

这是一个简单的仿小米计算器的微信小程序, 目前比较简单, 仅供参考, 欢迎star。

计算器的逻辑是基于一个简单的状态机实现的, 下面给出了状态机图, 仅供参考。

效果图:
--------
![效果图](http://7xqe6t.com1.z0.glb.clouddn.com/imgs/2016-11-09/calc/demo.gif)


状态机图:
--------
![状态机图](http://7xqe6t.com1.z0.glb.clouddn.com/imgs/2016-11-09/calc/states.svg)

* init: 初始状态
* first_undot: 第一个操作数录入中, 无小数点
* first_dot: 第一个操作数录入中, 有小数点
* second_undot: 第二个操作数录入中, 无小数点
* second_dot: 第二个操作数录入中, 有小数点
* result: 结果状态


## 主要特性

* 支持简单的加减乘除和取余数
* 支持连续操作, 比如做了加法以后, 结果会直接作为第一个操作数进入下一轮操作
* 支持删除单个数字和一次性全部清空
## LICENSE

Copyright 2016 boyce.ywr@gmail.com

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the "Software"),
to deal in the Software without restriction, including without limitation
the rights to use, copy, modify, merge, publish, distribute, sublicense,
and/or sell copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.