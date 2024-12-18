wx.showShareMenu({
  withShareTicket: true,
  menus: ['shareAppMessage', 'shareTimeline']
})
// index.js
Page({
  data: {},
  // 按钮点击事件处理函数
  navigateToTarget: function () {
    wx.navigateTo({
      url: '../survey/index',
      success: function (res) {
        console.log('页面跳转成功');
      },
      fail: function (err) {
        console.error('页面跳转失败', err);
      }
    });
  },

  contactDesigner: function() {
    // 复制设计师微信号到剪贴板
    wx.setClipboardData({
      data: 'z406739684',  // 替换为实际的设计师微信号
      success: function() {
        wx.showToast({
          title: '微信号已复制',
          icon: 'success',
          duration: 2000
        });
      }
    });
  }
})
