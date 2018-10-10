Page({
  data:{
     inputShowed:false,
     inputVal:"",
     kjsearchList:['圣诞快乐','旧时光','周岁','双12'],
     items:[
       {id:1,title:'模版1',cover:'http://img.huiyoobao.com/funny/columnback/1474432200020_orign.jpg'},
       {id:2,title:'模版2',cover:'http://img.huiyoobao.com/funny/columnback/1473825600311_orign.jpg'},
       {id:3,title:'模版3',cover:'http://img.huiyoobao.com/funny/columnback/1473825601094_orign.jpg'},
       {id:4,title:'模版4',cover:'http://img.huiyoobao.com/funny/columnback/1473825076410_orign.jpg'},
       {id:5,title:'模版5',cover:'http://img.huiyoobao.com/funny/columnback/1473825075998_orign.jpg'}],
    winHeight:0,
    winWidth:0,
    searchKeyWords:'',
    placeholderWords:'请输入搜索关键词...'
  },
  showInput:function(){
    this.setData({
      inputShowed:true
    });
  },
  hideInput:function(){
    this.setData({
      inputVal:"",
      inputShowed:false
    })
  },
  clearInput:function(){
    this.setData({
      inuptVal:""
    })
  },
  inputTyping:function(e){
    this.setData({
      inputVal:e.detail.value
    })
  },
  collectApi:function(e){
    console.log("此处进行收藏！");
  },
  previewImage:function(e){
    console.log(e.currentTarget.dataset.albumid);
    //进入创作页面
    // wx.navigateTo({
    //   url: '?albumId='+e.currentTarget.dataset.albumid
    // })
  },
  onLoad:function(options){
    let that=this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          winHeight:res.windowHeight,
          winWidth:res.windowWidth
        })
      }
    })
    if(!wx.getStorageSync('userId')){
        wx.showModal({
          title:'授权提示',
          content:'将访问你的基本信息',
          showCancel:true,
          success:function(res){
            if(res.confirm){
              //用户点击确定
              wx.login({
                success: function(res){
                  //获取code
                  wx.request({
                    url: 'http://localhost:8080/dream-album/dream/user/login/getSession.json',
                    data: {
                      code:res.code
                    },
                    method: 'GET',
                    success: function(ress){
                       wx.getUserInfo({
                        success: function(ress){
                          //缓存第三方key
                          wx.setStorageSync('threeSessionKey',ress.data);
                          wx.request({
                            url: 'http://localhost:8080/dream-album/dream/user/login/getUserInfo.json',
                            data: {
                              threeSessionKey:ress.data,
                              encryptedData:res.encryptedData,
                              iv:res.iv
                            },
                            method: 'GET',
                            success: function(res){
                              //缓存用户id
                              wx.setStorageSync('userId', res.data)
                            }
                          })
                        },
                        fail: function() {
                          console.log("获取用户信息出错！");
                        }
                      })
                    }
                  })
                },
                fail: function() {
                  console.log("登录出错了！");
                }
              })
            }else{
              //用户点击取消
              var randomStr=randomChar();
              wx.setStorageSync('userId',randomStr);
            }
          }
        })
    }
    this.search('');
  },
  searchKeyWords:function(e){
    console.log("搜索开始了了！");
    let that=this;
    if(that.data.searchKeyWords==that.data.placeholderWords){
      return;
    }
    that.search(that.data.searchKeyWords);
  },
  searchKeyWordsFast:function(e){
    this.search(e.currentTarget.dataset.keyword);
  },
  search(queryWords){
    console.log("当前搜索关键词："+queryWords);
    let that=this;
    wx.request({
      url: 'http://10.1.1.197:8080/dream-album/dream/album/common/homepage.json',
      data: {
        keyword:queryWords
      },
      method: 'GET',
      success: function(res){
        console.log(res);
        that.setData({
          items:res.data.albumList
        })
      }
    })
  },
  getKeywords:function(e){
    // this.setData({
    //   searchKeyWords:e.detail.value
    // })
    this.search(e.detail.value);
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
  }
})
function  randomChar()  {
  var l=Math.random()*10;
  var  x="0123456789qwertyuioplkjhgfdsazxcvbnm";
  var  tmp="";
  var timestamp = new Date().getTime();
  for(var  i=0;i<  l;i++)  {
  tmp  +=  x.charAt(Math.ceil(Math.random()*100000000)%x.length);
  }
  return  timestamp+tmp;
}