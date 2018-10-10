import menus from './resources/json/menus.js'
Page({
  data:{
    text:"Page main",
    background: [
      {
        color:'green',
        sort:1
      }, 
      {
        color:'red',
        sort:2
      },
      {
        color:'yellow',
        sort:3
      }
      ],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 3000,
    duration: 1200,
    toView: 'blue',
    'menus':menus,
    selectedMenuId:1,
    total:{
      count:0,
      money:0
    }
  },
  selectMenu:function(event){
    let data = event.currentTarget.dataset
    this.setData({
      toView: data.tag,
      selectedMenuId: data.id
    })
    // this.data.toView = 'red'
  },
  addCount:function(event){
    let data = event.currentTarget.dataset
    let total = this.data.total
    let menus = this.data.menus
    let menu = menus.find(function(v){
      return v.id == data.cid
    })
    let dish = menu.dishs.find(function(v){
      return v.id == data.id
    })
    dish.count += 1;
    total.count += 1
    total.money += dish.price
    this.setData({
      'menus':menus,
      'total':total
    })
    console.log(this.data.menus)
  },
  minusCount:function(event){
    let data  = event.currentTarget.dataset
    let total = this.data.total 
    let menus = this.data.menus
    let menu = menus.find(function(v){
      return v.id == data.cid
    })
    let dish = menu.dishs.find(function(v){
      return v.id == data.id
    })
    if(dish.count <= 0)
      return 
    dish.count -= 1;
    total.count -= 1
    total.money -= dish.price
    this.setData({
      'menus':menus,
      'total':total
    })
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  onScroll:function(e){
    console.log(e)
  }
})