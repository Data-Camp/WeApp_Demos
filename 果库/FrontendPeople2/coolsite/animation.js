/*动画源*/
var _aniInstance;
// var _Animation;
var _tar;
//注册动画
var resig = function(tar,data){
    _tar = tar;
    addDataAni(data,_tar.data);
    coolsite360._coolsite.register(_tar);
    play(data);
}
var play = function(data){
    for(var i=0;i<data.length;i++){
        switch (data[i].data.type){
            case 1 : _doTranslate(data[i]);break;  //飞入
            case 3 : _preAni(data[i]); break;  //淡入
            case 5 : _preAni(data[i],{sc:0,op:1});break;  //放大出现
            case 10 : _preAni(data[i]); break; //缩小出现
            default : break;
        }
        coolsite360.globalAni[data[i].id] = data[i];
    }
    coolsite360.Timeline.parse(data);
}
/*
*添加data中的animation
*/
var addDataAni = function(data,aniData){
    // aniData
    for(var i=0;i<data.length;i++){
        var el = data[i].element_id;
        //data加animation
        if(aniData[el]){ 
            if(!aniData[el].animation) aniData[el].animation = {};
            if(!aniData[el].style) aniData[el].style = "";
        }else{
            aniData[el] = {
                animation : {},
                style:""
            }
        }
    }
    _tar.setData(aniData)
}
//是否是完整的动画类型
var _isAnimate = function(_ani){
    if(_ani.data && _ani.element_id) return true;
    return false;
}
var _isEmpty = function(obj){
    for(var key in obj)
        return !1;  
    return !0;
}
//飞入动画用
var _doTranslate = function(opt){ 
    var el = opt.element_id;
    if(!el) return;
    if(opt.data.d && opt.data.d.dl === +opt.data.d.dl && opt.data.d.dt == 1){ //从屏幕内飞入
        var length = opt.data.d.dl+"px";
    }else{
        var length = 1000+"px";
    }
    var _style ;
    switch (opt.data.d.di){
        case 0 : _style = {transform:"translateY(-"+length+")"};break;
        case 1 : _style = {transform:"translateX(-"+length+")"};break;
        case 2 : _style = {transform:"translateY("+length+")"};break;
        case 3 : _style = {transform:"translateX("+length+")"};break;
        default : break;
    }
    coolsite360.$(el).addStyle(_style);
}
//初始化动画
var _initAnimate = function(_ani){
    if(!_isAnimate(_ani)) return false;
    if(!_isEmpty(_ani.data) && !_isEmpty(_ani.data.t)){
        var _ease = _ani.data.t.es;
        switch (_ease){
            case 0 : _ease = 'linear'; break;  //匀速
            case 1 : _ease = 'ease'; break;  //power0.easein
            case 4 : _ease = 'ease-in'; break;
            case 5 : _ease = 'ease-in-out'; break;
            case 6 : _ease = 'ease-out'; break;
            case 43 : _ease = 'step-start'; break;
            case 49 : _ease = 'step-end'; break;
            default: _ease = 'linear';break;
        }
        var animation = wx.createAnimation({
            transformOrigin:"50% 50%",
            duration: _ani.data.t.du*1000,
            timingFunction:_ease,
            delay:_ani.data.t.de*1000
        });
        return animation;
    }else return false;
}
//动画处理
var _parse = function(detail,_ani){
    if(!_isEmpty(detail.data)){
        var _type =  detail.data.type;
        switch (_type){
            case 1 : _ani = flyInAni(_ani,detail);break;
            case 2 : _ani = flyOutAni(_ani,detail.data.d);break;
            case 3 : _ani = fadeInAni(_ani,detail);break;
            case 4 : _ani = fadeOutAni(_ani);break;
            case 5 : _ani = magnifyAnig(_ani,detail);break;
            case 6 : _ani = minifyAni(_ani,detail.data.d);break;
            case 7 : _ani = rotateAni(_ani,detail.data.d);break;
            case 8 : _ani = opacityAni(_ani,detail.data.d);break;
            case 9 : _ani = scaleAni(_ani,detail.data.d);break;
            case 10 : _ani = scaleInAni(_ani,detail);break;
            default:break;
        }
        return _ani;
    }else return false;
}
/*动画执行*/
//flyIn 
var flyInAni = function(_Ani,dir){
    if(!dir || !_Ani ||!dir.element_id) return;
    //路径类型dt  路径长度 dl。默认从屏幕外 dt=0
    if(dir.data.d.dl === +dir.data.d.dl && dir.data.d.dt == 1){ //从屏幕内飞入
        var length = dir.data.d.dl+"px";
    }else{
        var length = 0+"px";
    }
    var el = dir.element_id;
    switch(dir.data.d.di){  //problem
        case 0 : _Ani.translateY("-"+length);break; //top
        case 1 : _Ani.translateX(length);break; //right
        case 2 : _Ani.translateY(length);break; //bottom
        case 3 : _Ani.translateX("-"+length);break; //left
        default: break;
    }
    return _Ani;
}
//飞出
var flyOutAni = function(_Ani,dir){
    if(!dir || !_Ani) return;
    if(dir.dl === +dir.dl && dir.dt == 1){ //飞到屏幕内
        var length = dir.dl+"px";
        var isInner = true;
    }else var length = 1000+"px";   //测试一下是否可以用100%
    switch (dir.di){
        case 0 : _Ani.translateY(length);break;  //bottom
        case 1 : _Ani.translateX('-'+length);break;      //left
        case 2 : _Ani.translateY('-'+length);break;      //top
        case 3 : _Ani.translateX(length);break;  //right 
        default : break;
    }
    if(isInner) _Ani.opacity(0);
    return _Ani;
}
//fadeIn 淡入 
var fadeInAni = function(_Ani,dir){
    if(!_Ani) return;
    _Ani.opacity(1);
    return _Ani;
}

//fadeOut 淡出
var fadeOutAni = function(_Ani){
    _Ani.opacity(0);
    return _Ani;
}

//magnify  放大出现
var magnifyAnig = function(_Ani,dir){
    if(!_Ani) return;
    _Ani.scale(1,1).opacity(1);
    return _Ani;    
} 

//minify 缩小消失
var minifyAni = function(_Ani,dir){
    _Ani.scale(0,0);
    return _Ani;
}

//rotate 旋转
var rotateAni = function(_Ani,dir){
    if(!dir) return;
    switch (dir.ax){
        case 0 : dir.ax = "Z";break
        case 1 : dir.ax = "X";break;
        case 2 : dir.ax = "Y";break;
        default: dir.ax = "Z";break;
    }
    _Ani['rotate'+dir.ax](dir.deg);
    return _Ani;
}

//opacity 透明度
var opacityAni = function(_Ani,dir){
    if(!dir || dir.op == 'undefined') return;
    var _op = parseFloat(dir.op*0.010);
    if(_op === +_op){
        _Ani.opacity(_op);
        return _Ani;
    }
}   

//比例
var scaleAni = function(_Ani,dir){
    if(!dir || dir.sc == 'undefined') return;
    _Ani.scale(dir.sc,dir.sc);
    return _Ani;
}

//缩小出现
var scaleInAni = function(_Ani,dir){
    if(!_Ani) return;
    var el = dir.element_id;
    _Ani.scale(1,1).opacity(1);
    return _Ani;
}
//预处理动画 ,主要处理scale和opacity
var _preAni = function(opt,detail){
    var el = opt.element_id;
    if(!el) return;
    if(opt.data.d && opt.data.d.sc === +opt.data.d.sc || detail && detail.sc === +detail.sc){ 
        var _sc = opt.data.d && opt.data.d.sc || detail && detail.sc;
    }
    else var _sc = 1;
    if(opt.data.d && opt.data.d.op === +opt.data.d.op || detail && detail.op === +detail.op){ 
        var _op = opt.data.d && opt.data.d.op || detail && detail.op;
    }
    else var _op = 0;
    coolsite360.$(el).addStyle({opacity:_op,transform:"scale("+_sc+")"});
}



module.exports ={
    register : resig,
    initAnimate:_initAnimate,
    parse:_parse
}