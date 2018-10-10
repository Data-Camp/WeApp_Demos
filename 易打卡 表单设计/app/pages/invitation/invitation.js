Page({
  data: {
    invitation: '',
    modalHidden: true
  },
  changeInput: function (e) {
    this.setData({
      invitation: e.detail.value
    })
  },
  modalChange: function (e) {
    this.setData({
      modalHidden: true
    })
  },
  next: function () {
    var invitation = this.data.invitation;

    if (/^[A-Za-z0-9]{24}$/.test(invitation)) {
      wx.navigateTo({
        url: '/pages/add/add?taskID=' + invitation,
        success: function(res){
          // success
        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
        }
      })
    } else {
      this.setData({
          modalHidden: false
      });
    }
  }
})