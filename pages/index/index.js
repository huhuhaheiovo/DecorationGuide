// index.js
Page({
  data: {},
  // 按钮点击事件处理函数
  navigateToTarget: function () {
    wx.navigateTo({
      url: '../trial/index', // 目标页面路径
      success: function (res) {
        console.log('页面跳转成功');
      },
      fail: function (err) {
        console.error('页面跳转失败', err);
      }
    });
  }
  
})
