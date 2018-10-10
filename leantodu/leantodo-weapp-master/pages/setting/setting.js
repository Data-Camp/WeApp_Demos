const { User } = require('../../utils/leancloud-storage');

Page({
  data: {
    user: null,
    username: '',
    password: '',
    error: null,
  },
  onLoad: function() {
    this.setData({
      user: User.current(),
    });
  },
  updateUsername: function ({
    detail: {
      value
    }
  }) {
    this.setData({
      username: value
    });
  },
  updatePassword: function ({
    detail: {
      value
    }
  }) {
    this.setData({
      password: value
    });
  },
  save: function () {
    this.setData({
      error: null,
    });
    const { username, password } = this.data;
    const user = User.current();
    if (username) user.set({ username });
    if (password) user.set({ password });
    user.save().then(() => {
      wx.showToast({
        title: '更新成功',
        icon: 'success',
      });
    }).catch(error => {
      this.setData({
        error: error.message,
      });
    });
  }
});