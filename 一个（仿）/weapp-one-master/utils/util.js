import {
  VOL_AND_READING_BEGIN_TIME,
  OTHER_BEGIN_TIME,
  MONTH_MAP
} from './constants.js'

const filterContent = (string) => string.replace(/[\r\n]/g, "").replace(/<.*?>/g, "\n")

const formatMakettime = (dateString) => {
   return (new Date(dateString)).toString().split(' ', 4).slice(1, 4).join(' ')  
}

const getBeginTime = (type) => {
  let isOther = type !== 'reading' && type !== 'essay' && type !== 'index'
  let beginTime = isOther ? OTHER_BEGIN_TIME : VOL_AND_READING_BEGIN_TIME
  return new Date(beginTime)
}

const getDateList = (type) => {
  let begin = getBeginTime(type)
  let beginYear = begin.getFullYear()
  let beginMonth = begin.getMonth()

  let now = new Date()
  let nowYear = now.getFullYear()
  let nowMonth = now.getMonth()

  let dateList = [];
  for (let y = nowYear; y >= beginYear; y--) {
    for(let m = 11; m >= 0; m--) {
      dateList.push({
        title: MONTH_MAP[m] + y,
        value: y + '-' + (m + 1)
      })
    }
  }
  
  dateList = dateList.slice(11 - nowMonth, dateList.length - beginMonth)
  return dateList
}

module.exports = {
  getDateList,
  filterContent,
  formatMakettime
}
