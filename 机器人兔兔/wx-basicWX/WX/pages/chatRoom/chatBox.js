Page({
  data: {
    inputValue: '',
    returnValue: '',
    allContentList: [],
    key: "d13b441029804ee99fc4e3b617a5f557",
    num:0
  },
  bindKeyInput: function(e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  submitTo:function(e){
    let that = this;
    that.data.allContentList.push({"value": that.data.inputValue});
    that.setData({
      allContentList: that.data.allContentList
    })
    let _url = `http://www.tuling123.com/openapi/api`;
    wx.request({
        url: _url, 
        data:{
            key: that.data.key,
            info: that.data.inputValue 
        },
        header: {
            'Content-Type': 'application/json'
        },
        success: function(res) {
          let data = res.data;
          if(data.code === 100000){
            that.data.allContentList.push({"value": data.text});
            that.setData({
                   returnValue: data.text,
                  allContentList: that.data.allContentList
               })
          
          }else{
               
          }
          
        }
      })
    
    //////
     
  },
  onLoad: function(){
     // 设置标题
     wx.setNavigationBarTitle({
            title: '兔兔',
            success:function(){
               // console.log("success")
            },
            fail: function(){
               // console.log("error")
            }
        })
  }

})