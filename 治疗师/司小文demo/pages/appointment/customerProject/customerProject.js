Page({
  data:{
     titleName:null,
     types: [
       {
         'type':'照相',
         'image':'/image/icon_API_HL.png',
         'plains':true
       },
       {
         'type':'祛痘体验',
         'image':'/image/icon_API_HL.png',
         'plains':true
       },
       {
         'type':'祛痘',
         'image':'/image/icon_API_HL.png',
         'plains':true
       },
       {
         'type':'祛黑头',
         'image':'/image/icon_API_HL.png',
         'plains':true
       },
       {
         'type':'照相',
         'image':'/image/icon_API_HL.png',
         'plains':true
       },
       {
         'type':'祛痘体验',
         'image':'/image/icon_API_HL.png',
         'plains':true
       },
       {
         'type':'祛痘',
         'image':'/image/icon_API_HL.png',
         'plains':true
       },
       {
         'type':'祛黑头',
         'image':'/image/icon_API_HL.png',
         'plains':true
       },
       {
         'type':'照相',
         'image':'/image/icon_API_HL.png',
         'plains':true
       }
    ],
    color:'black'
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数

      wx.setNavigationBarTitle({
        title: options.name,
        success: function(res) {
          // success
        }
      })

      this.setData({
        titleName:options.name
      })
      console.log("5")
  },

  onReady:function(){
    // 页面渲染完成
    // wx.setNavigationBarTitle({
    //     title : this.data.titleName+'项目'
    // })
    console.log("1")
  },

  onShow:function(){
    // 页面显示
    console.log("2")
  },

  goToNextA(e){
    console.log(e);
    
    //获取到数组
    var typeA = this.data.types;
    //循环数组
    for (var i=0; i<typeA.length; ++i){
      //寻找到相应下标的数组元素时
      if (e.currentTarget.id == i){
        //按钮的镂空状态设置为非
         typeA[i].plains = !typeA[i].plains;
      }
    }
    this.setData({
      //保存全局数组
      types: typeA
    })
  }
})

// Page({
//   data:{
//     // text:"这是一个页面"
//     tip:'',
//     userName:'',
//     psw:''
//   },
//   formBindsubmit:function(e){
//        console.log(e.detail);

//     if(e.detail.value.userName.length==0||e.detail.value.psw.length==0){
//       this.setData({
//         tip:'提示：用户名和密码不能为空！',
//         userName:'',
//         psw:''
//       })
//     }else{
//       this.setData({
//         tip:'',
//         userName:'用户名：'+e.detail.value.userName,
//         psw:'密码：'+e.detail.value.psw
//       })
//     }
//     console.log(e.detail);
//   },
//   formReset:function(){
//     this.setData({
//       tip:'',
//       userName:'',
//       psw:''
//     })
//   }
// })
