Page({
    data: {
        hidden: false,
        toastHidden: true,
        modalHidden: true,
        toastText: "数据无法正常显示，请将此问题上报管理员进行处理",
        loadingText: "加载中..."
    },

    onLoad: function (options) {
        that = this;
        if (options == null || options.publishTime == null || options.publishTime.split("-").length != 3) {
            this.setData({hidden: true, toastHidden: false});
            return;
        }

        requestData(options.publishTime.split("-"));
    },

    onImageClick: function (event) {
        this.setData({modalHidden: false})
    },

    onSaveClick: function (event) {
        saveIamge();
    },

    onCancelClick: function (event) {
        this.setData({modalHidden: true});
    },

    onToastChanged: function (event) {
        this.setData({toastHidden: true});
    }
});

var that;
var mIamgeUrl = "";
var mVideoUrl = "";

/**
 * 请求数据
 * @param that Page的对象，用其进行数据的更新
 */
function requestData(timeArray) {
    wx.request({
        url: Constant.BASE_URL + "/history/content/day/" + timeArray[0] + "/" + timeArray[1] + "/" + timeArray[2],
        header: {
            "Content-Type": "application/json"
        },
        success: function (res) {
            if (res == null ||
                res.data == null ||
                res.data.results == null ||
                res.data.results.length <= 0) {

                console.error(Constant.ERROR_DATA_IS_NULL);
                return;
            }
            parseHtml(res.data.results[0].content);
        }
    });
}

function saveIamge() {
    that.setData({
        hidden: false,
        toastHidden: true,
        modalHidden: true,
        loadingText: "下载中..."
    });
    wx.downloadFile({
        url: mIamgeUrl,
        type: 'image',
        success: function (res) {
            console.log("download success");
            that.setData({
                hidden: true,
                toastHidden: false,
                toastText: "图片已成功下载"
            });
        },
        fail: function (res) {
            console.log("download fail");
            that.setData({
                hidden: true,
                toastHidden: false,
                toastText: "下载失败，请重试"
            });
        },
    })
}

/**
 * 解析html块。
 * 这里应该还有挺大的优化空间，但是我对js确实不熟悉，只能用这种笨方法了
 * @param htmlBlock
 */
function parseHtml(htmlBlock) {

    //这边图片的URL解析同main.js中
    var re = new RegExp("[a-zA-z]+://[^\"]*");
    var title = htmlBlock.split("img alt=")[1].match(re)[0];

    if(-1 != title.search("//ww")){
        mIamgeUrl = title.replace("//ww","//ws");
    }else{
        mIamgeUrl = title;
    }

    var tags = [];
    var items = [];

    var doc = Util.parseHtml(htmlBlock);
    var tagElements = doc.getElementsByTagName("ul");
    console.log(doc);
    console.log(tagElements);
    var i = 0;
    for (; i < tagElements.length; i++) {
        var value = tagElements[i];
        if (value.innerText.trim().length == 0) {
            continue;
        }
        var valueChildren = value.children;
        var j = 0;
        var singleItems = [];
        for (; j < valueChildren.length; j++) {
            var singleItem = [];
            singleItem.push(valueChildren[j].innerText.trim());
            singleItem.push(valueChildren[j].children[0].href.trim());
            singleItems.push(singleItem);
        }
        items.push(singleItems);
    }

    var h3s = doc.getElementsByTagName("h3");
    var i = 0;
    for (; i < h3s.length; i++) {
        tags.push(h3s[i].innerText);
    }

    if (tags.length != items.length) {
        console.log("not right");
    }

    var finalData = [];

    var i = 0;
    for (; i < tags.length; i++) {
        var node = [];
        node.push(tags[i]);
        node.push(items[i]);
        finalData.push(node);
    }

    //将获得的各种数据写入itemList，用于setData
    var itemList = [];
    for (var i = 0; i < tags.length; i++) {
        var singleItemList = [];
        for (var j = 0; j < items[i].length; j++) {
            singleItemList.push({title: items[i][j][0], url: items[i][j][1]});
            if (i == tags.length - 1) {
                mVideoUrl = items[i][j][1];
            }
        }
        itemList.push({tag: tags[i], singleItems: singleItemList});
    }

    that.setData({
        data: itemList,
        imageUrl: mIamgeUrl,
        videoUrl: mVideoUrl,
        hidden: true
    });
    console.log(finalData);
}

var Constant = require('../../utils/constant.js');
var Util = require('../../utils/util.js');