let app = getApp()
let util = require('../../utils/util')
let ajax = require('../../network/ajax')

let refreshing = false, refreshed = false, loadingMore = false, loadedEnd = false

Page({
  data: {
    timeline: []
  },
  onReady() {
    this.getTimeline()  
  },
  onPullDownRefresh() {
    if(refreshing) return false

    refreshing = true
    ajax({
        url: 'refresh_timeline.json',
        success: res => {
          if(refreshed) {
            wx.showToast({
              title: '没有刷出新消息哦！'
            })
          } else {
            let timeline = this.formatTimeline(res.data)
            this.setData({
              timeline: [...timeline, ...this.data.timeline]
            })
          }
        },
        complete: _ => {
          refreshing = false
          refreshed = true
          wx.stopPullDownRefresh()
        }
    })
  },
  scrollToLower() {
    if(loadingMore || loadedEnd) return false

    loadingMore = true
    ajax({
        url: 'more_timeline.json',
        success: res => {
          let timeline = this.formatTimeline(res.data)
          this.setData({
            timeline: [...this.data.timeline, ...timeline]
          })
        },
        complete: _ => {
           loadingMore = false
           loadedEnd = true 
        }
    })
  },
  getTimeline() {
    wx.showToast({
      title: 'loading...',
      icon: 'loading'
    })
    ajax({
        url: 'timeline.json',
        success: res => {
          let timeline = this.formatTimeline(res.data)
          this.setData({
            timeline: timeline
          })
        },
        complete: _ => {
          wx.hideToast()
        }
    })
  },
  formatTimeline(items) {
    items.forEach(item => {
      item.avatar = util.getAvatarUrl(item.avatar)
      item.time = util.timeFormat(item.created_at)
      return item
    })
    return items
  },
  previewImage(event) {
    wx.previewImage({
      current: '', 
      urls: [event.target.dataset.originalPic]
    })
  } 
})
