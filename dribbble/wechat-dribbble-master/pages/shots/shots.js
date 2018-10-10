
const { request, api, filterHtml, dateFormat, addCommas } = require('../../utils/util.js');

var app = getApp();

Page({
    data: {
        shot: {},
        comments: [],
        attachments: [],
        multiShots: [],
        isShowLoading: true,
        windowWidth: '',
        changeShotStatus: false  // 用于切换 shot 后返回顶部
    },

    onReady: function() {
        wx.setNavigationBarTitle({
            title: this.data.shot.title || 'Dribbble'
        });
    },
    getComments: function() {
        request({
            url: api.getShotComments(this.data.shot.id),
        })
        .then((res) => {
            console.log('comments: ',res);
            let datas = [];
            for ( d of res.data ){
                d.body = filterHtml(d.body);
                d.created_at = dateFormat(d.created_at.replace(/T|Z/g," "), 'eM d, yyyy H:mm et', true)
                datas.push(d);
            }
            this.setData({
                isShowLoading: false,
                comments: datas,
            })
        })
    },
    getAttachments: function(id) {
        request({
            url: api.getShotAttachments(id)
        })
        .then((res) => {
            console.log('attachments:', res);
            this.setData({
                attachments: res.data
            })
        })
    },
    getUserShots: function(user_id, shot_id) {
        request({
            url: api.getUserShots(user_id)
        })
        .then((res) => {
            console.log('user shots:', res);
            let { data } = res;
            if (data.length > 0) {
                let datas = [];
                let length = data.length;
                
                // 获取4个，且不要跟当前重复
                for (let i = 0; i<length; i++)  {
                    if (data[i].id != shot_id && datas.length !== 4){
                        datas.push(data[i]);
                    }
                };
                this.setData({
                    multiShots: datas
                });
            }
        })
    },
    // 切换 shot
    changeShot: function(e) {
        let { id } = e.currentTarget.dataset;
        let { author } = this.data;
        let shot = this.data.multiShots[id];
        let obj = {};

        shot.image = shot.images.hidpi || shot.images.normal;
        shot.description = filterHtml(shot.description);
        shot.created_at = dateFormat(shot.created_at.replace(/T|Z/g," "), 'eM d, yyyy')
        shot.likes_count = addCommas(shot.likes_count);
        shot.views_count = addCommas(shot.views_count);
        shot.buckets_count = addCommas(shot.buckets_count);

        obj['shot'] = shot;
        obj['comments'] = []; // 清空
        obj['multiShots'] = []; // 清空
        obj['isShowLoading'] = true;
        obj['changeShotStatus'] = true;

        if (shot.attachments_count > 0) {
            this.getAttachments(shot.id);
        } else {
            obj['attachments'] = []; // 清空
        }

        this.setData(obj);
        // 获取新的数据
        this.getComments();
        this.getUserShots(author.id, shot.id);

        // 返回顶部 -_-||
        setTimeout(() => {
            this.setData({
                changeShotStatus: false
            })
        },100)

        wx.setNavigationBarTitle({
            title: shot.title || 'Dribbble'
        });
    },
    getShot: function(id) {
        console.log('[get a shot]: ',id)
        request({
            url: api.getShot(id)
        })
        .then(res => {
            let { data } = res;
            data.created_at = dateFormat((data.created_at || '').replace(/T|Z/g," "), 'eM d, yyyy');
            data.description = filterHtml(data.description);
            data.likes_count = addCommas(data.likes_count);
            data.views_count = addCommas(data.views_count);
            data.buckets_count = addCommas(data.buckets_count);

            if (data.attachments_count > 0) {
                this.getAttachments(data.id);
            }

            this.setData({
                shot: data
            })
        })
    },
    onLoad: function(options) {
        console.log(options);
        if (options.is_request) {
            this.getShot(options.id);
        } else {
            options.created_at = dateFormat((options.created_at || '').replace(/T|Z/g," "), 'eM d, yyyy')
        }

        this.setData({
            author: {
                id: options.user_id,
                name: options.user_name,
                avatar_url: options.user_avatar
            },
            shot: options
        })

        // 获取数据
        this.getComments();
        if (options.attachments_count > 0) {
            this.getAttachments(options.id);
        }
        this.getUserShots(options.user_id, options.id);

        wx.getSystemInfo({
            success: (res) => {
                this.setData({
                    windowWidth: res.windowWidth
                })
            }
        });

    }
})