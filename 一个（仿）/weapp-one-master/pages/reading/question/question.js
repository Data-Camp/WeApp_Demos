import api from '../../../api/api.js'
import util from '../../../utils/util.js'

Page({
  data: {
    question: {}
  },
  onLoad: function (options) {
    api.getQuestionById({
      query: {
        id: options.id
      },
      success: (res) => {
        if (res.data.res === 0) {
          let question = res.data.data
          question.answer_content = util.filterContent(question.answer_content)
          question.question_makettime = util.formatMakettime(question.question_makettime)
          this.setData({ question })
        }
      }
    })
  },
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '问题'
    })
  }
})