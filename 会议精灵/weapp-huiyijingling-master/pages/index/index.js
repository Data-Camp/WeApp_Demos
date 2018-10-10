Page({
  data: {
    lists: [
      {
        'id': '1',
        'image': 'http://img1.huiyijingling.cn/UploadImage/Meet/20161010/4ntia7d5/636117184529372567.png',
        'title': '对话产品总监 | 深圳·北京PM大会 【深度对话小米/京东/1号店/百度等产品总监】',
        'num':'304',
        'state':'进行中',
        'time': '10月09日 17:59',
        'address': '深圳市·南山区'
      },
      {
        'id': '1',
        'image': 'http://img1.huiyijingling.cn/UploadImage/Meet/20161010/4ntia7d5/636117184835348263.png',
        'title': 'AI WORLD 2016世界人工智能大会',
        'num':'380',
        'state':'已结束',
        'time': '10月09日 17:39',
        'address': '北京市·朝阳区'
      },
      {
        'id': '1',
        'image': 'http://img1.huiyijingling.cn/UploadImage/Meet/20161010/4ntia7d5/636117186019220383.png',
        'title': 'H100太空商业大会',
        'num':'500',
        'state':'进行中',
        'time': '10月09日 17:31',
        'address': '大连市'
      },
      {
        'id': '1',
        'image': 'http://img1.huiyijingling.cn/UploadImage/Meet/20161010/4ntia7d5/636117185105463337.png',
        'title': '【报名】年度盛事，大咖云集！2016凤凰国际论坛邀您“与世界对话”',
        'num':'150',
        'state':'已结束',
        'time': '10月09日 17:21',
        'address': '北京市·朝阳区'
      },
      {
        'id': '1',
        'image': 'http://img1.huiyijingling.cn/UploadImage/Meet/20161010/4ntia7d5/636117185186696080.png',
        'title': '新质生活 · 品质时代 2016消费升级创新大会',
        'num':'217',
        'state':'进行中',
        'time': '10月09日 16:59',
        'address': '北京市·朝阳区'
      }
    ],
    list: [
      {
        'id': '1',
        'image': 'http://img1.huiyijingling.cn/UploadImage/Meet/20161010/4ntia7d5/636117184529372567.png',
        'title': '对话产品总监 | 深圳·北京PM大会 【深度对话小米/京东/1号店/百度等产品总监】',
        'num':'304',
        'state':'进行中',
        'time': '10月09日 17:59',
        'address': '深圳市·南山区'
      },
      {
        'id': '1',
        'image': 'http://img1.huiyijingling.cn/UploadImage/Meet/20161010/4ntia7d5/636117184835348263.png',
        'title': 'AI WORLD 2016世界人工智能大会',
        'num':'380',
        'state':'已结束',
        'time': '10月09日 17:39',
        'address': '北京市·朝阳区'
      },
      {
        'id': '1',
        'image': 'http://img1.huiyijingling.cn/UploadImage/Meet/20161010/4ntia7d5/636117186019220383.png',
        'title': 'H100太空商业大会',
        'num':'500',
        'state':'进行中',
        'time': '10月09日 17:31',
        'address': '大连市'
      },
      {
        'id': '1',
        'image': 'http://img1.huiyijingling.cn/UploadImage/Meet/20161010/4ntia7d5/636117185105463337.png',
        'title': '【报名】年度盛事，大咖云集！2016凤凰国际论坛邀您“与世界对话”',
        'num':'150',
        'state':'已结束',
        'time': '10月09日 17:21',
        'address': '北京市·朝阳区'
      },
      {
        'id': '1',
        'image': 'http://img1.huiyijingling.cn/UploadImage/Meet/20161010/4ntia7d5/636117185186696080.png',
        'title': '新质生活 · 品质时代 2016消费升级创新大会',
        'num':'217',
        'state':'进行中',
        'time': '10月09日 16:59',
        'address': '北京市·朝阳区'
      }
    ],
    imgUrls: [
        '/img/banner1.png',
        '/img/banner12442.png',
        '/img/banner12463.png',
        '/img/banner2.png'
    ]
  },
  scrollR: function(e){
    this.setData({
      lists: this.data.lists.concat(this.data.list),
    });
  },

  onLoad: function (e) {
    this.scrollR(e);
  },

  scroll: function(e){
    this.scrollR(this.data.offset);
  }
})