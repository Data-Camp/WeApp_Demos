function formatTime( date ) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  
  return [ year, month, day ].map( formatNumber ).join( '/' ) + ' ' + [ hour, minute, second ].map( formatNumber ).join( ':' )
}

function formatNumber( n ) {
  n = n.toString()
  return n[ 1 ] ? n : '0' + n
}

function isFunction( obj ) {
  return typeof obj === 'function';
}

function parseInteger(val) {
  if (isNaN(val))
    return 0;
  return parseInt(val);
}

module.exports = {
  formatTime: formatTime,
  isFunction: isFunction,
  parseInteger: parseInt
}