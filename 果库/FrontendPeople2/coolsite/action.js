/*注册事件的页面*/
var _tar;

var register = function(tar,data){
    _tar = tar;
    addDataClass(data,_tar.data)
    coolsite360._coolsite.register(_tar);
    eventBind(data);
}
//事件绑定
var eventBind = function(data){
    for(var i=0;i<data.length;i++){
        if(!data[i].iType){
            var _act = parseAct(data[i]);
            if(_act && _act._eventType != 'undefined')
            switch (_act._eventType){
                case 0 : event_tap(_act);break;
                default: break;
            }
        }
    }
}
/*
*添加data中的class
*/
var addDataClass = function(data,actData){  
    var _hasClass = [1, 2, 20, 21, 22, 23, 26];
    for(var i=0;i<data.length;i++){
        if(!data[i].iType){
            var el = data[i].element_id;
            if(data[i].data && _hasClass.indexOf(data[i].data.type)!=-1){
                if(actData[el]){  //合并原来的class
                    if(!actData[el].class) actData[el].class = '';
                }else{
                    actData[el] = {
                        class : ''
                    }
                }
            }
        }
    }
    // return actData;
    _tar.setData(actData);
}
//解析action数据 验证
var parseAct = function(_act){
    if(!_act.element_id) return;
    if(_act.data) var _detail = _act.data;
    if(!_detail || !_detail.args) return;

    return {
        _obj : _act.element_id, //事件触发元素  
        _eventType : _detail.type, //事件类型
        _execType : _detail.exec, //触发执行事件类型
        _execDetail : _detail.args //触发事件内容
    } 
}

//bind tap
var event_tap = function(_act){
    coolsite360.$(_act['_obj']).on('tap',function(e,data){
        _execType(_act,data);
    })
}

//touchstart
// touchmove
// touchcancel
// touchend
//longtap 

//事件执行
var _execType = function(_exec,data){
    var _type = _exec['_execType'];
    switch(_type){
        case 0 : _playAni(_exec);break;
        case 1 : _toggleShow(_exec,{type:0});break;
        case 2 : _toggleShow(_exec,{type:1});break;
        case 5 : _goTo(_exec);break;
        case 20 : _toggleShow(_exec,{type:2});break;
        case 21 : _toggleClass(_exec,{type:0});break;
        case 22 : _toggleClass(_exec,{type:1});break;
        case 23 : _toggleClass(_exec,{type:2});break;
        case 26 : _changeState(_exec);break;
        case 101 : _showActionSheets(_exec);break;
        case 102 : _showModal(_exec);break;
        case 103 : _showtoast(_exec);break;
        case 104 : _hidetoast();break;
        case 105 : _canvasCircleAni(_exec,data);break;
        default : break;
    }
}

/*action exec type*/
//播放动画
var _playAni = function(detail){
    var _aniIds = detail._execDetail.a_ids;
    if(_aniIds.length!=0){
        coolsite360.Timeline.parse(_aniIds,true);
    }
}
//跳转页面
var _goTo = function(detail){
    var _url = detail._execDetail.url;
    var _isRedirt = detail._execDetail.redirect;
    if(_url){
        if(_isRedirt)
            wx.redirectTo({
                url:_url
            })
        else wx.navigateTo({
                url:_url
            })
    }
}  
//显示/隐藏元素 class
var _toggleShow = function(detail,opt){
    var _arguments = detail._execDetail;
    if(_arguments.e_ids){
        for(var i =0;i<_arguments.e_ids.length;i++){
            if(opt && opt.type!='undefined'){
                switch (opt.type){
                    case 0 : coolsite360.$(_arguments.e_ids[i]).removeClass('c-initHide');break;
                    case 1 : coolsite360.$(_arguments.e_ids[i]).addClass('c-initHide');break;
                    case 2 : coolsite360.$(_arguments.e_ids[i]).toggleClass('c-initHide');break;
                }
            }
        }
    }
}
// 添加/移除class class必须
var _toggleClass = function(detail,opt){
    var _arguments = detail._execDetail;
    if(_arguments.e_ids && _arguments.cla){
        for(var i =0;i<_arguments.e_ids.length;i++){
            if(opt && opt.type!='undefined'){
                switch (opt.type){
                    case 0 : coolsite360.$(_arguments.e_ids[i]).addClass(_arguments.cla);break;
                    case 1 : coolsite360.$(_arguments.e_ids[i]).removeClass(_arguments.cla);break;
                    case 2 : coolsite360.$(_arguments.e_ids[i]).toggleClass(_arguments.cla);break;
                }
            }
        }
    }
} 
//切换状态  class必须
var _changeState = function(detail){
    var _arguments = detail._execDetail;
    if(_arguments.e_ids && _arguments.cla){
        var _class = detail._execDetail.cla;
        for(var i =0;i<_arguments.e_ids.length;i++){
            if(_class == 'c-state1'){
                coolsite360.$(_arguments.e_ids[i]).removeClass('c-state2','c-state3').addClass(_class);
            }
            else if(_class == 'c-state2'){
                coolsite360.$(_arguments.e_ids[i]).removeClass('c-state1','c-state3').addClass(_class);
            }
            else  {
                coolsite360.$(_arguments.e_ids[i]).removeClass('c-state1','c-state2').addClass(_class);
            }
        }
    }else{
        for(var m =0;m<_arguments.e_ids.length;m++){
            coolsite360.$(_arguments.e_ids[m]).removeClass('c-state1','c-state2','c-state3');
        }
    }
}
var _showActionSheets = function(detail){
    var _list = detail._execDetail.itemList;
    var _color = detail._execDetail.itemColor || "#000000";
    if(_list.length == 0) return;
    wx.showActionSheet({
        itemList: _list,
        itemColor: _color
    })
}

var _showModal = function(detail){
    var _arguments = detail._execDetail;
    wx.showModal({
        title: _arguments.title || '',
        content: _arguments.content || '',
        showCancel: _arguments.showCancel,
        cancelText: _arguments.cancelText || '取消',
        cancelColor:_arguments.cancelColor || "#000000",
        confirmText:_arguments.confirmText || '确定',
        confirmColor:_arguments.confirmColor || "#000000"
    })
}

var _showtoast = function(detail){
    var _arguments = detail._execDetail;
    if(!_arguments) return;
    wx.showToast({
        title: _arguments.title || '',
        icon: _arguments.icon || 'success',
        duration: parseInt(_arguments.duration) ||1500
    })
}
var _hidetoast = function(){
    wx.hideToast();
}

var _canvasCircleAni = function(detail,data){
    var _canvas = detail._execDetail.e_ids;
    for(var i =0;i<_canvas.length;i++){
       coolsite360.Component.drawCanvasCir(data[_canvas[i]],_canvas[i],true);
    }
}

module.exports ={
    register:register
}