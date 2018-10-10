const API = 'https://api.getweapp.com/engine/'
const appId = '583ff823c1707517361e36b1'

const get = (cmd, params, callback) => {
    params.appId = appId
    wx.request({
        url: API+cmd,
        data: params,
         header: {
      'content-type': 'application/json'
        },
        success: (res) => {
            if(typeof(callback) == 'function')
                callback(res.data)
        }
    })
}

const post = (cmd, params, callback) => {
    params.appId = appId
    wx.request({
        url: API+cmd,
        method: 'POST',
        data: params,
         header: {
      'content-type': 'application/json'
        },
        success: (res) => {
            if(typeof(callback) == 'function')
                callback(res.data)
        }
    })
}

const upload = (cmd, params, callback) => {
    wx.uploadFile({
      url: API+cmd,
      header: {
      'content-type': 'application/json'
        },
      filePath: params.file,
      name: 'file',
      formData: {
        appId: appId
      },
      success: (res) => {
          if(typeof(callback) == 'function')
                callback(JSON.parse(res.data))
      }
    })
}

export default {
    get: get,
    post: post,
    upload: upload
}