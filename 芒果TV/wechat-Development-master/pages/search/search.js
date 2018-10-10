/*
* @Author: mark
* @Date:   2016-10-08 12:25:29
* @Last Modified by:   mark
* @Last Modified time: 2016-11-25 15:35:19
*/

// mgtv API 操作
import newData from '../../Datas/mgtv.js';

Page({
    data:{
        ranking:[],
        loading: false,
        loadtxt: '正在加载',
        value: '搜索电影/电视剧/综艺...'
    },

    onLoad: function(params){

        let _this = this;
        let arrSection = ['综艺热榜','电视剧热榜']
        let param = {
            API_URL: 'http://m.api.hunantv.com/search/top',
            data:{},
        };

        newData.result(param).then( data => {

            let datas = data.data.data;
            let lists = [];
            let newList = [];
            for (let i in datas){
           
                lists.push(datas[i])

            }

            console.log(lists);

            for (let i = 0; i < lists.length-2; i++) {

                let obj = {};
                obj.rankArr = [];
                obj.bigTitle = lists[i][0].title;
                obj.bigImgea = lists[i][0].image;
                obj.bigSubtitle = lists[i][0].subtitle;
                obj.section = arrSection[i];
                for (let j = 1; j < lists[i].length-1; j++) {
                    obj.rankArr.push(lists[i][j])
                }

                newList.push(obj);
                
            }

            console.log(newList);

            this.setData({

                loadtxt: '来了来了',
                loading: true,
                ranking: Object.assign([], newList)

            })

        }).catch(e => {

            this.setData({
                loadtxt: '数据加载异常',
                loading: false
            })

            console.error(e);
        })

    },

    deleteTxt: function(e){
        
        this.setData({
            value:'搜索电影/电视剧/综艺...'
        })

    },

    onFouse: function(e){

        this.setData({
            value:''
        })  

    },

    onBlue: function(){
        this.setData({
            value:'搜索电影/电视剧/综艺...'
        }) 
    }




})