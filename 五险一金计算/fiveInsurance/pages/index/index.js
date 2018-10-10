//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    inputValue: '',
    userInfo: {},
    focus: false,
    index: 1,
    salary: 0,
    array: ['上海', '北京', '广州', '深圳'],
    insurance: [
      {
        category: "养老",
        private_percentage: "8",
        company_percentage: "22",
      },
      {
        category: "医疗",
        private_percentage: "2",
        company_percentage: "12",
      },
      {
        category: "失业",
        private_percentage: "1",
        company_percentage: "1.7",
      },
      {
        category: "工伤",
        private_percentage: "0",
        company_percentage: "0.5",
      },
      {
        category: "生育",
        private_percentage: "0",
        company_percentage: "0.8",
      },
      {
        category: "公积金",
        private_percentage: "7",
        company_percentage: "7",
      }
    ]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  onLoad: function () {
    console.log('onLoad',this.data)
    var that = this
    this.total();
    //调用应用实例的方法获取全局数据
    // app.getUserInfo(function(userInfo){
    //   //更新数据
    //   that.setData({
    //     userInfo:userInfo
    //   })
    // 
  },
  total: function () {
    const insurance = this.data.insurance;
    console.log(insurance);
    let private_total = 0, company_total = 0;
    insurance && insurance.forEach((t,i) => {
      private_total += parseFloat(t.private_percentage);
      company_total += parseFloat(t.company_percentage);
    });
    this.setData({
      private_total,
      company_total
    })
  },
  bindKeyInput: function(e) {
    console.log(e);
    this.setData({
      inputValue: e.detail.value
    })
  },
  modalView: function(text) {
    wx.showModal({
      title: 'Warning',
      content: text,
      showCancel: false,
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定')
      }
  }
});
  },
  startCount: function(){
    let inputValue = this.data.inputValue;
    if(!!inputValue) {
        if(!!(inputValue/1)){
          if ( inputValue > 0 ) {
            if(inputValue  > 17814) {
              inputValue = 17814;
            }else if (inputValue < 2014) {
              inputValue = 2014;
            }
            this.setData({
              salary: inputValue,
              focus: false,
            });
          } else {
            this.modalView('别开玩笑了，你还欠老板钱？')
          }    
        } else{
          this.modalView('请输入数字，OK？')
        }
    }else {
        this.modalView('输入不能为空，请重新输入！');
    }
  },
  resetData: function() {
    this.setData({
      salary: 0,
      focus: true,
      inputValue: "",
    })
  },
})
