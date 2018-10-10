var config = require('../../config.js')
var http = require('../../utils/httpHelper.js')
//index.js
//获取应用实例
var app = getApp()
var sta = require("../../utils/statistics.js");
Page({
  data: {
    indicatorDots: false,//是否显示面板指示点
    autoplay: false,  //是否自动切换
    current:0,      //当前所在index
    interval: 0, //自动切换时间
    duration: 200,  //滑动时间
    clas:["action"]
  },
  onLoad:function(){
    
      var that = this;
      app.getUserInfo(function(userInfo){
          that.setData({userInfo:userInfo});
          that.getGoodsType();
      })
       http.httpGet("?c=banner&a=getBanner",{
        appid:config.APPID,
      },function (res){
        console.log(res);
          that.setData({
            bander:res.data
          });
      });
        //获取商品列表
      that.getGoodsList("",'1,2',function(list){
          that.setData({
            IndexList:list
          });
      })
  },
  onShow:function(){
  
        sta();
        app.getAppInfo(
          function (appInfo){
                wx.setNavigationBarTitle({
                  title: appInfo.title
                })
            }
        );
        
  },
  getGoodsType:function(){
        var that = this;
        var data = {appid:config.APPID,userid:this.data.userInfo.id}
        http.httpGet("?c=type&a=getTypeList" ,data,function(res){
            if(res.code == '200' && res.msg == 'success'){
                var list = res.data.list;
                var goodsData = [{type:0,title:"全部"}];
                for(var i=1;i<list.length+1;i++){
                    goodsData[i]= {type:list[i-1].id,title:list[i-1].typename};
                }
                that.setData({goodsData:goodsData});
                that.loadTabGoodsList(0);
                
            }
        });
  },
  getGoodsList:function(type,status,callback){
        var that = this;
        var data = {appid:config.APPID,typeid:type,status:status}
        if(status != '' || status != 0){
            //data.status = status;
        }
        http.httpGet("?c=goods&a=getGoodsList" ,data,function(res){
                if(res.code == '200' && res.msg == 'success'){
                    var list = res.data.list;
                    typeof callback == "function" && callback(list)
                }
        });
  },
  loadTabGoodsList:function(index){
        var that = this;
        var goodsData = that.data.goodsData;
        if(goodsData[index].banner == undefined || goodsData[index].list ==undefined){
              var type = goodsData[index].type; 
              //获取推荐商品
              this.getGoodsList(type,'2',function(list){
                    var goods = that.data.goodsData;
                    goods[index].banner = list;
                    that.setData({goodsData:goods});
              })
               //获取商品列表
              this.getGoodsList(type,'1,2',function(list){
                    var goods = that.data.goodsData;
                    goods[index].list = list;
                    that.setData({goodsData:goods});
              })
        }
        
  },
  //事件处理函数
  switchs: function(e) {
    var index = e.detail.current;
    this.loadTabGoodsList(index);
    this.setData({clas:[]});

    var data = [];
    data[index] = "action";
    this.setData({clas:data });
  },
  xun:function (e){
      var index = e.target.dataset.index;
      this.setData({current:index });
      //this.loadTabGoodsList(index);
  },
  todetail:function(e){
        var id = e.currentTarget.id;
        wx.navigateTo({
          url: '../detail/index?id='+id,
          success: function(res){
            // success
          },
          fail: function() {
            // fail
          },
          complete: function() {
            // complete
          }
        })
  },
  //处理分页
  bindlower:function(e){
    console.log(e)
  }
  
})
