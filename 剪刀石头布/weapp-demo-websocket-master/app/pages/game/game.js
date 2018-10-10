"use strict"; 

// 引入 co 和 promisify 帮助我们进行异步处理
const co = require('../../lib/co.js');
const promisify = require('../../lib/promisify.js');

// 生成随机用户 ID
const uuid = require('../../lib/uuid.js');

// 支持 SocketIO
const WxSocketIO = require('../../lib/wxsocket.io.js');

// 小程序配置
const appConfig = require('../../config.js');

// 需要使用的微信 API，转成返回 Promise 的接口
const login = promisify(wx.login);
const getUserInfo = promisify(wx.getUserInfo);
const getSystemInfo = promisify(wx.getSystemInfo);

// 获得小程序实例
const app = getApp();

// 定义页面
Page({
    data: {
        // 是否已经和服务器连接并且完成 hello-hi 交流
        connected: false,

        // 游戏是否进行中
        playing: false,

        // 当前游戏状态
        gameState: "uninitialized",

        // 当前需要展示的游戏信息
        gameInfo: "",

        // 开始游戏按钮文本
        startButtonText: "开始",

        //「我」的信息，包括昵称、头像、分数、选择
        myName: "",
        myAvatar: null,
        myScore: 0,
        myStreak: 0,
        myChoice: Math.floor(Math.random() * 10000) % 3 + 1,

        //「你」的信息
        youHere: false,
        yourName: "",
        yourAvatar: null,
        yourScore: 0,
        yourStreak: 0,
        yourChoice: 1,
        yourMove: 0,

        // 取得胜利的是谁
        win: null
    },

    // 页面显示后，进行登录和链接，完成后开始启动游戏服务
    onShow: co.wrap(function *() {
        try {
            yield this.login();
            yield this.connect();
        } catch (error) {
            console.error('error on login or connect: ', error);
        }
        
        this.serve();
    }),

    // 微信登录后获得用户信息
    login: co.wrap(function *() {
        this.setData({ gameInfo: "正在登陆" });
        const loginResult = yield login();
        const userInfo = yield getUserInfo();
        const { nickName, avatarUrl } = userInfo.userInfo;
        this.setData({ myName: nickName, myAvatar: avatarUrl })
    }),

    // 链接到服务器后进行 hi-hello 握手
    connect: co.wrap(function *() {
        this.setData({ gameInfo: "正在连接"});

        const socket = this.socket = new WxSocketIO();
        try {
            yield socket.connect(`wss://${appConfig.host}${appConfig.socketPath}/`);
        } catch (connectError) {
            console.error({ connectError });
            this.setData({ gameInfo: "连接错误" });
            throw connectError;
        }

        return new Promise((resolve, reject) => {
            const { myName, myAvatar } = this.data;

            // when i say hello server should response hi
            socket.on('hi', packet => {
                console.log(packet.message);
                resolve();
            });
            socket.emit('hello', {
                user: {
                    uid: this.uid = uuid(),
                    uname: myName,
                    uavatar: myAvatar
                }
            });
            this.setData({ gameInfo: "准备", connected: true });
        })
    }),

    // 开始进行游戏服务
    serve: co.wrap(function *() {
        const socket = this.socket;

        // 游戏开始，初始化对方信息，启动计时器
        socket.on('start', packet => {
            const you = packet.roomUsers.find(user => user.uid !== this.uid);

            this.setData({
                youHere: true, 
                yourName: you.uname,
                yourAvatar: you.uavatar,
                playing: true,
                gameInfo: "准备"
            });

            let gameTime = packet.gameTime;
            clearInterval(this.countdownId);
            this.countdownId = setInterval(() => {
                if (gameTime > 0) {
                    this.setData({ gameInfo: --gameTime });
                } else {
                    clearInterval(this.countdownId);
                }
            }, 1000);

            this.socket.emit('choice', { choice: this.data.myChoice });
        });

        // 对方有动静的时候，触发提醒
        let movementTimer = 0;
        const movementTimeout = 300;
        socket.on('movement', packet => {
            const lastMove = this.lastMove;

            this.setData({ yourMove: lastMove == 1 ? 2 : 1 });

            clearTimeout(movementTimer);
            movementTimer = setTimeout(() => {
                this.lastMove = this.data.yourMove;
                this.setData({ yourMove: 0 });
            }, 300);
        });

        // 服务器通知结果
        socket.on('result', packet => {
            
            // 清除计时器
            clearInterval(this.countdownId);

            // 双方结果
            const myResult = packet.result.find(x => x.uid == this.uid);
            const yourResult = packet.result.find(x => x.uid != this.uid);

            // 本局结果
            let gameInfo, win = 'nobody';
            if (myResult.roundScore == 0 && yourResult.roundScore == 0) {
                gameInfo = '平局';
            }
            else if (myResult.roundScore > 0) {
                gameInfo = '胜利';
                win = 'me';
            }
            else {
                gameInfo = '失误';
                lose = true;
                win = 'you'
            }

            // 更新到视图
            this.setData({
                gameInfo,
                myScore: myResult.totalScore,
                myStreak: myResult.winStreak,
                yourChoice: yourResult.choice,
                yourScore: yourResult.totalScore,
                yourStreak: yourResult.winStreak,
                gameState: 'finish',
                win,
                startButtonText: win == 'you' ? "不服" : "再来", 
                done: true
            });

            setTimeout(() => this.setData({ playing: false }), 1000);
        });
    }),

    // 点击开始游戏按钮，发送加入游戏请求
    startGame: co.wrap(function *() {
        if (this.data.playing) return;
        const socket = this.socket;
        this.setData({
            playing: false,
            done: false,
            gameInfo: '正在寻找玩伴...' 
        });
        socket.emit('join');
    }),

    // 点击手势，更新选择是石头、剪刀还是布
    switchChoice(e) {
        if (!this.data.playing) return;
        let myChoice = this.data.myChoice + 1;
        if (myChoice == 4) {
            myChoice = 1;
        }
        this.setData({ myChoice });
        this.socket.emit('choice', { choice: myChoice });
    }
});
