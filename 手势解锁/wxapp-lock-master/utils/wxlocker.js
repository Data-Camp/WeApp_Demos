(function(){
       var wxlocker = function(obj){
            this.chooseType =  3; // 3*3的圆点格子
        };
        wxlocker.prototype.drawCle = function(x, y) { // 初始化解锁密码面板
            this.ctx.setStrokeStyle('#10AEFF');
            this.ctx.setLineWidth(1);
            this.ctx.beginPath();
            this.ctx.arc(x, y, this.r, 0, Math.PI * 2, true);
            this.ctx.closePath();
            this.ctx.stroke();
        }
        wxlocker.prototype.drawPoint = function() { // 初始化圆心
            for (var i = 0 ; i < this.lastPoint.length ; i++) {
                this.ctx.setFillStyle('#10AEFF');
                this.ctx.beginPath();
                this.ctx.arc(this.lastPoint[i].x, this.lastPoint[i].y, this.r / 2, 0, Math.PI * 2, true);
                this.ctx.closePath();
                this.ctx.fill();
            }
        }
        wxlocker.prototype.drawStatusPoint = function(type) { // 初始化状态线条
            for (var i = 0 ; i < this.lastPoint.length ; i++) {
                this.ctx.setStrokeStyle(type);
                this.ctx.beginPath();
                this.ctx.arc(this.lastPoint[i].x, this.lastPoint[i].y, this.r, 0, Math.PI * 2, true);
                this.ctx.closePath();
                this.ctx.stroke();
            }
            wx.drawCanvas({
                canvasId: "locker",
                actions: this.ctx.getActions(),
                reserve:true
            });
        }
        wxlocker.prototype.drawLine = function(po, lastPoint) {// 解锁轨迹
            this.ctx.beginPath();
            this.ctx.setLineWidth(1);
            this.ctx.moveTo(this.lastPoint[0].x, this.lastPoint[0].y);
            for (var i = 1 ; i < this.lastPoint.length ; i++) {
                this.ctx.lineTo(this.lastPoint[i].x, this.lastPoint[i].y);
            }
            this.ctx.lineTo(po.x, po.y);
            this.ctx.stroke();
            this.ctx.closePath();

        }
        wxlocker.prototype.createCircle = function() {// 创建解锁点的坐标，根据canvas的大小来平均分配半径
            var  cavW = this.setCanvasSize().w;
            var  cavH = this.setCanvasSize().h;
            var n = this.chooseType;
            var count = 0;
            this.r = cavW / (2 + 4 * n);// 公式计算
            this.lastPoint = [];
            this.arr = [];
            this.restPoint = [];
            var r = this.r;
            for (var i = 0 ; i < n ; i++) {
                for (var j = 0 ; j < n ; j++) {
                    count++;
                    var obj = {
                        x: j * 4 * r + 3 * r,
                        y: i * 4 * r + 3 * r,
                        index: count
                    };
                    this.arr.push(obj);
                    this.restPoint.push(obj);
                }
            }
            // this.ctx.clearRect(0, 0, cavW, cavH);
            for (var i = 0 ; i < this.arr.length ; i++) {
                this.drawCle(this.arr[i].x, this.arr[i].y);
            }
            wx.drawCanvas({
                canvasId: "locker",
                actions: this.ctx.getActions(),
                reserve:false
            });
            //return arr;

        }
        wxlocker.prototype.getPosition = function(e) {// 获取touch点相对于canvas的坐标
            // var rect = e.target;
            var po = {
                x: e.touches[0].x,
                y: e.touches[0].y
              };
            return po;
        }
        wxlocker.prototype.update = function(po) {// 核心变换方法在touchmove时候调用
            var  cavW = this.setCanvasSize().w;
            var  cavH = this.setCanvasSize().h;
            this.ctx.clearRect(0, 0, cavW, cavH);

            for (var i = 0 ; i < this.arr.length ; i++) { // 每帧先把面板画出来
                this.drawCle(this.arr[i].x, this.arr[i].y);
            }
            this.drawPoint();//  每帧画圆心
            this.drawLine(po , this.lastPoint);// 每帧画轨迹
            for (var i = 0 ; i < this.restPoint.length ; i++) {
                if (Math.abs(po.x - this.restPoint[i].x) < this.r && Math.abs(po.y - this.restPoint[i].y) < this.r) {
                    this.drawPoint();
                    this.lastPoint.push(this.restPoint[i]);
                    this.restPoint.splice(i, 1);
                    break;
                }
            }

        }
        wxlocker.prototype.checkPass = function(psw1, psw2) {// 检测密码
            var p1 = '',
            p2 = '';
            for (var i = 0 ; i < psw1.length ; i++) {
                p1 += psw1[i].index + psw1[i].index;
            }
            for (var i = 0 ; i < psw2.length ; i++) {
                p2 += psw2[i].index + psw2[i].index;
            }
            return p1 === p2;
        }
        wxlocker.prototype.storePass = function(psw,cb) {// touchend结束之后对密码和状态的处理
            if (this.pswObj.step == 1) {//step==1表示还没有设置密码状态
                if (this.checkPass(this.pswObj.fpassword, psw)) {
                    this.pswObj.step = 2;
                    this.pswObj.spassword = psw;
                    this.resetHidden = false;
                    this.title = "密码保存成功";
                    this.titleColor = "succ";
                    this.drawStatusPoint('#09bb07');
                    wx.setStorageSync('passwordxx', JSON.stringify(this.pswObj.spassword));
                    // wx.setStorageSync('chooseType', this.chooseType);
                } else {
                    this.title = "两次绘制不一致，重新绘制";
                    this.titleColor = "error";
                    this.drawStatusPoint('#e64340');
                    delete this.pswObj.step;
                }
            } else if (this.pswObj.step == 2) {
                if (this.checkPass(this.pswObj.spassword, psw)) {
                    this.title = "解锁成功";
                    this.titleColor = "succ";
                    this.drawStatusPoint('#09bb07');
                    cb();
                } else {
                    this.title = "解锁失败";
                    this.titleColor = "error";
                    this.drawStatusPoint('#e64340');
                }
            } else {
                if(this.lastPoint.length<4){
                    this.title="密码过于简单，请至少连接4个点";
                    this.resetHidden = true;
                    this.titleColor = "error";
                    return false;
                }else{
                    this.pswObj.step = 1;
                    this.pswObj.fpassword = psw;
                    this.titleColor = "";
                    this.title = "再次输入";
                }
                
            }

        }
        wxlocker.prototype.makeState = function() {
            if (this.pswObj.step == 2) {
                this.resetHidden = false;
                this.title = "请解锁";
                this.titleColor = "";
            } else if (this.pswObj.step == 1) {
                this.title="请设置手势密码";
                this.resetHidden = true;
                this.titleColor = "";
            } else {
                this.title="请设置手势密码";
                this.resetHidden = true;
                this.titleColor = "";
            }
        }
        wxlocker.prototype.updatePassword = function(){//点击重置按钮，重置密码
            wx.removeStorageSync("passwordxx");
            // wx.removeStorageSync("chooseType");
            this.pswObj = {};
            this.title="请设置手势密码";
            this.resetHidden = true;
            this.titleColor = "";
            this.reset();
        }
        wxlocker.prototype.init = function() {//初始化锁盘
            this.pswObj = wx.getStorageSync('passwordxx') ? {
                step: 2,
                spassword: JSON.parse(wx.getStorageSync('passwordxx'))
            } : {};
            this.lastPoint = [];//记录手指经过的圆圈
            this.makeState();
            this.touchFlag = false;
            this.ctx = wx.createContext();//创建画布
            this.createCircle();//画圆圈
        }
        
        wxlocker.prototype.reset = function() {
            this.createCircle();
        }
        //适配不同屏幕大小的canvas
        wxlocker.prototype.setCanvasSize = function(){
             var size={};
                try {
                    var res = wx.getSystemInfoSync();
                    var scale = 750/686;//不同屏幕下canvas的适配比例；设计稿是750宽
                    var width = res.windowWidth/scale;
                    var height = width;//canvas画布为正方形
                    size.w = width;
                    size.h = height;
                } catch (e) {
                    // Do something when catch error
                    console.log("获取设备信息失败"+e);
                } 
            return size;
        }
        wxlocker.prototype.bindtouchstart = function(e){
            if(e.touches.length==1){
                var self = this;
                var po = self.getPosition(e);
                for (var i = 0 ; i < self.arr.length ; i++) {
                    //判断手指触摸点是否在圆圈内
                    if (Math.abs(po.x - self.arr[i].x) < self.r && Math.abs(po.y - self.arr[i].y) < self.r) {
                        self.touchFlag = true;
                        self.drawPoint();
                        self.lastPoint.push(self.arr[i]);
                        self.restPoint.splice(i,1);
                        break;
                    }
                }
            }
            wx.drawCanvas({
                canvasId: "locker",
                actions: this.ctx.getActions(),
                reserve:true
            });
        }
        wxlocker.prototype.bindtouchmove = function(e){
            // console.log(e)
            if(e.touches.length==1){
               var self = this;
               if (self.touchFlag) {
                    self.update(self.getPosition(e));
                }
            }
            wx.drawCanvas({
                canvasId: "locker",
                actions: this.ctx.getActions(),
                reserve:true
            });
        }
        wxlocker.prototype.bindtouchend = function(e,cb){
            var self = this;
            if (self.touchFlag) {
                self.touchFlag = false;
                self.storePass(self.lastPoint,cb);
                setTimeout(function(){
                        self.reset();
                }, 500);
            }
        }
        
        module.exports = {
            lock:new wxlocker()
        }
})();