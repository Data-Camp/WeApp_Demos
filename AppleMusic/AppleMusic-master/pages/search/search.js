var pageObject = {
        data:{

        },
        search:function(e){
            var that = this
            console.log('搜索')
            wx.request({
                url: 'http://c.y.qq.com/splcloud/fcgi-bin/smartbox_new.fcg',
                data: {
                    is_xml:0,
                    format:'jsonp',
                    key:e.detail.value,
                    g_tk:5381,
                    jsonpCallback:'SmartboxKeysCallbackmod_top_search463',
                    loginUin:0,
                    hostUin:0,
                    format:'jsonp',
                    inCharset:'utf8',
                    outCharset:'utf-8',
                    notice:0,
                    platform:'yqq',
                    needNewCode:0,
                },
                header: {
                    'Content-Type': 'text/html;charset=utf-8'
                },
                success: function(res) {
                    // var pattern =new RegExp("\\((.*?)\\)","igm");
                    that.setData({
                        searchRes:JSON.parse(res.data.substring(38,res.data.length-1)).data
                    })
                }
            })
        },
        play: function (event) {
            var num=event.currentTarget.dataset.num
            var res=this.data.searchRes.song.itemlist[num]
            var appInstance = getApp()
            appInstance.globalData.playing = res
            // that.setData({
            //     playBar:res,
            //     playingSongsNum:event.currentTarget.dataset.num
            // })
            console.log('http://stream.qqmusic.tc.qq.com/'+res.id+'.mp3')
            wx.playBackgroundAudio({
                dataUrl: 'http://stream.qqmusic.tc.qq.com/'+res.id+'.mp3',
                title: res.name,
                singer: res.singer,
                coverImgUrl: 'http://y.gtimg.cn/music/photo_new/T002R90x90M000003RMaRI1iFoYd.jpg',
                complete: function (res) {
                    
                }
            })
        }
}

Page(pageObject)