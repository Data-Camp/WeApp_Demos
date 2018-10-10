var app = getApp()
Page({
  data: {
    swiper:{
      imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
      ],
      changeHandler:function(e){
        console.log(e.detail.current)
      },
      indicatorDots: true,
      autoplay: true,
      interval: 2000,
      duration: 1000,
      str:"interval"
    }
    
  },
  changeIndicatorDots: function(e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function(e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
    console.log(44444)
  },
  intervalChange: function(e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function(e) {
    this.setData({
      duration: e.detail.value
    })
  }
})