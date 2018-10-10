Page({
  onReady: function () {
    this.drawBigBall()
    var that = this

    this.position =  {
      x: 151,
      y: 151,
      vx: 0,
      vy: 0,
      ax: 0,
      ay: 0
    }
    wx.onAccelerometerChange(function (res) {
      that.setData({
        x: res.x.toFixed(2),
        y: res.y.toFixed(2),
        z: res.z.toFixed(2)
      })
      that.position.ax = Math.sin(res.x * Math.PI / 2)
      that.position.ay = -Math.sin(res.y * Math.PI / 2)
      //that.drawSmallBall()
    })

    this.interval = setInterval(function () {
      that.drawSmallBall()
    }, 17)

  },
  drawBigBall: function () {
    var context = wx.createContext()
    context.beginPath(0)
    context.arc(151, 151, 140, 0, Math.PI * 2)
    context.setFillStyle('#ffffff')
    context.setStrokeStyle('#aaaaaa')
    context.fill()
    context.stroke()
    wx.drawCanvas({
      canvasId: 'big-ball',
      actions: context.getActions()
    })
  },
  drawSmallBall: function () {
    var p = this.position
    var strokeStyle = 'rgba(1,1,1,0)'

    p.x = p.x + p.vx
    p.y = p.y + p.vy
    p.vx = p.vx + p.ax
    p.vy = p.vy + p.ay

    if (Math.sqrt(Math.pow(Math.abs(p.x) - 151, 2) + Math.pow(Math.abs(p.y) - 151, 2)) >= 115) {
      if (p.x > 151 && p.vx > 0) {
        p.vx = 0
      }
      if (p.x < 151 && p.vx < 0) {
        p.vx = 0
      }
      if (p.y > 151 && p.vy > 0) {
        p.vy = 0
      }
      if (p.y < 151 && p.vy < 0) {
        p.vy = 0
      }
      strokeStyle = '#ff0000'
    }

    var context = wx.createContext()
    context.beginPath(0)
    context.arc(p.x, p.y, 15, 0, Math.PI * 2)
    context.setFillStyle('#1aad19')
    context.setStrokeStyle(strokeStyle)
    context.fill()
    context.stroke()
    wx.drawCanvas({
      canvasId: 'small-ball',
      actions: context.getActions()
    })
  },
  data: {
    x: 0,
    y: 0,
    z: 0
  },
  onUnload: function () {
    clearInterval(this.interval)
  }
})
