/*
 * 日期格式化
 * 使用:
 * dateFormat(date, 'yyyy-MM-dd HH:mm')    //2015-10-21 16:38
 * dateFormat(date, 'MM-dd')   			 //10-21
 * dateFormat(date, 'w')   				 //三    //星期三
 * dateFormat(date, 'eM d,yyyy')   		 //Oct 10,2015
*/
	var _$encode = function(_map,_content){
	    _content = ''+_content;
	    if (!_map||!_content){
	        return _content||'';
	    }
	    return _content.replace(_map.r,function($1){
	        var _result = _map[!_map.i?$1.toLowerCase():$1];
	        return _result!=null?_result:$1;
	    });
	};
	var dateFormat = (function(){
	    var _map = {i:!0,r:/\byyyy|yy|MM|cM|eM|M|dd|d|HH|H|mm|ms|ss|m|s|w|ct|et\b/g},
	        _12cc = ['上午','下午'],
	        _12ec = ['AM','PM'],
	        _week = ['日','一','二','三','四','五','六'],
	        _cmon = ['一','二','三','四','五','六','七','八','九','十','十一','十二'],
	        _emon = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec'];
	    var _fmtnmb = function(_number){
	        _number = parseInt(_number)||0;
	        return (_number<10?'0':'')+_number;
	    };
	    var _fmtclc = function(_hour){
	        return _hour<12?0:1;
	    };
	    return function(_time,_format,_12time){
	        if (!_time||!_format)
	            return '';
	        _time = new Date(_time);
	        _map.yyyy = _time.getFullYear();
	        _map.yy   = (''+_map.yyyy).substr(2);
	        _map.M    = _time.getMonth()+1;
	        _map.MM   = _fmtnmb(_map.M);
	        _map.eM   = _emon[_map.M-1];
	        _map.cM   = _cmon[_map.M-1];
	        _map.d    = _time.getDate();
	        _map.dd   = _fmtnmb(_map.d);
	        _map.H    = _time.getHours();
	        _map.HH   = _fmtnmb(_map.H);
	        _map.m    = _time.getMinutes();
	        _map.mm   = _fmtnmb(_map.m);
	        _map.s    = _time.getSeconds();
	        _map.ss   = _fmtnmb(_map.s);
	        _map.ms   = _time.getMilliseconds();
	        _map.w    = _week[_time.getDay()];
	        var _cc   = _fmtclc(_map.H);
	        _map.ct   = _12cc[_cc];
	        _map.et   = _12ec[_cc];
	        if (!!_12time){
	            _map.H = _map.H%12;
	        }
	        return _$encode(_map,_format);
	    };
	})();
module.exports = dateFormat;