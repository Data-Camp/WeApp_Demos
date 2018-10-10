const host = 'http://api5.wochu.cn/client/v1/';
const wxRequest = (params, url) => {
    wx.showToast({
        title: '加载中',
        icon: 'loading'
    })
    wx.request({
      url: url,
      data:params.data || {},
      method: params.method || 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
          'Content-Type':'application/json'
      }, // 设置请求的 header
      success: function(res){
        // success
        params.success && params.success(res)
        wx.hideToast()
      },
      fail: function() {
        // fail
        params.fail && params.fail(res)
      },
      complete: function() {
        // complete
        params.complete && params.complete(res)
      }
    })
}


//首页 indexindex
const getAppLayoutamend = (params) => wxRequest(params,host + "app/layoutamend")
const getActsamend = (params) => wxRequest(params,host + "actsamend")

//分类 
const getGetCategoryRecommendList = (params) => wxRequest(params,host + "goods/GetCategoryRecommendList")
const getCategoryListByMenuId = (params) => wxRequest(params,host + 'Goods/GetCategoryListByMenuId')






module.exports = {
    getAppLayoutamend,
    getActsamend,
    getGetCategoryRecommendList,
    getCategoryListByMenuId
}