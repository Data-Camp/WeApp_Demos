//index.js
//获取应用实例
var util = require('../../utils/util.js')
var app = getApp()
 
Page({
  data: { 
    curDate: {},
    userInfo: {},
    myMainCur: {},
    mySelectCurs: {}
  },

  longtapFormSet: function(event) {
        var that = this

        wx.showActionSheet({
              itemList: ['设 '+event.currentTarget.dataset.text+' 为主货币？', '删除 '+event.currentTarget.dataset.text+'?'],
              success: function(res) {
                if (!res.cancel) {
                 if(res.tapIndex==0)
                 {
                      var temppp=that.data.myMainCur;

                      const length = that.data.mySelectCurs.length;
                      for (let i = 0; i < length; i++) 
                      {              
                          if(event.currentTarget.dataset.id==that.data.mySelectCurs[i].name)
                          {
                               that.data.myMainCur=that.data.mySelectCurs[i];
                               that.data.myMainCur.amount=temppp.amount;
                               that.data.mySelectCurs[i]=temppp;
                               break;
                           } 
                       }   
                       that.setData({
                                              mySelectCurs:that.data.mySelectCurs
                                  })   
                        that.setData({
                                              myMainCur:that.data.myMainCur
                                  })


                       wx.setStorage({
                                              key:"myMainCur",
                                              data:that.data.myMainCur
                       })

                       wx.setStorage({
                                              key:"mySelectCurs",
                                              data:that.data.mySelectCurs
                       })
                       
                     that.rateCount(that.data.myMainCur.amount);
                 }

                 if(res.tapIndex==1)
                 { 
                      wx.showModal({
                        title: '系统提示',
                        content: '确定要删除：'+event.currentTarget.dataset.text+'?',
                        success: function(res) {
                          if (res.confirm) {
                                  util.removeByValue(that.data.mySelectCurs,event.currentTarget.dataset.id);
                                          that.setData({
                                              mySelectCurs:that.data.mySelectCurs
                                  })

                                  wx.setStorage({
                                              key:"mySelectCurs",
                                              data:that.data.mySelectCurs
                                })
                          }
                        }
                      })
                 }
                }
              }
            })
  },

  //增加货币
  bindAddCur: function() {
      var thisUrl='../addCur/addCur'
      wx.navigateTo({
          url: thisUrl
      })
  },
  bindViewTap:function() {
  },

bindKeyInput: function(e) {
    var that = this
    that.data.myMainCur.amount=e.detail.value;
    wx.setStorage({
        key:"myMainCur",
        data:that.data.myMainCur
      })
      that.rateCount(that.data.myMainCur.amount);
    },

  rateCount: function(e) {
    var that = this
    // that.data.myMainCur.amount=e;
    // wx.setStorage({
    //     key:"myMainCur",
    //     data:that.data.myMainCur
    //   })

    const length = that.data.mySelectCurs.length;
    if(length>0)
    {
    var toss=that.data.mySelectCurs[0].name;
    for (let i = 1; i < length; i++) {
            toss=toss+","+that.data.mySelectCurs[i].name;
     }


    var jsonn=util.json2Form({
            "from":that.data.myMainCur.name,
            "tos":toss,
            "amount":e
            }); 

    var urll="https://wapp.talk-easy.cn/currency/getcurrencyrates?"+jsonn;

    console.info( 'urll:'+ urll); 

    wx.request( {  
      url:urll,  
     // data:jsonn,
      header: {  
        // 'Content-Type': 'application/json' 
     // "Content-Type": "application/x-www-form-urlencoded"  
      },  
      method: "GET",  
     
      success: function( res ) { 
          console.info(res.data );   
          for (let i = 0; i < length; i++) 
          {
             for (let j = 0; j < res.data.length; j++) 
             {
               if(res.data[j].name==that.data.mySelectCurs[i].name)
               {
                    that.data.mySelectCurs[i].rate=res.data[j].rate.toFixed(2);  
                    that.data.mySelectCurs[i].amount=res.data[j].amount.toFixed(2);  
                    continue;
               }
             }
          }

          that.setData({
            mySelectCurs:that.data.mySelectCurs
          })

          wx.setStorage({
              key:"mySelectCurs",
              data:that.data.mySelectCurs
          })
      },
      fail: function( res ) { 
          console.error( '网络请求失败' );   
      },
      complete: function( res ) {  
        if( res == null || res.data == null ) {  
            return;  
        }  
      }  
    }) 
   }
  }, 

 
  onLoad: function () {
    var that = this 

    that.setData({
          curDate:util.formatTime(new Date())
      }),
    //获取用户收藏的货币
    wx.getStorage({
          key: 'mySelectCurs',
          success: function(res) {
              that.setData({
                mySelectCurs:res.data
              })
          } 
        }),
    //获取用户主要的货币
    wx.getStorage({
          key: 'myMainCur',
          success: function(res) {
              that.setData({
                myMainCur:res.data
              })
          } 
        }),
 
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
          //更新数据
          that.setData({
            userInfo:userInfo
          })
      })

  },

  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
    //获取用户收藏的货币
    var that = this
      wx.getStorage({
          key: 'mySelectCurs',
          success: function(res) {
              console.info( "onShow:", res.data);
              that.setData({
                mySelectCurs:res.data
              })
          } 
        })
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})
