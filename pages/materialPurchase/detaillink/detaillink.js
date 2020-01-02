// pages/bill/detaillink/detaillink.js
import {
  cancelPdetail,
  referPdetail,
  referPurchase
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
      url: "/pages/materialPurchase/detail/detail?id=" + this.data.info.purchasecontactId + "&tab=c"
    })
  },
  delete() {
    cancelPdetail({
      ID: this.data.info.ID
    }).then(res => {
      console.log(res)
      if (res.code == 10000) {
        wx.showToast({
          title: '删除成功',
          icon: 'success',
          duration: 3000
        })
        wx.redirectTo({
          url: "/pages/materialPurchase/detail/detail?id=" + this.data.info.purchasecontactId + "&tab=c"
        })
      }
    })
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
      referPdetail({
        ID: options.detailid
      }).then(res => {
        if (res.code == 10000) {
          // console.log(res)
          this.setData({
            info: res.Item
          })
          return referPurchase({
            ID: this.data.info.purchasecontactId
          })
        }
      }).then(res => {
        // console.log(res)
        this.setData({
          bill: res.Item
        })
        wx.hideLoading();
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})