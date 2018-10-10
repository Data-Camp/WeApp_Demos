let ajax = require('../../network/ajax')

const answers = [
    'Yes!',
    'No',
    'Hm...',
    'I am not sure',
    'And what about you?',
    'May be ;)',
    'Lorem ipsum dolor sit amet, consectetur',
    'What?',
    'Are you sure?',
    'Of course',
    'Need to think about it',
    'Amazing!!!'
]
let answerTimeout

// TODO 获取消息、发送消息之后需要滚动到底部
// 似乎 scroll-view 很多问题 

Page({
  data: {
    userName: '',
    messages: [],
    inputValue: '',
    inputContent: {}
  },
  onLoad(options) {
    let name = options.name || 'HiApp'
    this.setData({
      userName: name
    })
  },
  onReady() {
    wx.setNavigationBarTitle({
      title: this.data.userName
    })
    this.getMessage()
  },
  bindChange(e) {
    this.data.inputContent[e.currentTarget.id] = e.detail.value
  },
  getMessage() {
    wx.showToast({
      title: 'loading...',
      icon: 'loading'
    })
    ajax({
        url: 'message.json',
        success: res => {
          this.setData({
            messages: res.data
          })
        },
        complete: _ => {
          wx.hideToast()
        }
    })
  },
  sendMessage() {
    this.setData({
      messages: [...this.data.messages, {
        text: this.data.inputContent.message,
        from: 'sent'
      }]
    })
    this.data.inputValue = ''
    setTimeout(() => {
      this.autoAnswer()
    }, 1000)
  },
  autoAnswer() {
    answerTimeout && clearTimeout(answerTimeout)
    answerTimeout = setTimeout(_ => {
      let message = {
        from: 'received',
        text: answers[Math.floor(Math.random() * answers.length)]
      }
      this.setData({
        messages: [...this.data.messages, message]
      })
    }, 1000)
  }
})