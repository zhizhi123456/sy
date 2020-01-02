// pages/section/section2.js
var util = require("../../utils/util");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menu: [{
        name: "分包项目",
        menuId: null,
        icon: 'icon-zhaotoubiao',
        path: '/pages/subcontract/pact/pact'
      },
      {
        name: "分包合同",
        menuId: null,
        icon: 'icon-fenbaohetong',
        path: '/pages/contract/pact/pact'
      },
      {
        name: "费用",
        menuId: null,
        icon: 'icon-feiyong1',
        path: '/pages/cost/pact/pact'
      },
      {
        name: "考勤",
        menuId: null,
        icon: 'icon-kaoqin2',
        path: ''
      },
      {
        name: "定位",
        menuId: null,
        icon: 'icon-renyuandingwei',
        path: '/pages/location/location'
      },
      {
        name: "轨迹",
        menuId: null,
        icon: 'icon-guiji1',
        path: '/pages/track/track'
      }
    ]
  },
  return () {
    if (this.data.title == "我") {
      util.returnMenu();
    } else {
      wx.redirectTo({
        url: '/pages/section/section'
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    if (options) {
      this.setData({
        title: options.name,
        userid: options.userid,
        dep: options.dep,
        deptxt: options.deptxt
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

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