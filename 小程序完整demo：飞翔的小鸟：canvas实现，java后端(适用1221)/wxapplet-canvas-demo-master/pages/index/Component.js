/**
 * 某个可以在canvas中绘制的图形
 */
class Component {
    // 构造函数
    constructor(config) {
        this.ctx = config.context;  // canvas对应的context
        this.type = config.type;  // 组件类型，要么是文字，要么是矩形，其实对于不同的组件类型，用继承更好
        this.text = config.text;  // 如果是文字型组件，要显示的文字是啥？
        this.fontSize = config.fontSize || 25;  // 文字的大小，单位是像素
        this.width = config.width || 10;  // 宽度，宽度和长度只对矩形有用
        this.height = config.height || 10;  // 长度
        this.x = config.x || 0;  // x坐标
        this.y = config.y || 0;  // y坐标
        this.xSpeed = config.xSpeed || 0;  // 在x轴上的速度
        this.ySpeed = config.ySpeed || 0;  // 在y轴上的速度
        this.color = config.color || '#CD853F';  // 颜色
        this.xAcc = config.xAcc || 0;  // 在x轴上的加速度
        this.yAcc = config.yAcc || 0;  // 在y轴上的加速度
        this.canvasHeight = config.canvasHeight || 400;  // canvas的高度
    }

    // 在canvas上绘制图形
    update() {
        // 微信的canvas API真是难用，跟标准的完全不一样
        this.ctx.setFillStyle(this.color);
        this.ctx.setStrokeStyle(this.color);
        if (this.type == "text") {
            this.ctx.setFontSize(this.fontSize);
            this.ctx.fillText(this.text, this.x, this.y);
        } else if (this.type == "bird") {
            this.ctx.drawImage("../../images/bird.png", this.x, this.y, this.width, this.height);
        } else {
            this.ctx.rect(this.x, this.y, this.width, this.height);
            this.ctx.fill();
        }
    }

    // 计算组件新的位置，每一帧都要重新计算一次
    newPos() {
        // console.log('xSpeed=%d, ySpeed=%d, xAcc=%d, yAcc=%d', this.xSpeed, this.ySpeed, this.xAcc, this.yAcc);
        // 首先计算新的速度
        this.xSpeed += this.xAcc;
        this.ySpeed += this.yAcc;
        // 计算新的位置
        this.x += this.xSpeed;
        this.y += this.ySpeed;
        // 检测是否碰到了canvas边缘
        this.hitBoundary();
    }

    // 检测组件是否碰到了canvas边缘
    hitBoundary() {
        // 其实只检测了y轴的边界
        if (this.y < 0) {
            this.y = 0;
            this.ySpeed = 0;
            if (this.yAcc < 0) {
                this.yAcc = 0;
            }
        }

        let bottom = this.y + this.height;
        if (bottom > this.canvasHeight) {
            // 这里其实可能有个bug，就是假设组件的高度一定不会超过canvas的高度
            this.y = this.canvasHeight - this.height;
            this.ySpeed = 0;
            if (this.yAcc > 0) {
                this.yAcc = 0;
            }
        }
    }

    // 检测是否撞到了障碍物
    crashWith(otherobj) {
        let myleft = this.x;
        let myright = this.x + (this.width);
        let mytop = this.y;
        let mybottom = this.y + (this.height);
        let otherleft = otherobj.x;
        let otherright = otherobj.x + (otherobj.width);
        let othertop = otherobj.y;
        let otherbottom = otherobj.y + (otherobj.height);
        let crash = true;

        // 因为自己的角色是只鸟，形状不规则，碰撞检测很难搞，偷个懒
        if (this.type == 'bird') {
            myleft += 5;
            myright -= 5;
            mytop += 5;
            mybottom -= 5;
        }

        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }

    // ES6的set/get是个很让人费解的设计，跟java bean中的setter/getter不是一个概念
    // 在我看来更多的是弥补js对象没有private变量的不足
    // 当然不用这种蛋疼的写法也可以，我只是想试试新特性
    set newYAcc(acc) {
        this.yAcc = acc;
    }
}

export default Component;
