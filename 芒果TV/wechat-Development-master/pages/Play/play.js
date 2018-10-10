/*
* @Author: mark
* @Date:   2016-10-10 15:29:40
* @Last Modified by:   mark
* @Last Modified time: 2016-10-10 17:15:55
*/

Page({

    data:{
        name: '的视频暂时没有'
    },

    onLoad: function(params){

        let name = params.name || this.data.name;

        this.setData({
            name: name
        })

    },

    onReady: function(){

        wx.setNavigationBarTitle({
            title:this.data.name
        })

    },

    videoErrorCallback: function(e){
        console.log(e);
    }
})