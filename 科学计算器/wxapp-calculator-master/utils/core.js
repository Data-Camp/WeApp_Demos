
function onAccelerometerChange() {
    wx.onAccelerometerChange(function(res) {
        console.log(res.x)
        console.log(res.y)
        console.log(res.z)
        this.output(["","",'x:'+res.x,'y:'+res.y,'z:'+res.z],true);
    })
}

function showToast() {
    wx.showToast({
      title: '加载中',//String 提示的内容
      icon: 'loading',//图标，只支持"success"、"loading"
      duration: 1000,//提示的延迟时间，单位毫秒，默认：1500, 最大为10000
      success:function(e){
        //接口调用成功的回调函数
      },
      fail:function(e){
        //接口调用失败的回调函数
      },
      complete:function(e){
        //接口调用结束的回调函数（调用成功、失败都会执行）
      }
    })
}

function showModal() {
    wx.showModal({
      title: '提示',//String 提示的标题
      content: '这是一个模态弹窗',//String	提示的内容
      showCancel:true,//是否显示取消按钮，默认为 true
      cancelText:'取消按钮',//String	取消按钮的文字，默认为"取消"
      cancelColor:'#E64340', //HexColor	取消按钮的文字颜色，默认为"#000000"
      confirmText:'确定按钮',//String	确定按钮的文字，默认为"确定"
      confirmColor:'#1AAD19',  //HexColor	确定按钮的文字颜色，默认为"#3CC51F"
      success: function(res) {
        //接口调用成功的回调函数，返回res.confirm==1时，表示用户点击确定按钮
        if (res.confirm) {
          console.log('用户点击确定')
        }else{
          console.log('用户点击取消')
        }
      },
      fail:function(e){
        //接口调用失败的回调函数
      },
      complete:function(e){
        //接口调用结束的回调函数（调用成功、失败都会执行）
      }
    })
}

function showActionSheet() {
    wx.showActionSheet({
      itemList: ['一', '二', '三','四','五','六'],//String Array 按钮的文字数组，数组长度最大为6个
      itemColor:'#1AAD19',//HexColor	按钮的文字颜色，默认为"#000000"
      success: function(res) {
        if (!res.cancel) {
          console.log(res.tapIndex)
        }
      },
      fail:function(e){
        //接口调用失败的回调函数
      },
      complete:function(e){
        //接口调用结束的回调函数（调用成功、失败都会执行）
      }
    })
}

function demo() {

}
 
module.exports = {
  onAccelerometerChange:onAccelerometerChange,
  showToast:showToast,
  showModal:showModal,
  showActionSheet:showActionSheet,
}
