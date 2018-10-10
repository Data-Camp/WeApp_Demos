//index.js
//获取应用实例
var app = getApp()
var arr_name = ["美容", "减肥", "保健养生", "人群", "时节", "餐时", "器官", "调养",
                "肠胃消化", "孕产哺乳", "经期", "女性疾病", "男性", "呼吸道", "血管",
                "心脏", "肝胆脾胰", "神经系统", "口腔", "肌肉骨骼", "其他"]
var arr_link = [1, 10, 15, 52, 62, 68, 75, 82, 98, 112, 147, 161, 218, 166, 182,
                188, 192, 197, 202, 205, 212, 227, 132]
var file = "../../pages/list/list"
Page({
    data: {
        items: [{
            id: "1",
            src: "../../res/img/meirong.png",
            text: arr_name[0]
        }, {
            id: "10",
            src: "../../res/img/jianfei.png",
            text: arr_name[1]
        }, {
            id: "15",
            src: "../../res/img/jiankangyangsheng.png",
            text: arr_name[2]
        }, {
            id: "52",
            src: "../../res/img/renqun.png",
            text: arr_name[3]
        }, {
            id: "62",
            src: "../../res/img/shijie.png",
            text: arr_name[4]
        }, {
            id: "68",
            src: "../../res/img/canshi.png",
            text: arr_name[5]
        }, {
            id: "75",
            src: "../../res/img/qiguan.png",
            text: arr_name[6]
        }, {
            id: "82",
            src: "../../res/img/tiaoyang.png",
            text: arr_name[7]
        }, {
            id: "98",
            src: "../../res/img/chagnweixiaohua.png",
            text: arr_name[8]
        }, {
            id: "112",
            src: "../../res/img/yunchanpuru.png",
            text: arr_name[9]
        }, {
            id: "147",
            src: "../../res/img/jingqi.png",
            text: arr_name[10]
        }, {
            id: "161",
            src: "../../res/img/nvxingjibing.png",
            text: arr_name[11]
        }, {
            id: "218",
            src: "../../res/img/nanxing.png",
            text: arr_name[12]
        }, {
            id: "166",
            src: "../../res/img/huxidao.png",
            text: arr_name[13]
        }, {
            id: "182",
            src: "../../res/img/xueguan.png",
            text: arr_name[14]
        }, {
            id: "188",
            src: "../../res/img/xinzang.png",
            text: arr_name[15]
        }, {
            id: "192",
            src: "../../res/img/gandanpiy.png",
            text: arr_name[16]
        }, {
            id: "197",
            src: "../../res/img/shenjingxitong.png",
            text: arr_name[17]
        }, {
            id: "202",
            src: "../../res/img/kouqiang.png",
            text: arr_name[18]
        }, {
            id: "205",
            src: "../../res/img/jirouguge.png",
            text: arr_name[19]
        }, {
            id: "212",
            src: "../../res/img/qita.png",
            text: arr_name[20]
        }],
        url:file,
    },
})
