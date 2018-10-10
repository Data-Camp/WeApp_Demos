import {
  MUSIC_PALY_IMG,
  MUSIC_PAUSE_IMG
} from '../../../utils/constants.js'
import api from '../../../api/api.js'
import util from '../../../utils/util.js'

Page({
  data: {
    detail: [],
    playing: false
  },
  onLoad: function (options) {
    api.getMusicDetailById({
      query: {
        id: options.id
      },
      success: (res) => {
        if (res.data.res === 0) {
          let detail = res.data.data

          detail.playImg = MUSIC_PALY_IMG
          detail.contentType = 'story'
          detail.story = util.filterContent(detail.story)
          detail.maketime = util.formatMakettime(detail.maketime)

          this.setData({ detail })
        }
      }
    })
  },
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '单曲'
    })
  },
  togglePlay: function (e) {
    let detail = this.data.detail
    let playing = this.data.playing

    if (!playing) {
      detail.playImg = MUSIC_PAUSE_IMG
      this.playMusic(detail)
    } else {
      detail.playImg = MUSIC_PALY_IMG
      this.pauseMusic()
    }
    playing = !playing

    this.setData({ detail, playing })
  },
  playMusic: function (music) {  
    wx.playBackgroundAudio({
      dataUrl: music.music_id,
      title: music.title
    })
  },
  pauseMusic: function () {
    wx.pauseBackgroundAudio()
  },
  switchContent: function (e) {
    let type = e.target.dataset.type
    let detail = this.data.detail
    
    detail.contentType = type
    this.setData({ detail })
  }
})