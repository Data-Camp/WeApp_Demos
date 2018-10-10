//index.js

import {Promise} from '../../utils/util';

var app = getApp()

// 使用腾讯地图API(若使用需申请key) 或者更换其他相应API
const API = 'http://apis.map.qq.com/ws/district/v1/getchildren?key=PEFBZ-BJLWX-V724Y-TQABDJ-JVBQT'

Page({
    data: {
        isShowRegion: true,
        provinceData: [],
        cityData: [],
        region: [0, 0],
        regionName: ''
    },
    onLoad: function () {
        const me = this;
        Promise(wx.request, {
            url: API,
            method: 'GET'
        })
        .then(res => {
            if (+res.statusCode == 200) {
                let provinceList = res.data.result[0];
                me.setData({
                    provinceData: provinceList,
                });

                let firstProvince = provinceList[0];

                return Promise(wx.request, {
                    url: API + '&id=' + firstProvince.id,
                    method: 'GET'
                })
            }
            else {
                me.setData({provinceData: []});
            }
        })
        .catch(err => {
            me.setData({provinceData: []});
        })
        .then(res => {
            me.setData({
                cityData: res.data.result[0]
            });
        })
        .catch(err => {
            me.setData({
                cityData: []
            });
        })
    },
    tapMasker: function () {
        this.setData({isShowRegion: false});
    },
    preventMaskerMove: function (e) {
        e.preventDefault();
    },
    toggleShowRegion: function (e) {
        this.setData({isShowRegion: true});
    },
    cancelRegion: function (e) {
        this.setData({isShowRegion: false});
    },
    confirmRegion: function (e) {
        let {region, provinceData, cityData} = this.data;
        let regionName = provinceData[region[0]].name + '-' + cityData[region[1]].name;

        this.setData({
            regionName: regionName,
            isShowRegion: false
        });
    },
    bindRegionChange: function (e) {
        let me = this;
        let val = e.detail.value;
        let provinceIndex = val[0];
        let {provinceData} = me.data;

        Promise(wx.request, {
            url: API + '&id=' + provinceData[provinceIndex].id,
            method: 'GET'
        })
        .then(res => {
            if (+res.statusCode === 200) {
                me.setData({
                    cityData: res.data.result[0],
                });
            }
            else {
                //wx.showToast({
                    //title: '获取数据出错，请重试',
                    //icon: 'loading',
                    //duration: 2000
                //});
                me.setData({
                    cityData: []
                });
            }
        })
        .catch(err => {
            //wx.showToast({
                //title: '获取数据出错，请重试',
                //icon: 'loading',
                //duration: 2000
            //});
            me.setData({
                cityData: []
            });
        });
    }
})
