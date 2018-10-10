Page({
  data : {
      //查询结果
      cardInfo :[],
      flag : 0
  },

  aCity : {11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",
    21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",
    34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",
    43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川"
    ,52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",
    64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"},

 isCardID : function(sId){
        var iSum=0 ;
        var info="" ;
        if(!/^\d{17}(\d|x)$/i.test(sId)) return "你输入的身份证长度或格式错误";
        sId=sId.replace(/x$/i,"a");
        if(this.aCity[parseInt(sId.substr(0,2))]==null) return "你的身份证地区非法";
        var sBirthday=sId.substr(6,4)+"-"+Number(sId.substr(10,2))+"-"+Number(sId.substr(12,2));
        var d=new Date(sBirthday.replace(/-/g,"/")) ;
        if(sBirthday!=(d.getFullYear()+"-"+ (d.getMonth()+1) + "-" + d.getDate()))return "身份证上的出生日期非法";
        for(var i = 17;i>=0;i --) iSum += (Math.pow(2,i) % 11) * parseInt(sId.charAt(17 - i),11) ;
        if(iSum%11!=1) return "你输入的身份证号非法";
        return true;
  },

  //提交事件
  formSubmit: function(e){
    
      var cardId = e.detail.value.cardId;
      var me = this;
      if(cardId.length == 0){
        me.setData({  
           flag:0
        })
        return;
      }
      var res = this.isCardID(cardId);
      
      if(res === true){
         var domainName = getApp().domainName;
         console.log(domainName);
         //发起请求
         wx.request({
            url: domainName,
            data: {
                cardno: cardId ,
                type: "card"
            },
            header: {
                'Content-Type': 'application/json'
            },
            success: function(res) {
                if(res.data.resultcode == 200){
                    console.log(res.data.result);
                    me.setData({
                        cardInfo:{
                          area:res.data.result.area,
                          sex:res.data.result.sex,
                          birthday:res.data.result.birthday,
                        },
                        flag:1
                    })
                }else{
                    wx.showToast({
                        title: res.data.reason,
                        icon: 'success',
                        duration: 2000
                    });
                }
            }
         });
      }else{
        wx.showToast({
            title: res,
            icon: 'success',
            duration: 2000
        });
      }

      
  },

  
})