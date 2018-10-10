Page({
  data: {
    names: [
    	'处置列表',
    	'约诊',
    	'消息',
    	'顾客信息'
    ],
    navsText: [
    	'../appointment/appointment',
    	'../customer/customer',
    	'../disposalList/disposalList',
    	'../message/message',
    ]
  },
    //事件处理函数
  changeMotto: function(btn) {
    //获取button的target下的id参数
    var path;

    var num = btn.target.id;

    // if(num == '0'){
    //     path = '../appointment/appointment'
    // };
    // if(num == '1'){
    //     path = '../customer/customer'
    // };
    // if(num == '2'){
    //     path = '../disposalList/disposalList'
    // };
    // if(num == '3'){
    //     path = '../message/message'
    // };


    switch(num)
    {
        case '0':
           path = '../appointment/appointment'
           break;
        case '1':
           path = '../customer/customer'
           break;
        case '2':
           path = '../disposalList/disposalList'
           break;
        case '3':
           path = '../message/message'
           break;
        default:
           break;
    }

    wx.navigateTo({
 
        // switch
      url: path
    })
  }
})