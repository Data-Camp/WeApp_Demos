import { 
  AUDIO_PLAY_TEXT,
  AUDIO_PLAY_IMG,
  AUDIO_PAUSE_TEXT,
  AUDIO_PAUSE_IMG
} from '../../../utils/constants.js'
import api from '../../../api/api.js'
import util from '../../../utils/util.js'

Page({
  data: {
    essay: {},
    audioBtn: {
      text: AUDIO_PLAY_TEXT,
      imgPath: AUDIO_PLAY_IMG
    }
  },
  onLoad: function (options) {
    api.getEssayById({
      query: {
        id: options.id
      },
      success: (res) => {
        if (res.data.res === 0) {
          let essay = res.data.data
          essay.hp_content = util.filterContent(essay.hp_content)
          essay.hp_makettime = util.formatMakettime(essay.hp_makettime)
          this.setData({ essay })
        }
      }
    })
  },
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '短篇'
    })
  },
  togglePlay: function (e) {
    var audio = this.data.essay.audio
    var audioBtn = this.data.audioBtn
    
    if (audioBtn.text === AUDIO_PLAY_TEXT) {
      audioBtn = {
        text: AUDIO_PAUSE_TEXT,
        imgPath: AUDIO_PAUSE_IMG
      }
      this.playAudio(audio)
    } else {
      audioBtn = {
        text: AUDIO_PLAY_TEXT,
        imgPath: AUDIO_PLAY_IMG
      }
      this.pauseAudio()
    }

    this.setData({ audioBtn })
  },
  playAudio: function (audio) {
    var title = this.data.essay.hp_title
    wx.playBackgroundAudio({
      dataUrl: audio,
      title: title
    })
  },
  pauseAudio: function () {
    wx.pauseBackgroundAudio()
  }
})