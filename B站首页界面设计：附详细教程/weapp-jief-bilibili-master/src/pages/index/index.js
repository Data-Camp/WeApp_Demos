//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    /* 内容Body数据 */
    // 热门推荐
    hotList: [
      {
        coverImg: 'http://i2.hdslb.com/bfs/archive/1239539a2f262d933bca7c2c1e290139420ba76a.jpg_320x200.jpg',
        title: '【乐正绫】《华夏之章》【小旭PRO】【绛舞乱丸】',
        playNum: '4.7万',
        commentNum: '977',
        avid: 'av1'
      },
      {
        coverImg: 'http://i1.hdslb.com/bfs/archive/ecce95b426faf188e6c28f9d3a0bdc63c5a72bb3.jpg_320x200.jpg',
        title: '【斗图歌】装逼不如斗图',
        playNum: '4.7万',
        commentNum: '977',
        avid: 'av2'
      },
      {
        coverImg: 'http://i0.hdslb.com/bfs/archive/11bf8d41fffcad31976317760e301e2db64be8c8.png_320x200.png',
        title: '【胖胖球】【双子星】【獒龙】荒岛 - El transcurrir de las horas',
        playNum: '4.7万',
        commentNum: '977',
        avid: 'av3'
      },
      {
        coverImg: 'http://i0.hdslb.com/bfs/archive/e73a92b0ed615b4d6568888906d09f84d0835674.jpg_320x200.jpg',
        title: '撩人净土系列【红菱歌舞伎初音】极乐净土【大神犬PV付】MME配布',
        playNum: '4.7万',
        commentNum: '977',
        avid: 'av4'
      }
    ],
    // 正在直播
    liveList: [
      {
        coverImg: 'http://i0.hdslb.com/bfs/live/96025d17ed05961230a7d1401ca1fe3b79cc12db.jpg',
        avatarImg: 'http://i2.hdslb.com/bfs/face/c55b2eae13646925187514c6f19e19293294d0c5.jpg',
        name: '尤樱',
        desp: '你女朋友在直播你不来看看吗？',
        online: '877',
        avid: 'av5'
      },
      {
        coverImg: 'http://i0.hdslb.com/bfs/live/a1678768dd9c7023af7ab0f3de2a2df2c525e741.jpg',
        avatarImg: 'http://i0.hdslb.com/bfs/face/d1bec5ec111987537ecf3e7f43a8b3678ed3c5c3.jpg',
        name: '我是小麦伊哦哦',
        desp: '告别:我爱你们',
        online: '877',
        avid: 'av6'
      },
      {
        coverImg: 'http://i0.hdslb.com/bfs/live/89047f3faee35d0cb095d7dfb01ec4d3a8ec4434.jpg',
        avatarImg: 'http://i0.hdslb.com/bfs/face/1e31ac069058528e26b9be60b26d86c9c9a99f62.jpg',
        name: '坂本叔',
        desp: '【坂本】非洲黑客',
        online: '877',
        avid: 'av7'
      },
      {
        coverImg: 'http://i0.hdslb.com/bfs/live/24dbcc68325ff5fb3d235af97ad075dc5087733a.jpg',
        avatarImg: 'http://i2.hdslb.com/bfs/face/c55b2eae13646925187514c6f19e19293294d0c5.jpg',
        name: 'miriちゃん',
        desp: '日语点歌姬',
        online: '877',
        avid: 'av8'
      }
    ],
    // 番剧更新
    bangumiList: [
      {
        coverImg: 'http://i0.hdslb.com/bfs/bangumi/4d06e660b8da9cb5335552f4ebde89bbcb2e9d4f.jpg',
        bangumiTitle: '双星之阴阳师',
        bangumiPage: '更新至第34话',
        avid: 'av9'
      },
      {
        coverImg: 'http://i0.hdslb.com/bfs/bangumi/0e6bce5d018796dda7782aa5c97bfdd14691348a.jpg',
        bangumiTitle: '口水三国',
        bangumiPage: '更新至第 关羽篇话',
        avid: 'av10'
      },
      {
        coverImg: 'http://i0.hdslb.com/bfs/bangumi/367387d69ac43c160a453d14cb34256abaca3b4a.jpg',
        bangumiTitle: '双星之阴阳师',
        bangumiPage: '更新至第34话',
        avid: 'av11'
      },
      {
        coverImg: 'http://i0.hdslb.com/bfs/bangumi/4937bf71a4a5a6a426d09e9a78d27696b4746507.jpg',
        bangumiTitle: '双星之阴阳师',
        bangumiPage: '更新至第34话',
        avid: 'av12'
      },
      {
        coverImg: 'http://i0.hdslb.com/bfs/bangumi/2ed6be9050dfa4afe6e2651741d81843a0e81c67.jpg',
        bangumiTitle: '黑白来看守所',
        bangumiPage: '更新至第9话',
        avid: 'av13'
      },
      {
        coverImg: 'http://i0.hdslb.com/bfs/bangumi/2673ac643b48eb5bda64c960a2ca850fbebb839d.jpg',
        bangumiTitle: '夏目友人帐 伍',
        bangumiPage: '更新至第8话',
        avid: 'av14'
      }
    ],

    /* 滚动广告配置 */
    // 图片数据集合
    imgUrls: [
      'http://i0.hdslb.com/bfs/archive/9bab17a99758cc7a72531d15d2d5a85d73b78ded.jpg',
      'http://i0.hdslb.com/bfs/archive/57d8001838ff81c64bef2682070e53efbe2736b7.jpg',
      'http://i0.hdslb.com/bfs/archive/499730dbcd76823664c48e661726a37164158795.jpg',
      'http://i0.hdslb.com/bfs/archive/c9682eac8f46fd2b261b739c5c88e21adaffab53.jpg',
      'http://i0.hdslb.com/bfs/archive/414cf391f88bb098ded766b1d7effd9216be34ef.jpg'
    ],
    // 是否显示面板指示点
    indicatorDots: false,
    // 是否自动切换
    autoplay: true,
    // 自动切换时间间隔
    interval: 5000,
    // 滑动动画时长
    duration: 1000
  },
  onLoad: function () {}
})
