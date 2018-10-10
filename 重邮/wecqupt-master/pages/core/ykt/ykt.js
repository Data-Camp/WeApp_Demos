//ykt.js
//获取应用实例
var app = getApp();
Page({
  data: {
      remind: '加载中',
      canvas_remind: '加载中',
      fontSize: 12,      // 字体大小, 24rpx=12px
      count: 10,         // 展示的消费次数
      width: 0,          // 画布宽
      height: 300,       // 画布高, wxss给定canvas高300px
      dict: [],          // 所有消费数据
      points: [],        // 点的集合（包括点的横坐标x、纵坐标y、当前点的详情detail）
      costArr: [],       // 消费金额集合
      balanceArr: [],    // 余额金额集合
      tapDetail: {},     // 每个点对应的详情集合
      lineLeft: 0,       // 详情垂直线的初始左边距
      gridMarginLeft: 35,// 表格左边距
      gridMarginTop: 20, // 表格上边距
      balance: 0,        // 当前余额（余额卡片上的展示数据）
      last_time: '',
      ykt_id: '',
      switchBtn: true,  // true:余额 or false:交易额
      options: {},
      currentIndex: 0   // 当前点的索引，切换视图的时候保持当前详情
  },
  onLoad: function(){
      var _this = this;
      wx.getSystemInfo({
          success: function(res) {
              // 获取窗口宽, 计算画布宽
              _this.setData({
                'width': res.windowWidth
              });
          }
      });
      _this.sendRequest();
  },
  sendRequest: function() {
      var _this = this;
      if(!app._user.we.ykth){
        _this.setData({
            remind: '未绑定'
        });
        return false;
      }
      wx.request({
          url: app._server + "/api/get_yktcost.php",
          method: 'POST',
          data: app.key({
              openid: app._user.openid,
              yktID: app._user.we.ykth
          }),
          success: function(res) {
              if(res.data && res.data.status === 200){
                var data = res.data.data.slice(0, _this.data.count).reverse();

                /*
                * 获取最近消费数据绘制折线图
                **/
                var dict = data;
                var len = dict.length,
                    xArr = [],           // x轴坐标
                    yArr = [],           // 余额点在画布中的纵坐标
                    balanceArr = [],       // 余额金额集合
                    costArr = [],        // 消费金额集合
                    canvasWidth = _this.data.width,
                    spaceX = (canvasWidth - 2*_this.data.gridMarginLeft) / (_this.data.count - 1),   // 表示横坐标的间隔距离
                    canvasHeight = _this.data.height,
                    gridMarginTop = _this.data.gridMarginTop,  // 折线图上距离
                    gridMarginLeft = _this.data.gridMarginLeft, // 折线图左距离
                    gridNum = 6,                     //横线行数
                    fontSize = _this.data.fontSize;  //字号

                // 横坐标&余额&消费
                for(var i = 0; i < len; i ++){
                    xArr.push(i * spaceX);  
                    balanceArr.push(parseFloat(dict[i].balance)); 
                    if(dict[i].transaction == '消费'){
                      dict[i].cost = -Math.abs(dict[i].cost);
                    }
                    costArr.push(parseFloat(dict[i].cost));
                }
                _this.setData({
                    dict: data,
                    tapDetail: dict[dict.length-1],
                    balance: parseFloat(data[data.length - 1].balance),
                    last_time: data[data.length - 1].time.split(' ')[0],
                    ykt_id: app._user.we.ykth,
                    lineLeft: _this.data.width - _this.data.gridMarginLeft - 1,
                    remind: '',
                    switchArr: balanceArr, // 将纵坐标的值初始化为余额集合
                    costArr: costArr,    // 消费集合，切换折线的时候用
                    balanceArr: balanceArr
                });

                //canvas 
                var context = wx.createContext();
                var options = {
                    canvasWidth: canvasWidth,         // 矩形宽度
                    canvasHeight: canvasHeight,       // 矩形高度
                    gridMarginTop: gridMarginTop,     // 折线图上距离
                    gridMarginLeft: gridMarginLeft,   // 折线图左距离 
                    xArr: xArr,                       // 横坐标
                    gridNum: gridNum,                 // 横网格线数量
                    context: context,                 // canvas上下文
                    len: len,                         // 数据数组长度
                    spaceX: spaceX,
                    fontSize: fontSize
                };
                _this.setData({
                    options: options
                });
                context.clearRect(0, 0, canvasWidth, canvasHeight);

                /*
                * 绘制横轴&纵轴&网格线
                */
                _this.drawLineXY(_this.data.options, _this.data.switchArr);

                /*
                * 描点连线
                */
                _this.drawPointLine(_this.data.options, _this.data.switchArr);
                
                setTimeout(function(){
                    wx.drawCanvas({
                        canvasId: "firstCanvas",
                        actions: context.getActions(), // 获取绘图动作数组
                        reserve: true,
                    });
                    _this.setData({
                      canvas_remind: ''
                    });
                }, 500);
              } else {
                _this.setData({
                    remind: res.data.message || '未知错误'
                });
              }
          },
          fail: function(res){
            app.showErrorModal(res.errMsg);
            _this.setData({
                remind: '网络错误'
            });
          },
      });
  },

  // 绘制横轴&纵轴&网格线
  drawLineXY: function(options, switchArr) {
      var context = options.context,
          gridMarginLeft = options.gridMarginLeft,
          gridMarginTop = options.gridMarginTop,
          canvasHeight = options.canvasHeight,
          canvasWidth = options.canvasWidth,
          xArr = options.xArr,
          tmp_yArr = switchArr,
          gridNum = options.gridNum,
          fontSize = options.fontSize;

      /*
       * 余额纵坐标&横网格线
       * gridNum: 横网格线条数
       * spaceY: 横网格间距
       * spaceYe: 纵轴余额的金额间隔
       * tmp_minY: 余额的最小值
       * tmp_maxY: 余额的最大值
      */
      var tmp_minY = Math.min.apply(Math, tmp_yArr.map(function(e){ return Math.abs(e); })), 
          tmp_maxY = Math.max.apply(Math, tmp_yArr.map(function(e){ return Math.abs(e); })),
          spaceYe = tmp_maxY / gridNum,     
          gridHeight = canvasHeight - 2*gridMarginTop,
          spaceY = gridHeight / gridNum;

      // 绘制竖网格
      context.setLineWidth(1);
      context.setLineCap("round");
      context.setStrokeStyle("#dddddd");
      for (var i = 0; i < xArr.length; i ++) {
          context.beginPath();          
              context.moveTo(xArr[i] + gridMarginLeft, canvasHeight - gridMarginTop);
              context.lineTo(xArr[i] + gridMarginLeft, gridMarginTop);
              context.stroke();
          context.closePath();
      }          
      context.setStrokeStyle("#dddddd");
      context.setFillStyle("#ffcb63");

      // 绘制横网格&纵轴金额  
      for (var i = 0; i <= gridNum; i ++) {
          var numY = 0,
              diff = 0;
          // 纵轴金额
          if (i === 0) {
              numY = 0;
          } else {
              numY = (spaceYe * i).toFixed(0);
          }          
          context.beginPath();
            context.moveTo(xArr[0] + gridMarginLeft, gridMarginTop + spaceY * i );
            context.lineTo(xArr[xArr.length - 1] + gridMarginLeft, gridMarginTop + spaceY * i);
            context.stroke();
          context.closePath(); 

          context.beginPath();
            context.setFontSize(fontSize);
            var left = 25;
            if(numY<10){
                left = 15;
            }else if(numY<100){
                left = 20;
            }else if(numY<1000){
                left = 25;
            }
            context.fillText(numY, gridMarginLeft - left, canvasHeight - gridMarginTop - spaceY * i + 3);
          context.closePath();
      }       

      /*
      * 绘制横轴和纵轴
      */
      context.setLineWidth(2);
      context.setStrokeStyle("#ffcb63");
      context.beginPath();
          context.moveTo(xArr[0] + gridMarginLeft, canvasHeight - gridMarginTop);
          context.lineTo(canvasWidth - gridMarginLeft/2, canvasHeight - gridMarginTop);
          context.moveTo(xArr[0] + gridMarginLeft, canvasHeight - gridMarginTop);
          context.lineTo(xArr[0] + gridMarginLeft, 0); 
          context.stroke();
      context.closePath();

  },

  // 描点&连线
  drawPointLine: function(options, switchArr) {
      var _this = this;
      var context = options.context,
          yArr = [],
          gridMarginLeft = options.gridMarginLeft,
          gridMarginTop = options.gridMarginTop,
          canvasHeight = options.canvasHeight,
          canvasWidth = options.canvasWidth,
          xArr = options.xArr,
          gridNum = options.gridNum,
          tmp_yArr = switchArr,
          len = options.len,
          spaceX = options.spaceX,
          pointArr = [];

      /* 
      * 点集的纵坐标
      * 根据网格间距/余额间距的比例算出点的对应纵坐标
      * spaceY: 横网格间距
      * spaceYe: 纵轴金额间隔
      * tmp_minY: 金额的最小值
      * tmp_maxY: 金额的最大值
      * yArr: 点在画布中的纵坐标
      */
      
      var tmp_minY = Math.min.apply(Math, tmp_yArr.map(function(e){ return Math.abs(e); })), 
          tmp_maxY = Math.max.apply(Math, tmp_yArr.map(function(e){ return Math.abs(e); })),
          spaceYe = tmp_maxY / gridNum,
          gridHeight = canvasHeight - 2*gridMarginTop,
          spaceY = gridHeight / gridNum,
          switchBtn = Math.min.apply(Math, tmp_yArr) >= 0;

      for(var i = 0; i < len; i++){  
          yArr.push(gridHeight - (tmp_maxY - Math.abs(tmp_yArr[i]))*spaceY / spaceYe);
      } 

      /* 
      * 描点连线
      */  
      for(var i = 0; i < len; i ++){  
          var x = xArr[i] + gridMarginLeft,               // 横坐标
              y = canvasHeight - gridMarginTop -yArr[i];  // 纵坐标         

          // 将点在画布中的坐标&消费详情存入数组
          pointArr.push({
              x: x,
              y: y,
              detail: this.data.dict[i]
          });
      }  

      context.setStrokeStyle("#73b4ef");
      context.setFillStyle("#ffcb63");
      // 描点连线
      for(var i = 0, pLen = pointArr.length; i < pLen; i++){  

          if(pointArr[i+1]){
            if((switchBtn && tmp_yArr[i+1]>tmp_yArr[i]) || (!switchBtn && (tmp_yArr[i]>0 || tmp_yArr[i+1]>0))){
              context.setGlobalAlpha(0.66);
            }
            context.beginPath();
                context.moveTo(pointArr[i].x, pointArr[i].y);
                context.lineTo(pointArr[i+1].x, pointArr[i+1].y);
                context.stroke();
            context.beginPath();
          }

          context.setGlobalAlpha(1);
          context.beginPath();
            context.arc(pointArr[i].x, pointArr[i].y, 2, 0, 2*Math.PI); // 画点              
            context.fill();
            context.fillText((!switchBtn&&tmp_yArr[i]>0?'+':'')+tmp_yArr[i], pointArr[i].x + 3, pointArr[i].y - 3);  // 点的含义，画字
          context.closePath();

        pointArr[i].detail.balance = parseFloat(pointArr[i].detail.balance);
      }
      
      _this.setData({
          points: pointArr
      });
  },

  // 触摸详情
  canvasTap: function(e) {  
      var _this = this;
      // 手指在画布中的坐标        
      var tapX = e.detail.x,
          tapY = e.detail.y,        
          points = _this.data.points,
          pointsLen = points.length,
          diffX = 0,
          iwidth = (_this.data.width-2*_this.data.gridMarginLeft)/(_this.data.count-1);
      
      var i = Math.round((tapX - _this.data.gridMarginLeft) / iwidth);

      _this.setData({
          tapDetail: points[i].detail,
          lineLeft: _this.data.gridMarginLeft + iwidth*i - 1,  // 详情竖线的left
          currentIndex: i  // 当前点的索引，即显示当前详情
      });
  },

  // 切换视图
  switchBtn: function(e) {
      var id = e.target.id;
      if(!id || (id=='balance'&&this.data.switchBtn) || (id=='cost'&&!this.data.switchBtn)){
          return false;
      }
      var context = this.data.options.context;
      context.clearRect(0, 0, this.data.canvasWidth, this.data.canvasHeight);
      this.drawLineXY(this.data.options, this.data[id+'Arr']);
      this.drawPointLine(this.data.options, this.data[id+'Arr']);
        
      wx.drawCanvas({
          canvasId: "firstCanvas",
          actions: context.getActions(),
          reverse: true
      });
      this.setData({
          switchBtn: !this.data.switchBtn
      });
  }
  
});