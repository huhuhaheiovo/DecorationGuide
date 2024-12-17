Page({
  data: {
    area: '',
    windowArea: '',
    bathroom: 1,
    cityType: '',
    renovationType: '',
    plumbingType: '',
    heatingBrand: '',
    houseType: '',
    tileType: '',
    wallType: '',
    needBalcony: null,
    balconyArea: '',
    balconyType: '',
    ceilingType: '',
    customType: ''
  },

  handleAreaInput(e) {
    this.setData({
      area: e.detail.value
    });
  },

  handleWindowInput(e) {
    this.setData({
      windowArea: e.detail.value
    });
  },

  increaseBathroom() {
    if (this.data.bathroom < 5) {
      this.setData({
        bathroom: this.data.bathroom + 1
      });
    }
  },

  decreaseBathroom() {
    if (this.data.bathroom > 1) {
      this.setData({
        bathroom: this.data.bathroom - 1
      });
    }
  },

  selectCity(e) {
    const type = e.currentTarget.dataset.type;
    this.setData({
      cityType: type
    });
  },

  selectRenovation(e) {
    const type = e.currentTarget.dataset.type;
    this.setData({
      renovationType: type
    });
  },

  selectPlumbing(e) {
    const type = e.currentTarget.dataset.type;
    this.setData({
      plumbingType: type
    });
  },

  selectHeatingBrand(e) {
    const type = e.currentTarget.dataset.type;
    this.setData({
      heatingBrand: type
    });
  },

  selectHouseType(e) {
    const type = e.currentTarget.dataset.type;
    this.setData({
      houseType: type
    });
  },

  selectTileType(e) {
    const type = e.currentTarget.dataset.type;
    this.setData({
      tileType: type
    });
  },

  selectWallType(e) {
    const type = e.currentTarget.dataset.type;
    this.setData({
      wallType: type
    });
  },

  selectNeedBalcony(e) {
    const need = e.currentTarget.dataset.need === 'true';
    this.setData({
      needBalcony: need,
      balconyArea: need ? this.data.balconyArea : '',
      balconyType: need ? this.data.balconyType : ''
    });
  },

  handleBalconyAreaInput(e) {
    this.setData({
      balconyArea: e.detail.value
    });
  },

  selectBalconyType(e) {
    const type = e.currentTarget.dataset.type;
    this.setData({
      balconyType: type
    });
  },

  selectCeilingType(e) {
    const type = e.currentTarget.dataset.type;
    this.setData({
      ceilingType: type
    });
  },

  selectCustomType(e) {
    const type = e.currentTarget.dataset.type;
    this.setData({
      customType: type
    });
  },

  nextStep() {
    if (!this.data.houseType) {
      wx.showToast({
        title: '请选择房屋类型',
        icon: 'none'
      });
      return;
    }

    if (!this.data.area) {
      wx.showToast({
        title: '请输入建筑面积',
        icon: 'none'
      });
      return;
    }


    if (!this.data.cityType) {
      wx.showToast({
        title: '请选择城市类别',
        icon: 'none'
      });
      return;
    }

    if (!this.data.renovationType) {
      wx.showToast({
        title: '请选择拆改范围',
        icon: 'none'
      });
      return;
    }

    if (!this.data.plumbingType) {
      wx.showToast({
        title: '请选择水电改造方案',
        icon: 'none'
      });
      return;
    }

    if (!this.data.heatingBrand) {
      wx.showToast({
        title: '请选择地暖品牌',
        icon: 'none'
      });
      return;
    }

    if (!this.data.tileType) {
      wx.showToast({
        title: '请选择地面铺贴材料',
        icon: 'none'
      });
      return;
    }

    if (!this.data.wallType) {
      wx.showToast({
        title: '请选择墙面装修方案',
        icon: 'none'
      });
      return;
    }

    if (this.data.needBalcony === null) {
      wx.showToast({
        title: '请选择是否需要封阳台',
        icon: 'none'
      });
      return;
    }

    if (this.data.needBalcony) {
      if (!this.data.balconyArea) {
        wx.showToast({
          title: '请输入阳台面积',
          icon: 'none'
        });
        return;
      }

      if (!this.data.balconyType) {
        wx.showToast({
          title: '请选择封阳台材料',
          icon: 'none'
        });
        return;
      }
    }

    if (!this.data.ceilingType) {
      wx.showToast({
        title: '请选择吊顶方案',
        icon: 'none'
      });
      return;
    }

    if (!this.data.customType) {
      wx.showToast({
        title: '请选择定制产品材料',
        icon: 'none'
      });
      return;
    }

    // 保存数据到全局
    getApp().globalData.surveyData = {
      houseType: this.data.houseType,
      area: this.data.area,
      windowArea: this.data.windowArea,
      bathroom: this.data.bathroom,
      cityType: this.data.cityType,
      renovationType: this.data.renovationType,
      plumbingType: this.data.plumbingType,
      heatingBrand: this.data.heatingBrand,
      tileType: this.data.tileType,
      wallType: this.data.wallType,
      needBalcony: this.data.needBalcony,
      balconyArea: this.data.balconyArea,
      balconyType: this.data.balconyType,
      ceilingType: this.data.ceilingType,
      customType: this.data.customType
    };

    // 跳转到试算页面
    wx.navigateTo({
      url: '../trial/index'
    });
  }
}); 