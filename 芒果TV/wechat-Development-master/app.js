/*
* @Author: mark
* @Date:   2016-09-27 16:27:19
* @Last Modified by:   mark
* @Last Modified time: 2016-09-29 10:17:44
*/
App(
    {
        onLaunch: function () {
            console.log('芒果TV 初始化成功')
        },
        onShow: function () {
            console.log('页面显示')
          
        },
        onHide: function () {
            console.log('页面隐藏')

        },
        globalData: {
            hasLogin: false
        }
    }
)

var appInstance = getApp()
console.log(appInstance) // I am global data
