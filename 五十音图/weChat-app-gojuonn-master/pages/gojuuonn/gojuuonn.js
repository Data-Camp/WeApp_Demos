//const Util = require('../../utils/util.js')
const Data = require('../../data.js')
Page({
  //data 将会以 JSON 的形式由逻辑层传至渲染层，所以其数据必须是可以转成 JSON 的格式：字符串，数字，布尔值，对象，数组。
  //此处 forfoot 用数据徐循环则没什么意思了 无法绑定 并 调用回调 data中也无法存function;
  data: {
    minHeight:'',
    mojiList:[],
    // fortest:'test',
    hiraganaShow:true,
    //无法操作dom 都需要靠data绑定
    changeKANAText:'あ',
    tabnow:'seionn',
    sannbunn:false
    // ,
    // forfoot:{
    //   tabBarList:[
    //     {
    //       text:'假名',
    //       tabCbName:'changeKANA'
    //       // ,
    //       // cbfn:function(Page){
    //       //     Page.setData({
    //       //       fortest: 'changeKANA'
    //       //     })
    //       // }
    //     },
    //     {
    //       text:'清音',
    //       tabCbName:'toSEIONN'
    //       // ,
    //       // cbfn:function(Page){
    //       //     Page.setData({
    //       //       fortest: 'toSEIONN'
    //       //     })
    //       // }
    //     },
    //     {
    //       text:'浊音',
    //       tabCbName:'toDAKUONN'
    //       // ,
    //       // cbfn:function(Page){
    //       //     Page.setData({
    //       //       fortest: 'toDAKUONN'
    //       //     })
    //       // }
    //     },
    //     {
    //       text:'拗音',
    //       tabCbName:'toYOUONN'
    //       // ,
    //       // cbfn:function(Page){
    //       //     Page.setData({
    //       //       fortest: 'toYOUONN'
    //       //     })
    //       // }
    //     }
    //   ]
    // }
  },
  onLoad: function () {
    let that = this;
    //获取系统信息
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          minHeight: res.windowHeight
        })
      }
    })
    that.setData({
      mojiList: Data.seionn
    })
    // for(let i of that.data.forfoot.tabBarList){
    //   console.log(i);
    //   Util.addEventHandleCb(that,i['tabCbName'],i['cbfn']);
    // }
  },
  //eventHandle  需在相应的Page定义中写上相应的事件处理函数...mdzz
  changeKANA(e){
    //e 不知道能咋用
    let show = this.data.hiraganaShow;
    this.setData({
      hiraganaShow: !show
    })  
    !show?this.setData({changeKANAText: 'あ'}):this.setData({changeKANAText: 'ア'})
  },
  toSEIONN(){
    this.setData({
      mojiList: Data.seionn,
      tabnow:'seionn',
      sannbunn:false
    })
  },
  toDAKUONN(){
    this.setData({
      mojiList: Data.dakuonn,
      tabnow:'dakuonn',
      sannbunn:false
    })
  },
  toYOUONN(){
    this.setData({
      mojiList: Data.youonn,
      tabnow:'youonn',
      sannbunn:true
    })
  }
})
