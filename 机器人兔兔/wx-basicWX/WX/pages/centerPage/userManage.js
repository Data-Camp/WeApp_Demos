Page({
    data:{
        focus: false,
        inputValue:''
    },
    formSubmit: function(e) {
      console.log('form发生了submit事件，携带数据为：', e.detail.value)
    },
    formReset: function() {
      console.log('form发生了reset事件')
    }
})