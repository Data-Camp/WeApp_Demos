Page({
  data: {
    spacedata:{},
    spaceimgs:[],
    currentIndex:1
  },
  onLoad: function () {
    this.setData({
      spacedata:{
        "ParkCode": "ZCKJ20160831200444",
        "ParkName": "睿鼓众创",
        "FeeScale": 0,
        "FeeScaleUnit": "元/月",
        "FeeScaleUnitValue": 2,
        "FeeScaleRoom": 0,
        "FeeScaleRoomUnit": "元/㎡/天",
        "FeeScaleRoomUnitValue": 11,
        "Address": "上海市松江区莘砖公路518号双子楼1楼",
        "TagIDs": ["资金扶持","10个独立办公室在租","5个工位在租"],
        "latitude": 31.0921575226,
        "longitude": 121.3146194992,
        "TotalBulidingArea": 1017,
        "TotalWorkstation": 214,
        "TotalRoom": 8,
        "RoomRate": 65,
        "Summary": "阿里云创客+位于莘砖公路 518 号双子楼 1 楼，漕河泾开发区松江新兴产业园内，项目于 2015 年 12 月签约，2016 年 1 月完成设计方案，目前正进行装修施工，预计 5 月底前完工，6 月底前投入使用。交付标准为全装修，包括全部家具，无线网络、门禁、监控等系统 。",
        "Policy": "<p>A、入住企业工位费减免政策（每项减免 1~3 个月工位费，可累加计算）</p><p>1）在校学生（或毕业 1 年内应届毕业生）发起创立的小微企业。 &nbsp; &nbsp;</p><p>2）创业项目在最近一年内获得过国内知名创新创业竞赛名次。 &nbsp; &nbsp;&nbsp;</p><p>3）创立后至少完成一次股权融资。 &nbsp;</p><p>4）创立者有外资成份，且外资占比不少于 30%的创业项目。 &nbsp; &nbsp;&nbsp;</p><p>5）互联网及新兴行业的创新产品和商业模式，向我司提交申请及商业计划书，</p><p>经我方审核通过，且向我方开放股权投资的企业。&nbsp;</p><p>6） 合作机构推荐的企业也享有相应的优惠政策。 &nbsp;</p><p><br></p><p>B、阿里云扶持政策&nbsp;</p><p>1） 免费阿里云使用、上云支持、支付产品、移动产品、安全产品等等；&nbsp;</p><p>2） 不定期培训和沙龙、创业大赛、阿里集团优质资源对接；&nbsp;</p><p>3） 风投对接、淘宝众筹平台、投融资对接。 &nbsp;</p><p><br></p><p>C、科技政策咨询服务&nbsp;</p><p>我们的团队可帮助入驻企业提供国家级、市级、区级各部门的科技政策项目</p><p>咨询，争取一些政府各类优惠政策的支持。&nbsp;</p><p>1） 无偿资助类（创新基金、科技小巨人、区级研发机构）；&nbsp;</p><p>2） 税务减免类（高新技术企业认定、高新技术成果转化认定、双软认定、技术</p><p>合同认定）；&nbsp;</p><p>3） 人才补助类（浦江人才计划、启明星计划、千人计划）。</p>"
      },
      spaceimgs:["http://139.196.218.128/SjPark/UserFile/Files/Thumbnail/46932530-4bc8-48dc-bf10-1e5e39d254b8_750x470.png","http://139.196.218.128/SjPark/UserFile/Files/Thumbnail/73efa039-6c54-43c6-8ad9-70f831723e2e_750x470.png","http://139.196.218.128/SjPark/UserFile/Files/Thumbnail/eb8bbf4d-e236-4c92-900c-67d8b941b02a_750x470.png"]
    })  
  },
  setCurrent: function(e){  //当前图片索引
    this.setData({
      currentIndex:e.detail.current+1
    })
  },
  imgPreview: function(){ //图片预览
    const imgs = this.data.spaceimgs;
    wx.previewImage({
      current: imgs[this.data.currentIndex-1], // 当前显示图片的http链接
      urls: imgs // 需要预览的图片http链接列表
    })
  },
  getAddress:function(e){
    const d = e.currentTarget.dataset;
    const address = d.address;
    const latitude = d.latitude;
    const longitude = d.longitude;
    wx.openLocation({
      latitude: latitude,
      longitude: longitude,
      scale: 18,
      // name: address,
      address: address,
      success:function(res){
        console.log(res);
      },
      fail:function(res){
        console.log(res);
      },
      success:function(res){
        console.log(res);
      }
    })
  },
  reserveHandle: function(){
    wx.navigateTo({
      url: '../spacereserve/spacereserve'
    })
  },
  goApply: function(){
    wx.navigateTo({
      url: '../apply/apply'
    })
  }
  // formateNumber:function(n){
  //   return n>9?n:'0'+n
  // }
})
