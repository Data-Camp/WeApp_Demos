// // play 
var app = getApp()
Page({
  data: {
    typeName: '急速模式',
    score: 0,
    blockData:[],
    scrollHeight: 0,
    canRun: false
  },
  onLoad: function(){
      var that = this;
      // 设置title
      wx.setNavigationBarTitle({
        title: that.data.typeName
      });
  },
  onReady: function(){
      var array = [];
      // 先生成一个10个长度的数组
      for(var i = 0; i < 10; i++){
        array.push(this.getNewLine(i));
      }
      this.setData({
          blockData: array.reverse()
      });
  },
  handleClickWhite: function(events){
      // 点击白块一定会报错 差别在于报错文案
      // 判断是否是点击的第一行
      // 被点击的id
      var id = events.currentTarget.id;
      // 被点击的行
      var line = id.split("-")[1];
      // 数据
      var blockData = this.data.blockData.concat().reverse();
      // 当前分数
      var score = this.data.score;

      // 判断是否是第一行
      if(line != this.getClickableBlockLine(blockData)){
        this.handleWrong("请点击第一个黑块！游戏结束", score);
      } else {
        // 点击的第一行白块  
        this.handleWrong("别点白块！游戏结束", score);
      }
  },
  handleClickBlack: function(events){
      // 黑块是应该点击的块
      // 判断是否是点击的第一行
      // 被点击的id
      var id = events.currentTarget.id;
      // 被点击的行
      var line = id.split("-")[1];
      // 数据
      var blockData = this.data.blockData.concat().reverse();
      // 当前分数
      var score = this.data.score;
      // 可点击的第一行
      var clickableLine = this.getClickableBlockLine(blockData);

      // 判断是否是第一行
      if(line == clickableLine){
        // 点击了第一行黑块 
        // 判断是否是是第一次
        if(score == 0){
            // 启动滑动程序
            this.run();
        }
        score++;

        // 将黑块变灰块
        this.getBlockBlackToGray(line, blockData);
        // 分数++
        this.setData({
            score: score,
            blockData: blockData.concat().reverse()
        });

      } else {
        // 点击的不是第一行白块  
        this.handleWrong("请点击第一个黑块！游戏结束", score);
      }
  },
  handleClickGray: function(events){
      // 灰块是指黑块点击之后的块 
      // 其在显示是白块 并且同样不可点
      var score = this.data.score;
      this.handleWrong("别点白块！游戏结束", score);
  },
  run: function(){
      // 滑动方法
      var that = this;
      var speed = 10;

      this.setData({
          canRun: true
      });

      var timer = setInterval(function(){
          // 当前滑动距离
          if(!that.data.canRun){
              clearInterval(timer);
              return;
          }
          
          var currentScrollHeight = that.data.scrollHeight;
          // 当前分数
          var score = that.data.score;
          // 滑块数据
          var blockData = that.data.blockData.concat().reverse();

          if(Math.abs(currentScrollHeight) == 150){
              // 滑到临界点
              // 判断是否过期
              // 判断条件是 第一个滑块的状态是否为已点击
              if(that.checkFirstLineBlockClicked(blockData[0].block)){
                  // 没过期
                  // 继续 去除旧节点 插入新节点 scrolllHeight归0
                  var newId = blockData[blockData.length - 1].id + 1;
                  blockData.push(that.getNewLine(newId));
                  blockData.shift();
                  that.setData({
                      scrollHeight: 0,
                      blockData: blockData.concat().reverse()
                  });
                  return;
              }

              // 过期
              // 报错
              that.handleWrong("请点击白块！游戏结束", score);
              return;
          }

          currentScrollHeight = currentScrollHeight - speed;
          that.setData({
              scrollHeight: currentScrollHeight
          });
      }, 20);
  },
  checkFirstLineBlockClicked: function(blockDataLine){

      for(var i = 0; i < blockDataLine.length; i++){
          if(blockDataLine[i] == 2){
              return true;
          }
      }

      return false;
  },
  getBlockBlackToGray: function(line, blockData){
      for(var i = 0; i < blockData.length; i++){
          if(blockData[i].id == line){
              var currentArray = blockData[i].block;
              for(var j = 0; j < currentArray.length; j++){
                  if(currentArray[j] == 1){
                      currentArray[j] = 2;
                      return;
                  }
              }
          }
      }
  },
  getClickableBlockLine: function(blockData){
      var line = 0;
      for(var i = 0; i < blockData.length; i++){
          var block = blockData[i].block;
          for(var j = 0; j < block.length; j++){
            // 行内四个元素 有1即可
            if(block[j] == 1){
                return blockData[i].id;
            }
          }
      }
      return line;
  },
  getNewLine: function(i){
      // 生成一个标准的数据
      var orderArray = [0,0,0,0];
      // 生成一个随机数
      var randomNum = Math.floor(Math.random() * 4);
      // 赋值给对应的obj
      orderArray[randomNum] = 1;
      return {id: i, block: orderArray};
  },
  handleWrong: function(text, score){

      this.setData({
          canRun: false
      });

      wx.showToast({
            title: text,
            icon: 'cancel', 
            duration: 2000,
            complete: function(){
                // 将此分数存入全局变量
                app.globalData.currentScore = score;
                // 若此分数比最高分数还高 将其存入本地
                if(score > app.globalData.speedScore){
                    app.globalData.speedScore = score;
                    wx.setStorageSync('speedScore',score);
                }
                var timer = setTimeout(function(){
                    wx.redirectTo({
                        url: '../end/end?type=speed&score=' + score
                    })
                    clearTimeout(timer);
                }, 2000);
            }
        })
  }
})