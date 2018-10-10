var _tar ;
 //当前的动画队列
var timeline = function(Anis){ 
    var Queue = [];  //执行队列
    var animations = [];
    for(var  key in Anis){
        animations.push(key);   //动画id
    }
    var arr = [];  //同时执行的动画
        arr[0] = animations[0];
    for(var i = 1;i<animations.length;i++){
        if(!animations[i]) break;
        var _type = Anis[animations[i]].aniTp;
        if(_type == 2){  //同时播放
            arr.push(animations[i]);
        }else{  //之后播放
            Queue.push(arr);
            arr = [];
            arr.push(animations[i]);
        }
    }
    Queue.push(arr); //最后一组
    // 设置播放顺序 加delay
    var delay = 0;
    for(var j = 0;j<Queue.length; j++){
        var _st = Queue[j];  //同时播放的动画
        var _stDur = [];
        for(var k = 0;k< Queue[j].length;k++){
            //设置delay
            Anis[Queue[j][k]].ani.actions[0].option.transition.delay += delay;
            var _dur = Anis[Queue[j][k]].ani.actions[0].option.transition.duration;
            _stDur.push(_dur);
        }
        var maxDur = Math.max.apply(null, _stDur);  //最大的长度
        delay += maxDur;
    }
    //开始播放
    var newAnimations = Queue.join(",").split(",");
    for(var m =0;m<newAnimations.length ;m++){
         var _ani = Anis[newAnimations[m]].ani,
             _aniEl = Anis[newAnimations[m]].aniEl;
        coolsite360.$(_aniEl).setAnimation(_ani);
    }
}
 //isAction :是否是触发器里的timeline
var parse = function(opt,isAction){ 
    var autoAni = [],actAni = [];
    if(opt.length == 0) return;
    for(var i=0;i<opt.length;i++){
        if(opt[i].data && opt[i].data.t && opt[i].data.t.wa != 1 && !isAction){  //自动播放
            autoAni.push(opt[i]);
        }else{  //触发器
            actAni.push(opt[i]);
        }
    }
    if(isAction) recombine(actAni,isAction);
    else recombine(autoAni,isAction);
}
//重新组合一下时间轴
var recombine = function(Ais,isAction){   
    var currentAni = {};   //当前时间轴
    if(Ais.length == 0) return;
    var detail,addedAni = [];  //已经加入过动画
    for(var m=0;m<Ais.length;m++){  //animateId 
        if(isAction){
            var _actAni = coolsite360.globalAni[Ais[m]];
            // coolsite360.Ani.checkType(_actAni,true);
        }
        else var _actAni = Ais[m];
        var el = _actAni["element_id"];
        if(addedAni.indexOf(_actAni.id)==-1){
            var _ani = coolsite360.Ani.initAnimate(_actAni);
            if(_ani){
                var _aniDetail = coolsite360.Ani.parse(_actAni,_ani);  //未export,未step
                //找出后续动画是否有针对相同元素的
                for(var n =1;n<Ais.length;n++){
                    if(isAction){
                        var innerAct = coolsite360.globalAni[Ais[n]];
                        // coolsite360.Ani.checkType(innerAct,true);
                    }
                    else var innerAct = Ais[n];
                    var _el = innerAct["element_id"];
                    if(el == _el && _actAni.id!= innerAct.id){
                        if(innerAct.data.t.st ==2){  //同时
                            _aniDetail = coolsite360.Ani.parse(innerAct,_ani);
                        }else{  //之后触发的
                            detail = _aniDetail.step();
                            _aniDetail = coolsite360.Ani.parse(innerAct,_ani);
                            var _ease = judegeEase(innerAct.data.t.es);
                            if(_aniDetail) detail = _aniDetail.step({delay:0,duration:innerAct.data.t.du*1000,timingFunction:_ease}); 
                        }
                        addedAni.push(innerAct.id);
                    }else {}  // 不同的元素
                }
                if(_aniDetail && (_aniDetail.currentStepAnimates.length!=0 || _aniDetail.currentTransform.length !=0)) detail = _aniDetail.step();
            }
            currentAni[_actAni.id] = {
                ani : detail.export(),
                aniEl : el ,
                aniRe : _actAni.data.t.rp,   //是否重复播放
                aniTp : _actAni.data.t.st    //播放方式
            }
        }
    }
    timeline(currentAni);
}
//重复时间轴
var repeat = function(opt){ 
    

}
var judegeEase = function(_type){
    var _ease ;
    switch (_type){
            case 0 : _ease = 'linear'; break;
            case 1 : _ease = 'ease'; break;
            case 4 : _ease = 'ease-in'; break;
            case 5 : _ease = 'ease-in-out'; break;
            case 6 : _ease = 'ease-out'; break;
            case 43 : _ease = 'step-start'; break;
            case 49 : _ease = 'step-end'; break;
            default: _ease = 'linear';break;
        }
    return _ease;
}


module.exports ={
    timeline : timeline,
    parse: parse
}