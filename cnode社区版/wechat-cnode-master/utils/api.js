'use strict';
// api 路径
var HOST = 'https://cnodejs.org/api/v1';
// get /topics 主题首页
var topics = HOST + '/topics';
//get /topic/:id 主题详情
var topic = HOST + '/topic';
// post /accesstoken 验证 accessToken 的正确性
var accesstoken = HOST + '/accesstoken';
// post /topic_collect/collect 收藏主题
var collect = HOST + '/topic_collect/collect';
// post /topic_collect/de_collect 取消主题
var de_collect = HOST + '/topic_collect/de_collect';
// post /reply/:reply_id/ups 为评论点赞
function reply (id) {
  return HOST + "/reply/"+ id +"/ups"
}

// get请求方法
function fetchGet(url, callback) {
  // return callback(null, top250)
  wx.request({
    url: url,
    header: { 'Content-Type': 'application/json' },
    success (res) {
      callback(null, res.data)
    },
    fail (e) {
      console.error(e)
      callback(e)
    }
  })
}

// post请求方法
function fetchPost(url, data, callback) {
  wx.request({
    method: 'POST',
    url: url,
    data: data,
    success (res) {
      callback(null, res.data)
    },
    fail (e) {
      console.error(e)
      callback(e)
    }
  })
}

module.exports = {
  // API
  topics: topics,
  topic: topic,
  accesstoken: accesstoken,
  collect: collect,
  de_collect: de_collect,
  reply: reply,


  // METHOD
  fetchGet: fetchGet,
  fetchPost: fetchPost


}
