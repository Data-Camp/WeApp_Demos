Page({
  data: {
    showtab:0,  //顶部选项卡索引
    showtabtype:'', //选中类型
    tabnav:{},  //顶部选项卡数据
    testdataall:[],  //所有数据
    testdata1:[], //数据列表
    testdata2:[], //数据列表
    testdata3:[], //数据列表
    testdata4:[], //数据列表
    testdata5:[], //数据列表
    startx:0,  //开始的位置x
    endx:0, //结束的位置x
    critical: 100, //触发切换标签的临界值
    marginleft:0,  //滑动距离
  },
  onLoad: function () {
    this.setData({
      tabnav:{
        tabnum:5,
        tabitem:[
          {
            "id":1,
            "type":"A",
            "text":"tab1"
          },
          {
            "id":2,
            "type":"B",
            "text":"tab2"
          },
          {
            "id":3,
            "type":"C",
            "text":"tab3"
          },
          {
            "id":4,
            "type":"D",
            "text":"tab4"
          },
          {
            "id":5,
            "type":"E",
            "text":"tab5"
          },
        ]
      },
    })
    this.fetchTabData(0);
  },
  fetchData:function(t){  //生成数据
    const newquestions = [];
    for (let i = 0; i < 20; i++) {
      newquestions.push({
        "id":i+1,
        "type": t,
        "text":"服务名称适用品类服务实施详情服务期限服务生效时间摔碰管修一年笔记本本服务有效期内，如客户的数码摄照产品在正常使用过程中由于不慎将产品坠落、挤压、碰撞，而产生的硬件故障，本服务将免费提供硬件维修或更换，使产品重新恢复正常运行。12个月购机满30天后开始生效摔碰管修两年笔记本、数码相机、摄像机、手机、小数码"
      })
    }
    return newquestions
  },
  fetchTabData:function(i){
    console.log(Number(i));
    switch(Number(i)) {
      case 0:
        this.setData({
          testdata1: this.fetchData('A')
        })
        break;
      case 1:
        this.setData({
          testdata2: this.fetchData('B')
        })
        break;
      case 2:
        this.setData({
          testdata3: this.fetchData('C')
        })
        break;
      case 3:
        this.setData({
          testdata4: this.fetchData('D')
        })
        break;
      case 4:
        this.setData({
          testdata5: this.fetchData('E')
        })
        break;
      default:
        return;
    }
  },
  setTab:function(e){ //设置选项卡选中索引
    const edata = e.currentTarget.dataset;
    this.setData({
      showtab: Number(edata.tabindex),
      showtabtype: edata.type
    })
    this.fetchTabData(edata.tabindex);
  },
  scrollTouchstart:function(e){
    let px = e.touches[0].pageX;
    this.setData({
      startx: px
    })
  },
  scrollTouchmove:function(e){
    let px = e.touches[0].pageX;
    let d = this.data;
    this.setData({
      endx: px,
    })
    if(px-d.startx<d.critical && px-d.startx>-d.critical){
      this.setData({
        marginleft: px - d.startx
      })
    }
  },
  scrollTouchend:function(e){
    let d = this.data;
    if(d.endx-d.startx >d.critical && d.showtab>0){
      this.setData({
        showtab: d.showtab-1,
      })
      // this.fetchTabData(d.showtab-1);
    }else if(d.endx-d.startx <-d.critical && d.showtab<this.data.tabnav.tabnum-1){
      this.setData({
        showtab: d.showtab+1,
      })
    }
    this.fetchTabData(d.showtab);
    this.setData({
        startx:0,
        endx:0,
        marginleft:0
    })
  },
})
