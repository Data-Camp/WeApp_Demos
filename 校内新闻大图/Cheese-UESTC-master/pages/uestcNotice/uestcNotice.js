// pages/uestcNews/uestcNews.js
Page({
  data:{
      newList:[],
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数

    var that = this;
    requestData(that, "");
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },


  onItemClick: function (event) {
    //   var targetUrl="/pages/uestcNoticeDetail/uestcNoticeDetail"
    var targetUrl="/pages/focusNewsDetail/focusNewsDetail"
        if (event.currentTarget.dataset.detailHrefId != null)
            targetUrl = targetUrl + "?Id=" + event.currentTarget.dataset.detailHrefId;

        wx.navigateTo({
            url: targetUrl
        });
    },
})


/**
 * 请求数据
 * @param that Page的对象，用其进行数据的更新
 * @param targetPage 请求的目标页码
 */
function requestData(that, targetPage) {
    wx.request({
        //连到服务器 获取json格式的文档
        url: Constant.SERVER_ADDRESS+"/notice",
        header: {
            "Content-Type": "application/json"
        },
        success: function (res) {
            if (res == null) {  
                console.error(Constant.ERROR_DATA_IS_NULL);
                return;
            }
            for(var i=0;i<=res.data.htmlBody.length;i++){
                _body:res.data.htmlBody
            }
             that.setData({
                newList: res.data.htmlBody,
             })

        }
    });
}


//获取配置的的 全局常量
var Constant = require('../../utils/constant.js');