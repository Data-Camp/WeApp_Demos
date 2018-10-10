Page({
  data:{
    // text:"这是一个页面"
    lineData: {}
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    console.log(options);
    this.getLineData();
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  getLineData: function() {
    //获取线路详情
    wx.request({
        url: 'https://gongjiao.xiaojukeji.com/api/transit/line/query',
        method: 'POST',
        header: {
            'Content-Type': 'application/json'
        },
        data: {
            imei:'general_app',
            token:'t49GcWlrGxJ0d2tGQtC9zA_MYpKZXtCpEcwSEJk1jSpUjTsOAyEMRO8ytQucZY3t25B_KiJQlAJx91hKte28p3kTFQ4QzvCTci7ZipjJxplwhSvhBp941zG-rccSjnCYwoTRPv0SfF-E-xE94pZ342SJddMoPP-hFzytXwAAAP__',
            lng:'116.29319741622',
            lat:'40.041375934019',
            city:1,
            filter:'0',
            line_id: '010-1-00'
        },
        success: function(res){
           if(res.data.metrobus) {
                this.setData({
                    lineData: res.data.metrobus
                });
           }
        }.bind(this)
    });
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})