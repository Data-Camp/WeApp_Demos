var typelist = require('../../../utils/searchtypelist.js');
var bsurl=require('../../../utils/bsurl.js');
Page({
    data: {
        tab: { tab: typelist[0].type, index: 0 },
        value: "",
        tabs: typelist,
        recent: wx.getStorageSync("recent") || [],
        loading: false,
        prevalue: ""
    },
    onLoad: function (options) {

    },
    inputext: function (e) {
        var name = e.detail.value;
        this.setData({ value: name });
    },
    search: function (name) {
        if (!name || (name == this.data.prevalue)) return;
        var index = this.data.tab.index;
        var tl = typelist;
       
        this.setData({
            tabs: tl,
            prevalue: name,
            value: name
        });
         var curtab =this.data.tabs[index]
        var that = this;
         console.log(typelist)
        tl=this.data.tabs;
        this.httpsearch(name, curtab.offset, this.data.tab.tab, function (res) {
            curtab.relist = res;
            curtab.loading = true;
            var resultarry = res.songs || res.artists || res.albums || res.playlists || res.mvs || res.djprograms || res.userprofiles || []
            curtab.offset = resultarry.length?resultarry.length:0;
            var size = res.songCount || res.artistCount || res.albumCount ||res.playlistCount || res.mvCount || res.djprogramCount || res.userprofileCount;
            size=size?size:0;
            curtab.none = curtab.offset >= size ? true : false;
             tl[index] = curtab;
            var recent = that.data.recent;
            var curname = recent.findIndex(function (e) { return e == name });
            if (curname > -1) {
                recent.splice(curname, 1)
            }
            recent.unshift(name);
            wx.setStorageSync('recent', recent)
            that.setData({
                tabs: tl,
                loading: true,
                recent: recent,
                prevalue: name
            });
           
        })
    },
    searhFrecent: function (e) {
        this.search(e.currentTarget.dataset.value)
    },
    searhFinput: function (e) {
        this.search(e.detail.value.name)
    },
    loadmore: function (e) {
        var tl = this.data.tabs,
            that = this;
        var curtab = tl[this.data.tab.index];
        if(curtab.none){return;}
        console.log(curtab.more)
        curtab.loading = false;
        tl[this.data.tab.index] = curtab
        this.setData({
            tabs: tl
        })
        this.httpsearch(this.data.prevalue, curtab.offset, this.data.tab.tab, function (res) {
            curtab.loading = true;
            var resultarry = res.songs || res.artists || res.albums || res.playlists || res.mvs || res.djprograms || res.userprofiles || [];
            var size = res.songCount || res.artistCount || res.albumCount || res.playlistCount || res.mvCount || res.djprogramCount || res.userprofileCount;
            size=size?size:0;
            var length = resultarry.length ? resultarry.length : 0;
            curtab.offset = curtab.offset + length;
            curtab.none = curtab.offset >= size ? true : false;
            curtab.relist.songs = curtab.relist.songs ? curtab.relist.songs.concat(resultarry) : null;
            curtab.relist.artists = curtab.relist.artists ? curtab.relist.artists.concat(resultarry) : null;
            curtab.relist.albums = curtab.relist.albums ? curtab.relist.albums.concat(resultarry) : null;
            curtab.relist.playlists = curtab.relist.playlists ? curtab.relist.playlists.concat(resultarry) : null;
            curtab.relist.mvs = curtab.relist.mvs ? curtab.relist.mvs.concat(resultarry) : null;
            curtab.relist.djprograms = curtab.relist.djprograms ? curtab.relist.djprograms.concat(resultarry) : null;
            curtab.relist.userprofiles = curtab.relist.userprofiles ? curtab.relist.userprofiles.concat(resultarry) : null;
            tl[that.data.tab.index] = curtab
            that.setData({
                tabs: tl
            })
        })
    },
    httpsearch: function (name, offset, type, cb) {
        wx.request({
            url:bsurl+'search',
            data: {
                name: name,
                offset: offset,
                limit: 20,
                type: type
            },
            method: 'GET',
            success: function (res) {
                cb && cb(res.data.result)
            }
        })
    },
    tabtype: function (e) {
        var index = e.currentTarget.dataset.index;
        var curtab = this.data.tabs[index];
        var type = e.currentTarget.dataset.tab;
        var that = this;
        if (!curtab.loading) {
            this.httpsearch(this.data.prevalue, curtab.offset, type, function (res) {
                curtab.relist = res;
                curtab.loading = true;
                var resultarry = res.songs || res.artists || res.albums || res.playlists || res.mvs || res.djprograms || res.userprofiles || [];
                curtab.offset = resultarry.length?resultarry.length:0;
                var size = res.songCount || res.artistCount || res.albumCount || res.playlistCount || res.mvCount || res.djprogramCount || res.userprofileCount;
                size=size?size:0;
                curtab.none = curtab.offset >= size ? true : false;
                console.log(size,curtab.offset)
                var tl = that.data.tabs;
                tl[index] = curtab;
                that.setData({
                    tabs: tl
                })
            })
        }
        this.setData({
            tab: {
                tab: type,
                index: index
            }
        })
    },
    del_research: function (e) {
        //删除搜索历史
        var index = e.currentTarget.dataset.index;
        this.data.recent.splice(index, 1);
        this.setData({
            recent: this.data.recent
        })
        wx.setStorageSync('recent', this.data.recent)
    }

})