import api from '../../../api/api.js'
import util from '../../../utils/util.js'

Page({
  data: {
    detail: [],
    story: {}
  },
  onLoad: function (options) {
    let id = options.id
    api.getMovieDetailById({
      query: {
        id: id
      },
      success: (res) => {
        if (res.data.res === 0) {
          let detail = res.data.data
          this.setData({ detail })
        }
      }
    })

    api.getMovieStoryById({
      query: {
        id: id
      },
      success: (res) => {
        if (res.data.res === 0) {
          let story = res.data.data.data[0]
          story.content = util.filterContent(story.content)
          story.input_date = util.formatMakettime(story.input_date)
          this.setData({ story })
        }
      }
    })
  }
})