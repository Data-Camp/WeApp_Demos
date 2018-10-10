var _onLoad = function(data){
    //在 register 初始化的时候执行
}

var _onShow = function(_data){
    // 在页面onShow的时候执行
    for(var key in _data){
        if(_data[key].part_data && _data[key].part_data.length!=0){
            // if(!_data[key].part_data.isWait)
            _drawCanvas(_data[key],key);
        }
    }
}
var _drawCanvas = function(data,el,isAction){
    data = data.part_data;
    data.progres = 70;

    var context = wx.createContext();
    var frameDuration=  17;
    var border = parseInt(data.borderWidth);
    var r = Math.min(parseFloat(data.width)-border,parseFloat(data.height)-border)/2;
    var duration = data.duration;
    var center = {
        x:parseFloat(data.width)/2,
        y:parseFloat(data.height)/2
    }

    var rate = parseFloat(data.progress/data.max);
    var startTime = Date.now();
    if(data.isWait && !isAction){
        context.beginPath();
        context.setStrokeStyle(data.backgroundColor);
        context.setLineWidth(border);
        context.arc(center.x,center.y,r,0,2*Math.PI);
        context.stroke();
        context.closePath();
        wx.drawCanvas({
            canvasId: el,
            actions: context.getActions() // 获取绘图动作数组
        })
    }
    // console.log("this is"+requestAnimationFrame);
    // if(requestAnimationFrame){
    else{
        var timer = setInterval(function(){
        var per = Math.min(1.0, (Date.now() - startTime) / duration); //进度
        if(per>=1){
            clearInterval(timer);
            _public(per);
        } 
        else _public(per);
    },frameDuration);
        return;
    }
    // }
    // else var animateId = requestAnimationFrame(draw);

    function draw(time){
        var per = Math.min(1.0, (Date.now() - startTime) / duration); //进度
        _public(per);

        if(per>=1){
            cancelAnimationFrame(animateId);
        }else{
            requestAnimationFrame(draw);
        }
        
    }
    function _public(per){
        context.beginPath();
        context.setStrokeStyle(data.backgroundColor);
        context.setLineWidth(border);
        context.arc(center.x,center.y,r,0,2*Math.PI);
        context.stroke();
        context.closePath();

        context.setStrokeStyle(data.borderColor);
        context.setLineWidth(border);
        context.setLineCap('round');
        context.setLineJoin('round');
        context.beginPath();

        if(per>=1 && data.progress == data.max){
            context.setStrokeStyle(data.borderColor);
            context.setLineWidth(border);
            context.arc(center.x,center.y,r,0,2*Math.PI);
            context.stroke();
            context.closePath();    
        }else{
            context.arc(center.x,center.y,r,1.5*Math.PI,(rate*per*2)*Math.PI);
            console.log((rate*per*2)*Math.PI);
            context.stroke();
            context.closePath();
        }

        if(data.showProgress){
            context.setFillStyle(data.fontColor);
            context.setFontSize(data.fontSize);
            var d = Math.ceil(data.progress*per); 
            var fontDigit = d.toString().length;
            var fontSize = data.fontSize;
            var centerx_patch = fontSize * fontDigit/4 + (fontSize/8)/2;
            var centery_patch = (fontSize/2)/1.25;
            context.fillText(d, center.x-centerx_patch, center.y+centery_patch);    
        }
        
        wx.drawCanvas({
            canvasId: el,
            actions: context.getActions() // 获取绘图动作数组
        })
    }
} 
module.exports ={
    onLoad:_onLoad,
    onShow:_onShow,
    draw:_drawCanvas
}