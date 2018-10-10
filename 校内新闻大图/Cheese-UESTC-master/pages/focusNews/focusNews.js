// pages/uestcAnnounce/uestcAnnounce.js
Page({
  data:{
        caiItems: [],
        loading: true,
        hasMore: false,
        page: 1
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
            page: 1,
            caiItems: []
        })
    that=this;
    this.getDataFromServer(that,this.data.page)
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
  handleChange: function (e) {
    let current = e.detail.current
    let volsLength = this.data.caiItems.length
    // if(current==1){
    //     this.setData({
    //         page: 1,
    //     caiItems:this.data.caiItems.slice(0,15)
    //     })

    //     console.log("上拉拉加载更多...." + this.data.page)

    //     this.getDataFromServer(that,this.data.page)
    // }
    if(current>(volsLength-5)){
        this.setData({page: this.data.page + 1})

        console.log("上拉拉加载更多...." + this.data.page)

        this.getDataFromServer(that,this.data.page)
    }

  },


  refresh: function () {
        console.log("下拉刷新....")
        this.onLoad()
    },
    loadMore: function () {

        this.setData({page: this.data.page + 1})

        console.log("上拉拉加载更多...." + this.data.page)

        this.getDataFromServer(that,this.data.page)
    },
    //获取网络数据的方法
    getDataFromServer: function (that,page) {
        that.setData({
            loading: false,
            hasMore: true
        })
        //调用网络请求
        wx.request({
            //连到服务器 获取json格式的文档
            url: Constant.SERVER_ADDRESS+"/focuNews"+"?pageId="+page,
            header: {
            },
            success: function (res) {
                if (res == null) {  
                    console.error(Constant.ERROR_DATA_IS_NULL);
                    return;
                }
                if(res.data.htmlBody.length>0){
                    that.setData({
                        caiItems:that.data.caiItems.concat(res.data.htmlBody) , loading: true, hasMore: false
                })
                }
                
            }
        });
    },


    //点击 跳转到具体页面
     onItemClick: function (event) {
      var targetUrl="/pages/focusNewsDetail/focusNewsDetail"
        if (event.currentTarget.dataset.detailHrefId != null)
            targetUrl = targetUrl + "?Id=" + event.currentTarget.dataset.detailHrefId;

        wx.navigateTo({
            url: targetUrl
        });
    },
})

var that;
//获取配置的的 全局常量
var Constant = require('../../utils/constant.js');