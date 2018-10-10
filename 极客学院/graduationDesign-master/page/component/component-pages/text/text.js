Page({
  data: {
    initData: 'this is first line\nthis is second line',
    text: 'this is first line\nthis is second line',
    extraLine: []
  },
  add: function(e) {
    this.data.extraLine.push('other line')
    this.setData({
      text: this.data.initData + '\n' + this.data.extraLine.join('\n')
    })
  },
  remove: function(e) {
    if (this.data.extraLine.length > 0) {
      this.data.extraLine.pop()
      this.setData({
        text: this.data.initData + '\n' + this.data.extraLine.join('\n')
      })
    }
  }
})
