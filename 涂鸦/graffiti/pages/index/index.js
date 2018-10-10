Page({
  data:{
    pen : 3, //画笔粗细默认值
    color : '#cc0033' //画笔颜色默认值
  },
  startX: 0, //保存X坐标轴变量
  startY: 0, //保存X坐标轴变量
  isClear : false, //是否启用橡皮擦标记
  //手指触摸动作开始
  touchStart: function (e) {
      //得到触摸点的坐标
      this.startX = e.changedTouches[0].x
      this.startY = e.changedTouches[0].y
      this.context = wx.createContext()

      if(this.isClear){ //判断是否启用的橡皮擦功能  ture表示清除  false表示画画
         this.context.setStrokeStyle('#F8F8F8') //设置线条样式 此处设置为画布的背景颜色  橡皮擦原理就是：利用擦过的地方被填充为画布的背景颜色一致 从而达到橡皮擦的效果 
         this.context.setLineCap('round') //设置线条端点的样式
         this.context.setLineJoin('round') //设置两线相交处的样式
         this.context.setLineWidth(20) //设置线条宽度
         this.context.save();  //保存当前坐标轴的缩放、旋转、平移信息
         this.context.beginPath() //开始一个路径 
         this.context.arc(this.startX,this.startY,5,0,2*Math.PI,true);  //添加一个弧形路径到当前路径，顺时针绘制  这里总共画了360度  也就是一个圆形 
         this.context.fill();  //对当前路径进行填充
         this.context.restore();  //恢复之前保存过的坐标轴的缩放、旋转、平移信息
      }else{
         this.context.setStrokeStyle(this.data.color)
         this.context.setLineWidth(this.data.pen)
         this.context.setLineCap('round') // 让线条圆润 
         this.context.beginPath()
        
      }
  },
  //手指触摸后移动
  touchMove: function (e) {
      
      var startX1 = e.changedTouches[0].x
      var startY1 = e.changedTouches[0].y

      if(this.isClear){ //判断是否启用的橡皮擦功能  ture表示清除  false表示画画

        this.context.save();  //保存当前坐标轴的缩放、旋转、平移信息
        this.context.moveTo(this.startX,this.startY);  //把路径移动到画布中的指定点，但不创建线条
        this.context.lineTo(startX1,startY1);  //添加一个新点，然后在画布中创建从该点到最后指定点的线条
        this.context.stroke();  //对当前路径进行描边
        this.context.restore()  //恢复之前保存过的坐标轴的缩放、旋转、平移信息
          
        this.startX = startX1;
        this.startY = startY1;
       
      }else{
        this.context.moveTo(this.startX, this.startY)
        this.context.lineTo(startX1, startY1)
        this.context.stroke()

        this.startX = startX1;
        this.startY = startY1;
        
      }
      //只是一个记录方法调用的容器，用于生成记录绘制行为的actions数组。context跟<canvas/>不存在对应关系，一个context生成画布的绘制动作数组可以应用于多个<canvas/>
      wx.drawCanvas({
         canvasId: 'myCanvas',
         reserve: true,
         actions: this.context.getActions() // 获取绘图动作数组
      })
  },
  //手指触摸动作结束
  touchEnd: function () {
      
  },
  //启动橡皮擦方法
  clearCanvas: function(){
      if(this.isClear){
        this.isClear = false;
      }else{
        this.isClear = true;
      }
  },
  penSelect: function(e){ //更改画笔大小的方法
    console.log(e.currentTarget);
    this.setData({pen:parseInt(e.currentTarget.dataset.param)});
    this.isClear = false;
  },
  colorSelect: function(e){ //更改画笔颜色的方法
    console.log(e.currentTarget);
    this.setData({color:e.currentTarget.dataset.param});
    this.isClear = false;
  }
})