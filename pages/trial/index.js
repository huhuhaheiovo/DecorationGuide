// pages/trial/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page_number: 1,
    pickerHidden: true,
    from_style1: 'display: black;',
    from_style2: 'display: none;',
    from_style3: 'display: none;',
    chosen: '',
    // 建筑面积
    acreage: '',
    //阳台面积
    acreage_yt: '',
    //阳台费用
    acreage_yt_cost: 0,
    //拆除费用
    dismantle_cost: 0,
    //铺设地暖
    dn: 0,
    costData:0,
    //水电改造
    plumber: 0,
    //卫生间防水,
    waterproof: 0,
    //吊顶
    suspended_ceiling: 0,
    //地墙砖铺贴
    floor_tile: 0,
    //墙面乳胶漆
    wall: 0,
    
    //厨卫集成吊顶
    integrated_ceiling: 0,
    //全屋定制橱柜
    whole_house_customization: 0,
    //室内门
    door: 0,
    //合计
    sum_list: 0,
    inputStyle: '',
    acreageError: '',

  },
  view_next: function () {
    console.log("下一页")
    var pageNumber = this.data.page_number;
    var acreage = this.data.acreage;
    
    if (pageNumber == 1) {
      if (acreage == null || acreage == '' || acreage == 0) {
        this.setData({
          inputStyle: 'border: 2px solid red;',
          acreageError: '建筑面积不能为空'
        });
        return
      }
      if (acreage < 70 || acreage > 150) {
        this.setData({
          inputStyle: 'border: 2px solid red;',
          acreageError: '价格预估适用于，建筑面积大于70小于150'
        });
        return
      }
      this.setData({
        from_style1: 'display: none;',
        from_style2: 'display: black;',
        from_style3: 'display: none;',
        page_number: this.data.page_number + 1,
        plumber: acreage * 55,
        waterproof: 800,
        suspended_ceiling: acreage * 90,
        floor_tile: acreage * 160
      })
    }

    this.summarizing();

    if (pageNumber == 2) {
      var a = 20 + 10 * ((acreage - 90) / 30)
      a = parseFloat(a.toFixed(2));
      this.setData({
        from_style1: 'display: none;',
        from_style2: 'display: none;',
        from_style3: 'display: black;',
        page_number: this.data.page_number + 1,
        wall: 65 * acreage,
        integrated_ceiling: 500 + 1200,
        whole_house_customization: a * 800 + 5000,
        door: 5 * 1000 + 1500
      })
    }

    this.setData({
      sum_list: this.data.acreage_yt_cost + this.data.dismantle_cost + this.data.dn + this.data.plumber + this.data.waterproof + this.data.suspended_ceiling + this.data.floor_tile + this.data.wall + this.data.integrated_ceiling + this.data.whole_house_customization + this.data.door
    })
  },

  view_up: function () {
    console.log("上一页")
    var pageNumber = this.data.page_number;

    if (pageNumber == 3) {
      this.setData({
        from_style1: 'display: none;',
        from_style2: 'display: black;',
        from_style3: 'display: none;',
        page_number: this.data.page_number - 1
      })
    }

    if (pageNumber == 2) {
      if (this.data.acreage == null || this.data.acreage == '' || this.data.acreage == 0) {
        this.setData({
          inputStyle: 'border: 2px solid red;',
          acreageError: '建筑面积不能为空'
        });
        return
      }
      this.setData({
        from_style1: 'display: black;',
        from_style2: 'display: none;',
        from_style3: 'display: none;',
        page_number: this.data.page_number - 1
      })
    }


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  onShareAppMessage() {
    return {
      title: 'form',
      path: 'page/component/pages/form/form'
    }
  },



  pickerConfirm(e) {
    this.setData({
      pickerHidden: true
    })
    this.setData({
      chosen: e.detail.value
    })
  },

  pickerCancel() {
    this.setData({
      pickerHidden: true
    })
  },

  pickerShow() {
    this.setData({
      pickerHidden: false
    })
  },

  formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },

  formReset(e) {
    console.log('form发生了reset事件，携带数据为：', e.detail.value)
    this.setData({
      chosen: ''
    })
  },

  acreage(e) {
    const v = e.detail.value;
    if (v == null || v == '') {
      this.setData({
        inputStyle: 'border: 2px solid red;',
        acreageError: '建筑面积不能为空'
      });
    } else {
      this.setData({
        inputStyle: '',
        acreageError: '',
        acreage: v,
        dismantle_cost: 1800,
        dn: v * 75
      });
    }
  },
  //封阳台
  fyt(e) {
    const v = e.detail.value;
    const acreage = this.data.acreage;
    var dismantle_cost = 0
    if (acreage <= 90) {
      dismantle_cost = 1800
    } else if ((acreage > 90 && acreage <= 120)) {
      dismantle_cost = 2800
    }
    if (v != null && v != '') {
      this.setData({
        acreage_yt_cost: v * 500
      });
    }

  },
  // 拆除和砸墙
  chai_za() {
    console.log("拆除和砌墙")
  },

  summarizing: function() {
    if(this.data.page_number==3){
    // 收集所有费用数据
    const costData = {
      items: [
        { title: '建筑面积', value: this.data.acreage + '㎡' },
        { title: '封阳台', value: '¥' + this.data.acreage_yt_cost },
        { title: '拆除和砌墙', value: '¥' + this.data.dismantle_cost },
        { title: '铺设地暖', value: '¥' + this.data.dn },
        { title: '水电改造', value: '¥' + this.data.plumber },
        { title: '卫生间防水', value: '¥' + this.data.waterproof },
        { title: '吊顶', value: '¥' + this.data.suspended_ceiling },
        { title: '地墙砖铺贴', value: '¥' + this.data.floor_tile },
        { title: '墙面乳胶漆', value: '¥' + this.data.wall },
        { title: '厨卫集成吊顶', value: '¥' + this.data.integrated_ceiling },
        { title: '全屋定制', value: '¥' + this.data.whole_house_customization },
        { title: '灯具门窗', value: '¥' + this.data.door }
      ],
      totalAmount: this.data.sum_list
    };

    // 将数据存储到全局数据
    getApp().globalData.costData = costData;
    // 跳转到结果页
    wx.navigateTo({
      url: '/pages/result/index'
    });
    }
  }
})