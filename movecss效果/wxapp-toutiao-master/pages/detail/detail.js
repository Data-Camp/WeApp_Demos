Page({
    data: {
        item: {
            index: 1,
            msg: "来一段笑话",
            title: '搞笑',

            // html:'<section data-is-video="False" hot-time="1476081088" class=" has_action"  data-group-id="6339630402520482306" data-item-id="6339631683574170113" data-format="0">                       <a href="/item/6339631683574170113/" class="article_link clearfix " data-action-label="click_headline" data-tag="news_society">                    <div class="dotdot line3 ">直播 | 浙江温州民房倒塌已8人遇难 居民：事发时听到巨响</div>                    <div class="list_image">              <ul class="clearfix">                                    <li class="list_img_holder"><image src="http://p3.pstatp.com/list/ec3000a57ef06232991" /></li>                                    <li class="list_img_holder"><image src="http://p3.pstatp.com/list/f5e00004a6fb452a3f1" /></li>                                    <li class="list_img_holder"><image src="http://p3.pstatp.com/list/f5e00004a5a896cdc07" /></li>                                </ul>          </div>                              <div class="item_info">                                          <span class="hot_label space">热</span>                                                        <span class="src space">我在现场</span>              <span class="cmt space">评论&nbsp;9372</span>                            <span class="time" title="2016-10-10 14:31">2016-10-10 14:31</span>                            <span data-id="6339630402520482306" class="dislike-news  fr"></span>                        </div>                </a>        </section>',
            list: [{
                name: '硫酸钠',
                xm: 'NaSO2'
            }, {
                name: '碳酸钙',
                xm: 'CACO3'
            }, {
                name: '双氧水',
                xm: 'H2O2'
            }],
            menu: [{
                title: "推荐",
                url: 'channel=__all__'
            }, {
                title: "视频",
                url: 'channel=video'
            }, {
                title: "热点",
                url: 'channel=news_hot'
            }, {
                title: "社会",
                url: 'channel=news_society'
            }, {
                title: "娱乐",
                url: 'channel=news_entertainment'
            }, {
                title: "军事",
                url: 'channel=news_military'
            }, {
                title: "科技",
                url: 'channel=news_tech'
            }, {
                title: "汽车",
                url: 'channel=news_car'
            }, {
                title: "体育",
                url: 'channel=news_sports'
            }, {
                title: "财经",
                url: 'channel=news_finance'
            }, {
                title: "国际",
                url: 'channel=news_world'
            }, {
                title: "时尚",
                url: 'channel=news_fashion'
            }]
        },
        channels:{
          mychannels:["视频","热点","社会","娱乐","军事","科技","汽车","体育","财经","国际","时尚"],
          recommchannels:["精选","数码","时尚","辟谣","奇葩","游戏","旅游","育儿","减肥","养生","美食","政务","历史","探索","故事","美文","情感","美图","房产","家居","搞笑","星座","文化","特卖","两会","书籍","手机","宠物","股票","科学","语录","动漫","美女","中国新唱将","娱乐","电影","问答"],
        }, 
        list:[],   //新闻列表数据
        text:'',     //标题
        act_index: 0, //当前选中的
        scrollLeft:0,  //定位menu 滚动条位置
        actionSheetHidden:true, // 不推荐该类信息
        toastHidden:true,  //提示消息
        animationData:{},  //动画
        setMenuListShow:true, // 频道列表是否显示
        mychannelsShow:true,  // 频道列表（我的）关闭按钮是否显示
        recommchannelsShow:true // 频道列表（推荐）关闭按钮是否显示
    },
    upper: function() {},
    lower: function() {},
    clickHandler: function(e) {
       console.log(e);
       var cur_index=e.currentTarget.dataset.index;
       var _scrollleft=e.currentTarget.dataset.scrollleft;
       var text=e.currentTarget.dataset.text;
      // console.log(e);
        this.setData({
            act_index: cur_index,
            scrollLeft:_scrollleft-58*2,
            text: text
        });
       
    },
    clickInterest:function(e) {
      console.log(e.currentTarget.dataset.id);
      this.setData({
        actionSheetHidden: !this.data.actionSheetHidden
      })
    },
    actionSheetChange: function(e) {
      this.setData({
        actionSheetHidden: !this.data.actionSheetHidden
      })
    },
    binditem:function(e){
      this.setData({
        actionSheetHidden: !this.data.actionSheetHidden,
        toastHidden: false
      })
    },
    toastChange:function(e){
      this.setData({ 
        toastHidden: true
      })
    },
    clicksetting:function(e){
        this.setData({
          setMenuListShow:!this.data.setMenuListShow
        })
    },
    closeHandler:function(e){
        this.setData({
          setMenuListShow:!this.data.setMenuListShow
        })
    },
    longtap:function(e){
      console.log(e);
      var type=e.currentTarget.dataset.type;
       console.log(type);
       if (type=='my') {
          this.setData({
            mychannelsShow:!this.data.mychannelsShow
          })
       }else{
          this.setData({
            recommchannelsShow:!this.data.recommchannelsShow
          })
       }
    },
    onShow:function(){
      
    },
    onReady: function() {
        var _this=this;
        //console.log("parame:", this);
        /*wx.setNavigationBarTitle({
            "title": this.title
        });

        var context = wx.createContext()

        console.log(context);
        context.setLineWidth(10)
        context.setLineCap("round")
        context.setLineJoin("miter")
        context.setMiterLimit(10)
        context.moveTo(20, 20)
        context.lineTo(150, 27)
        context.lineTo(20, 54)
        context.stroke()

        context.beginPath()

        context.setMiterLimit(3)
        context.moveTo(20, 70)
        context.lineTo(150, 77)
        context.lineTo(20, 104)
        context.stroke()

        wx.drawCanvas({
            canvasId: 1,
            actions: context.getActions()
        });*/


       /* var animation = wx.createAnimation({
            duration:1000,
            timingFunction:"ease",
        });

        

        this.animation = animation;


        

         
          this.animation.scale(0).step(); 
          this.setData({
            animationData:this.animation.export()
          });*/
         

       
    },
    onLoad: function(options) {
        this.title = options.title
        //console.log(options);
        var _this=this;
        wx.request({
          url: 'http://m.maoyan.com/movie/list.json?type=hot&offset=0&limit=1000',
          data: {},
          header: {
            "Content-Type": "application/json"
          },
          success: function(res) {
            var data = res.data.data;
            console.log(data.data);
            _this.setData({
               list:data.movies
            });
          }
        });
    }
})