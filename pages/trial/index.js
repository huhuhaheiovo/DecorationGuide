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
    surveyData: null,
    priceData: {
      // 墙面价格（每平米）
      wall: {
        'normal': 65, // 常规乳胶漆
        'partial': 95, // 局部艺术漆壁布
        'full': 145 // 全房艺术漆壁布
      },
    }

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
    const surveyData = getApp().globalData.surveyData;
    this.setData({ surveyData }, () => {
      this.calculatePrices();
    });
  },

  calculatePrices: function() {
    const { surveyData, priceData } = this.data;
    const area = parseFloat(surveyData.area);
    
    // 修改水电改造费用计算
    let plumberCost = 0;
    switch(surveyData.plumbingType) {
      case 'basic':
        plumberCost = area * 40; // 全部断点改造：建筑面积 × 40元/㎡
        break;
      case 'standard':
        plumberCost = area * 50; // 电线断点改造冷水热水全部重新铺设：建筑面积 × 50元/㎡
        break;
      case 'luxury':
        plumberCost = area * 80; // 全房重新铺设水电：建筑面积 × 80元/㎡
        break;
      case 'premium':
        plumberCost = area * 130; // 全房水电重新铺设加全屋智能：建筑面积 × 130元/㎡
        break;
    }
    
    // 修改地暖费用计算
    let heatingCost = 0;
    if (surveyData.heatingBrand === 'domestic') {
      heatingCost = area * 70; // 国产品牌：建筑面积 × 70元/㎡
    } else if (surveyData.heatingBrand === 'imported') {
      heatingCost = area * 110; // 进口品牌：建筑面积 × 110元/㎡
    }
    
    // 修改地面铺贴���用计算
    let tileCost = 0;
    switch(surveyData.tileType) {
      case 'normal':
        tileCost = area * 150; // 普通瓷砖：建筑面积 × 150元/㎡
        break;
      case 'brand':
        tileCost = area * 170; // 品牌瓷砖：建筑面积 × 170元/㎡
        break;
      case 'luxury':
        tileCost = area * 230; // 高档品牌瓷砖：建筑面积 × 230元/㎡
        break;
    }
    
    // 计算墙面费用
    const wallCost = area * priceData.wall[surveyData.wallType];
    
    // 修改吊顶费用计算
    let ceilingCost = 0;
    switch(surveyData.ceilingType) {
      case 'basic':
        ceilingCost = area * 10; // 厨卫集成吊顶其余不吊顶：建筑面积 × 10元/㎡
        break;
      case 'standard':
        ceilingCost = area * 90; // 客餐厅卧室普通吊顶：建筑面积 × 90元/㎡
        break;
      case 'luxury':
        ceilingCost = area * 150; // 客餐厅卧室艺术吊顶：建筑面积 × 150元/㎡
        break;
    }
    
    // 修改封阳台费用计算
    let balconyCost = 0;
    if (surveyData.needBalcony && surveyData.balconyArea) {
      const balconyArea = parseFloat(surveyData.balconyArea);
      switch(surveyData.balconyType) {
        case '60': 
          balconyCost = balconyArea * 400; // 60断桥铝：400元/㎡
          break;
        case '90': 
          balconyCost = balconyArea * 500; // 90断桥铝：500元/㎡
          break;
        case '110': 
          balconyCost = balconyArea * 650; // 110断桥铝：650元/㎡
          break;
      }
    }
    
    // 修改拆改费用计算逻辑
    let dismantleCost = 0;
    if (surveyData.renovationType === '房屋局部微调') {
      dismantleCost = area * 22; // 局部微调筑面积 × 22元/㎡
    } else {
      dismantleCost = area * 100; // 结构调整：建筑面积 × 100元/㎡
    }

    // 修改卫生间防水费用计算
    const waterproofCost = surveyData.bathroom * 900; // 每个卫生间900元

    // 修改定制产品费用计算
    let customCost = 0;
    switch(surveyData.customType) {
      case 'normal':
        customCost = area * 220; // 大众板材：建筑面积 × 220元/㎡
        break;
      case 'brand':
        customCost = area * 280; // 品牌板材：建筑面积 × 280元/㎡
        break;
      case 'wood':
        customCost = area * 350; // 实木板材：建筑面积 × 350元/㎡
        break;
    }

    // 修改室内门费用计算
    let doorCost = 0;
    const doorCount = surveyData.doorCount;
    switch(surveyData.doorType) {
      case 'normal':
        doorCost = doorCount * 1000; // 普通门：1000元/扇
        break;
      case 'medium':
        doorCost = doorCount * 3000; // 二线品牌：3000元/扇
        break;
      case 'high':
        doorCost = doorCount * 5000; // 一线品牌：5000元/扇
        break;
    }

    // 修改卫浴费用计算
    let bathroomCost = 0;
    const bathroomCount = surveyData.bathroom;
    switch(surveyData.bathroomType) {
      case 'normal':
        bathroomCost = bathroomCount * 2000; // 普通产品：2000元/间
        break;
      case 'medium':
        bathroomCost = bathroomCount * 5000; // 二线品牌：5000元/间
        break;
      case 'high':
        bathroomCost = bathroomCount * 8000; // 一线品牌：8000元/间
        break;
    }

    // 修改灯具费用计算
    let lightCost = 0;
    switch(surveyData.lightType) {
      case 'normal':
        lightCost = area * 20; // 普通照明：建筑面积 × 20元/㎡
        break;
      case 'creative':
        lightCost = area * 50; // 创意造型：建筑面积 × 50元/㎡
        break;
    }

    // 计算基础总价
    const baseTotal = plumberCost + heatingCost + tileCost + wallCost + 
                     ceilingCost + balconyCost + customCost + dismantleCost + 
                     waterproofCost + doorCost + bathroomCost + lightCost; // 添加灯具费用

    // 根据城市类别调整总价
    let finalTotal = baseTotal;
    switch(surveyData.cityType) {
      case '北上广深':
        finalTotal = baseTotal * 1.1;
        break;
      case '一线城市':
        finalTotal = baseTotal;
        break;
      case '二线城市':
        finalTotal = baseTotal * 0.95;
        break;
      case '其他':
        finalTotal = baseTotal * 0.9;
        break;
    }

    // 更新所有费用数据
    this.setData({
      plumber: Math.round(plumberCost),
      dn: Math.round(heatingCost),
      floor_tile: Math.round(tileCost),
      wall: wallCost,
      suspended_ceiling: Math.round(ceilingCost),
      acreage_yt_cost: Math.round(balconyCost),
      whole_house_customization: Math.round(customCost),
      dismantle_cost: Math.round(dismantleCost),
      waterproof: waterproofCost,
      door: Math.round(doorCost),
      bathroom_cost: Math.round(bathroomCost), // 添加卫浴费用
      light_cost: Math.round(lightCost), // 添加灯具费用
      sum_list: Math.round(finalTotal)
    });
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
  },

  handleJoinGroup() {
    wx.setClipboardData({
      data: 'z406739684',  // 设计师微信号
      success: () => {
        wx.showModal({
          title: '微信号已复制',
          content: '添加设计师微信，邀请您加入交流群',
          confirmText: '好的',
          showCancel: false,
          success: (res) => {
            if (res.confirm) {
              console.log('用户点击确定');
            }
          },
          // 自定义弹窗样式
          confirmColor: '#008b28', // 确认按钮颜色
          className: 'custom-modal' // 自定义类名
        });
      }
    });
  }
})