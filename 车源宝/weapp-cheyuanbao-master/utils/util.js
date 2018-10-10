function formatTime(date) {
  var year = new Date(date).getFullYear()
  var month = new Date(date).getMonth() + 1
  var day = new Date(date).getDate()

  var hour = new Date(date).getHours()
  var minute = new Date(date).getMinutes()
  var second = new Date(date).getSeconds();


  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function fetchURL(url, callback) {
  return fetch(url)
    .then(function (response) {
      if (response.status == 200) {
        return response.json();
      }
    }).then(function (data) {
      // console.log(data);
      if (typeof callback == 'function') {
        callback(data);
      }
    })
}

module.exports = {
  formatTime: formatTime,
  formatNumber: formatNumber,
  fetch: fetchURL
}
