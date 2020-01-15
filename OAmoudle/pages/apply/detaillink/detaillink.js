// pages/bill/detaillink/detaillink.js
import {
  detailapplysmall,
  delapplysmall,
  detailapply
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
      url: "/pages/apply/detail/detail?id=" + this.data.info.applybuyid + "&table=c"
    })
  },
  delete() {
  util.expurgateDetail(this,delapplysmall,'apply',this.data.info.applybuyid)
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
      detailapplysmall({
        ID: options.detailid
      }).then(res => {
        if (res.code == 10000) {
          // console.log(res)
          let item = res.Item;
          util.handleData(item, this, app.globalData.department)
          this.setData({
            info: item
          })
          return detailapply({
            ID: this.data.info.applybuyid
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