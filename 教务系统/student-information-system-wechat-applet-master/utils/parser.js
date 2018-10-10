var config = require('../config.js')

var viewStatePattern = /name="__VIEWSTATE[\w\W]+?value="(.+?)"/
var tablePattern = /<table[\w\W]+?>([\w\W]+?)<\/table>/ig
var trPattern = /<tr[\w\W]+?>([\w\W]+?)<\/tr>/ig
var tdPatterb = /<td>([\w\W]+?)<\/td>/ig
var szxfPattern = /<span[\w\W]+?id="Szxf"><font[\w\W]+?color="MediumBlue">(.+?)<\/font><\/span>/
var pjxfjdPattern = /<span[\w\W]+?id="pjxfjd"><font[\w\W]+?color="DarkRed">(.+?)<\/font><\/span>/
var zxfjdPattern = /<span[\w\W]+?id="zxfjd"><font[\w\W]+?color="Darked">(.+?)<\/font>/

// ajax 访问图片/二进制
var test = function (url, callback) {
  var xhr = new XMLHttpRequest()
  xhr.responseType = 'blob'
  xhr.onload = function () {
    var reader = new FileReader()
    var headers = xhr.getAllResponseHeaders()
    reader.onloadend = function () {
      callback(reader.result, headers)
    }
    reader.readAsDataURL(xhr.response)
  }
  xhr.open('GET', url)
  xhr.send()
}

var paseAchievement = function (html) {
  // match values
  var achievement = []

  // match tables
  var tableMatchers = html.match(tablePattern)
  var table1 = tableMatchers[2]
  var trMatchers1 = table1.match(trPattern)
  // match table grids
  for (var i in trMatchers1) {
    var tr = trMatchers1[i]
    var tdMatchers = tr.match(tdPatterb)
    var row = []
    for (var j in tdMatchers) {
      var value = tdMatchers[j].replace(/(<td>)/, '').replace(/(<\/td>)/, '')
      if (value == '&nbsp;')
        value = ''
      row.push(value)
    }
    achievement.push(row)
  }

  return achievement
}

var paseViewState = function (html) {
  var viewState = ''
  var viewStateMatcher = html.match(viewStatePattern)
  if (viewStateMatcher != null)
    viewState = viewStateMatcher[1]
  return viewState
}

module.exports = {
  'test': test,
  'paseAchievement': paseAchievement,
  'paseViewState': paseViewState
}
