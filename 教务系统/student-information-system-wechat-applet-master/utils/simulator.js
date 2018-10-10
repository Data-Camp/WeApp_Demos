var config = require('../config.js')
var paser = require('./parser.js')

var loginUrl = config.loginUrl
var infoUrl = config.infoUrl
var electiveUrl = config.electiveUrl
var achievementUrl = config.achievementUrl
var cookieStr = ''

login = function (username, password) {
  // TODO
}

getAchievement = function (successFunc, failFunc) {
  console.log(achievementUrl)
  wx.request({
    url: achievementUrl,
    header: {
      'Cookie': cookieStr
    },
    success: function (res) {
      var data = []
      try {
        data = paser.paseAchievement(res.data)
        successFunc(data)
      } catch (error) {
        failFunc('parse error')
      }
    },
    fail: function (res) {
      failFunc('network error')
    }
  })
}

getElective = function () {
  // TODO
  return []
}

getInfo = function () {
  // TODO
  return []
}

module.exports = {
  'getAchievement': getAchievement,
  'login': login,
  'getElective': getElective,
  'getInfo': getInfo
}
