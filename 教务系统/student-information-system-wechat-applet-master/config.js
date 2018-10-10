var isDebug = true
var sisUrl = 'http://10.50.17.10:80'
var mockUrl = 'https://applehater.cn/mock/'

// 只能用模拟得数据做演示
var achievementUrl = isDebug ? mockUrl + 'achievements.html' : sisUrl + '/xscj.aspx?xh='

module.exports = {
  loginUrl: sisUrl + '/default3.aspx',
  codeUrl: sisUrl + '/CheckCode.aspx',
  infoUrl: sisUrl + '/xsxx.aspx?xh=',
  achievementUrl: achievementUrl,
  electiveUrl: sisUrl + '/ryxk.aspx?xh=',
  mockUrl: mockUrl
}
