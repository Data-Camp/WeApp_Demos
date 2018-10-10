Page({
  data: {
    texts: [
      '这是第1个tab\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n嘻嘻，到底了',
      '这是第2个tab\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n嘻嘻，到底了',
      '这是第3个tab\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n嘻嘻，到底了'
    ]
  },
  tabchange: function(e){
    console.log('现在跳转到了第 ' + e.detail.current + ' 个tab')
  }
})
