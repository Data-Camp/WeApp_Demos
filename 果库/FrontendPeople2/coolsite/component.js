/*注册组件*/
var _tar;
var app;


var components = {};
components['canvas'] = require('./components/canvas/canvas.js');

function register(tar){
     
    // _tar = tar;
    // setData(data,_tar.data)
    // app = getApp();

    // coolsite360._coolsite.register(_tar);
    for(var i in components){
        components[i].onLoad(tar.data);
    }
    // eventBind(data);
}

function onShow(tar){
    for(var i in components){
        components[i].onShow(tar.data);
    }
}
// function setData(data,defData){
//     /*
//         符合组件数据结构
//         tab_dadads:{
//             0:{
//                 class:"vux-tab-selected",
//                 style:""
//             }
//         }
//     */

//     var ret = {};
//     for(var i=0;i<data.length;i++){
//         var item = data[i];
//         var keys=Object.keys(item);
//         var key = keys[0];
        
        
//         var comData =  Object.assign({},item[key],defData);
       
//         var types = keys[0].split('_');
        
//         if(types.length>1){
//             if(components[types[0]]){
//                 comData = components[types[0]].filterData(comData);
//                 components[types[0]].filterEvents(_tar,keys[0]);

//             }
//         }
//         ret[key] =comData
//     }
   

//     _tar.setData(ret);
    
// }

module.exports ={
    register:register,
    onShow:onShow,
    drawCanvasCir :components['canvas'].draw
}