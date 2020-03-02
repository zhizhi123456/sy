// pages/bill/detaillink/detaillink.js
import {
  detailProjectPaysmall,
  delProjectPaysmall,
  detailProjectPay
} from '../../../../service/getData';
var app = getApp();
var util = require("../../../../utils/util");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    speak: '',
    show: false,
    info: {},
    bill: {},
    active: 0,
    steps: [],
    material_list: [],
  },
  // 返回
  return () {
    wx.redirectTo({
      url: "/OAmoudle/pages/ProjectPay/detail/detail?id=" + this.data.bigid + "&table=c"
    })
  },
  delete() {
    util.OAexpurgateDetail(this,delProjectPaysmall,'ProjectPay',this.data.bigid)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    });
    console.log(options)
    if (options.detailid) {
      // 资料详情
      this.setData({
        bigid:options.detailids
      })
      detailProjectPaysmall({
        ID: options.detailid
      }).then(res => {
        if (res.code == 10000) {
          // console.log(res)
          let item = res.Item;
          util.handleData(item, this, app.globalData.department)
          this.setData({
            info: item
          })
          wx.hideLoading();
        }
      })
    }
  },

})