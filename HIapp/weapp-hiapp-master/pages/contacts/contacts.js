let util = require('../../utils/util')
let ajax = require('../../network/ajax')

Page({
  data:{
    contacts: [] 
  },
  onLoad() {
    this.getContacts()
  },
  getContacts() {
    wx.showToast({
      title: 'loading...',
      icon: 'loading'
    })
    ajax({
        url: 'contacts.json',
        success: res => {
          this.setData({
            contacts: this.formatContacts(res.data)
          })
        },
        complete: _ => {
          wx.hideToast()
        }
    })
  },
  formatContacts(items) {
    items.forEach(item => {
      item.avatar = util.getAvatarUrl(item.avatar)
      return item
    })
    return items
  },
  navToMessage(event) {
    let name = event.currentTarget.dataset.name
    wx.navigateTo({
      url: `../message/message?name=${name}`
    })
  }
})