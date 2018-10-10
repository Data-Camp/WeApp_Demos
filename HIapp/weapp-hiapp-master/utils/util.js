module.exports = {
  getAvatarUrl(ID) {
    return 'http://lorempixel.com/68/68/people/' + ID
  },
  timeFormat(ms) {
    ms = ms * 1000
    let d_second,d_minutes, d_hours, d_days
    let timeNow = new Date().getTime()
    let d = (timeNow - ms)/1000
    d_days = Math.round(d / (24 * 60 * 60))
    d_hours = Math.round(d / (60 * 60))
    d_minutes = Math.round(d / 60)
    d_second = Math.round(d)
    if (d_days > 0 && d_days < 2) {
      return `${d_days} days ago`
    } else if (d_days <= 0 && d_hours > 0) {
      return `${d_hours} hours ago`
    } else if (d_hours <= 0 && d_minutes > 0) {
      return `${d_minutes} minutes ago`
    } else if (d_minutes <= 0 && d_second >= 0) {
      return 'Just now'
    } else {
      let s = new Date()
      s.setTime(ms)
      return [s.getFullYear(), s.getMonth() + 1, s.getDate()].map(this.formatNumber).join('/') + ' ' + [s.getHours(), s.getMinutes()].map(this.formatNumber).join(':')
    }
  },
  formatNumber(n) {
    n = n.toString()
    return n[1] ? n : `0${n}`
  }
}