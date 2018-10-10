Page({
  data:{
    name:'',
    phonenumber:'',
    submited:false
  },
  inputName: function(e){
    this.setData({
      name:e.detail.value
    })
  },
  inputPhone: function(e){
    if(e.detail.cursor>=11){
      this.setData({
        phonenumber:e.detail.value
      })
      wx.hideKeyboard()
    }
  },
  reserveSubmit:function(){
    if(this.data.name && this.data.phonenumber){
      this.setData({submited:true});
      wx.showToast({
        title: '预约成功',
        icon: 'success',
        duration: 2000
      })
    }
    // }else{
    //   wx.showToast({
    //     title: '联系人和手机号码不能为空！',
    //     icon: 'loading',
    //     duration: 1000
    //   })
    // }
  }
})