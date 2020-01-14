// pages/bill/detaillink/detaillink.js
import {
  detailapplyForsmall,
  delapplyForsmall,
  detailapplyFor
} from '../../../service/getData';
var app = getApp();
var util = require("../../../utils/util");
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
      url: "/pages/applyFor/detail/detail?id=" + this.data.info.applyid + "&table=c"
    })
  },
  delete() {
    util.expurgateDetail(this,delapplyForsmall,'applyFor',this.data.info.applyid)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    });
    if (options.detailid) {
      // 资料详情
      detailapplyForsmall({
        ID: options.detailid
      }).then(res => {
        if (res.code == 10000) {
          // console.log(res)
          let item = res.Item;
          util.handleData(item, this, app.globalData.department)
          this.setData({
            info: item
          })
          return detailapplyFor({
            ID: this.data.info.applyid
          })
        }
      }).then(res => {
        // console.log(res)
        let item = res.Item;
        util.handleData(item, this, app.globalData.department)
        this.setData({
          bill: item
        })
        wx.hideLoading();
      })
    }
  },

})