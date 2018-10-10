var app = getApp();
var bookData = require('../../util/booknav.js');
var bookText = require('../../util/booktext.js');

Page({
  data: {
    dataList:null,
    dataText:null,
    wikiId:null,
    navClass:"",
    wxParseData:null,
  },
  onLoad: function () {
    var that = this
    var wiki_id = app.globalData.wikiId;

    var databook = bookText.booktext
    var markdown = require('../../markdown/markdown.js');
    var html2json = require('../../markdown/html2json.js');

    var html = markdown.toHTML(bookText.booktext);
    console.log(databook)
    console.log(html)

    html = html.replace(/\r\n/g,"")
    html = html.replace(/\n/g,"");
    console.log(html2json(html));

    that.setData({
      wikiId:wiki_id,
      dataList:bookData.bookNav,
      dataText:bookText.booktext,
      wxParseData:html2json(html).child
    })

  },
  getLink:function(e){
    var link = e.currentTarget.dataset.link
    console.log(link)
  },
  navShow:function(){
    if(this.data.navClass == ""){
      this.setData({
        navClass:'nav-show'
      })
    }else if(this.data.navClass == 'nav-show'){
      this.setData({
        navClass:""
      })
    }
  }
})