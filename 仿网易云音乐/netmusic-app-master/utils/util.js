var bsurl=require('bsurl.js');
function formatTime(date, type) {
  type = type || 1;
  //type 1,完成输出年月日时分秒，2对比当前时间输出日期，或时分;
  var d = new Date(date)
  var year = d.getFullYear()
  var month = d.getMonth() + 1
  var day = d.getDate()

  var hour = d.getHours()
  var minute = d.getMinutes()
  var second = d.getSeconds();
  if (type == 1) {
    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':');
  } else {
    var current = new Date();
    var curtimes = current.getTime();
    if ((curtimes - date) < 24 * 3600000) {
      if (curtimes - date < 3600000) {
        return (new Date(curtimes - date)).getSeconds() + "分钟前";
      }
      else {
        return [hour, minute].map(formatNumber).join(':');
      }

    } else if ((curtimes - date) < 48 * 3600000) {
      return "昨天：" + [hour, minute].map(formatNumber).join(':');

    } else if (year != current.getFullYear()) {
      return year + "年" + month + "月" + day + "日"
    }
    else {
      return month + "月" + day + "日"
    }
  }
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
function formatduration(duration) {
  duration = new Date(duration);
  let mint = duration.getMinutes();
  let sec = duration.getSeconds();
  return formatNumber(mint) + ":" + formatNumber(sec);
}

function parse_lrc(lrc_content) {
  let now_lrc = [];
  let lrc_row = lrc_content.split("\n");
  let scroll = true;
  for (let i in lrc_row) {
    if ((lrc_row[i].indexOf(']') == -1) && lrc_row[i]) {
      now_lrc.push({ lrc: lrc_row[i] });
    } else if (lrc_row[i] != "") {
      var tmp = lrc_row[i].split("]");
      for (let j in tmp) {
        scroll = false
        let tmp2 = tmp[j].substr(1, 8);
        tmp2 = tmp2.split(":");
        let lrc_sec = parseInt(tmp2[0] * 60 + tmp2[1] * 1);
        if (lrc_sec && (lrc_sec > 0)) {
          let count = tmp.length;
          let lrc = trimStr(tmp[count - 1]);
          if (lrc != "") {
            now_lrc.push({ lrc_sec: lrc_sec, lrc: lrc });
          }

        }
      }
    }
  }
  if (!scroll) {
    now_lrc.sort(function (a, b) {
      return a.lrc_sec - b.lrc_sec;
    });
  }
  return {
    now_lrc: now_lrc,
    scroll: scroll
  };
}
function trimStr(str) { return str.replace(/(^\s*)|(\s*$)/g, ""); }

//音乐播放监听
function playAlrc(that, app) {
  if (app.globalData.globalStop) {
    that.setData({
      playtime: '00:00',
      duration: '00:00',
      percent: 0.1,
      playing: false,
      downloadPercent:0
    });
    return;
  }
  if (that.data.music.id != app.globalData.curplay.id) {
    that.setData({
      music: app.globalData.curplay,
      lrc: [],
      showlrc: false,
      lrcindex: 0,
      duration: formatduration(app.globalData.curplay.duration)
    });
    wx.setNavigationBarTitle({ title: app.globalData.curplay.name + "-" + app.globalData.curplay.artists[0].name });
    loadrec(0, 0, that.data.music.commentThreadId, function (res) {
      that.setData({
        commentscount: res.total
      })
    })
  }
  wx.getBackgroundAudioPlayerState({
    complete: function (res) {
      var time = 0, lrcindex = that.data.lrcindex, playing = false, playtime = 0,downloadPercent=0;
      if (res.status != 2) {
        time = res.currentPosition / res.duration * 100;
        playtime = res.currentPosition;
        downloadPercent=res.downloadPercent
        if (that.data.showlrc && !that.data.lrc.scroll) {
          for (let i in that.data.lrc.lrc) {
            var se = that.data.lrc.lrc[i];
            if (se.lrc_sec <= res.currentPosition) {
              lrcindex = i
            }
          }
        };

      } if (res.status == 1) {
        playing = true;
      }
      that.setData({
        playtime: formatduration(playtime * 1000),
        percent: time,
        playing: playing,
        lrcindex: lrcindex,
        downloadPercent:downloadPercent
      })
    }
  });
};
function loadrec(offset, limit, id, cb) {
  wx.request({
    url: bsurl+'recommend',
    data:{
      id:id,
      limit:limit,
      offset:offset
    },
    method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    success: function (res) {
      var data = res.data;
      for (let i in data.hotComments) {
        data.hotComments[i].time = formatTime(data.hotComments[i].time, 2);
      }
      for (let i in data.comments) {
        data.comments[i].time = formatTime(data.comments[i].time, 2);
      };
      cb && cb(data)
    }
  })
}
function loadlrc(that) {
  if (that.data.showlrc) {
    that.setData({
      showlrc: false
    })
    return;
  } else {
    that.setData({
      showlrc: true
    })
  }
  if (!that.data.lrc.code) {
    var lrcid = that.data.music.id;
    var that = that;
    wx.request({
      url:bsurl+'lrc?id=' + lrcid,
      success: function (res) {
        var lrc = parse_lrc(res.data.lrc && res.data.lrc.lyric ? res.data.lrc.lyric : '');
        res.data.lrc = lrc.now_lrc;
        res.data.scroll = lrc.scroll ? 1 : 0
        that.setData({
          lrc: res.data
        });
      }
    })
  }
}
module.exports = {
  formatTime: formatTime,
  formatduration: formatduration,
  parse_lrc: parse_lrc,
  playAlrc: playAlrc,
  loadlrc: loadlrc,
  loadrec: loadrec
}
