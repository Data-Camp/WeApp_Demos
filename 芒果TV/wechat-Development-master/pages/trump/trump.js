/*
* @Author: mark
* @Date:   2016-10-09 10:54:24
* @Last Modified by:   mark
* @Last Modified time: 2016-11-25 15:35:09
*/

// mgtv API 操作
import newData from '../../Datas/mgtv.js';

Page({

    data:{
        title:'王牌强档',
        loading: false,
        loadtxt: '正在加载',
        bg: '',
        trumpArr: []
    },

    onLoad: function(params){

        let _this = this;
        let param = {
            API_URL: 'http://mobile.api.hunantv.com/channel/getWPDetail',
            data:{}
        };

        newData.result(param).then( data => {

            let datas = data.data.data;

            this.setData({
                trumpArr: data.data.data,
                bg : datas[0].picUrl
            })

        }).catch(e => {

            this.setData({
                loadtxt: '数据加载异常',
                loading: false
            })
            
        })

    },

    changeSwiper: function(e){

        let _this = this;
        let index = e.detail.current;

        this.setData({
            bg : _this.data.trumpArr[index].picUrl
        })
    }

})