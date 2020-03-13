// pages/pact/pact.js
import {
  designP
} from '../../../../service/getData.js';
var app = getApp();
var util = require("../../../../utils/util");
let item, list;
Page({
  /**
   * 页面的初始数据
   */
//   已完成任务Completed: 2
// 平均综合积分Comprehensive: 76
// 设计人员名称designman: "小明"
// difficulty: 1
// 在做任务doing: 1
// harmonizecost: 0
// installcost: 0
// materialcost: 0
// profit: NaN
// projectcost: 0
// rate: "NaN%"
// totalCost: 0
  data: {
    seach: '',
    loading: false,
    top: '市场设计绩效',
    InfoList: [],
    item: [],
    pages: 1,
  },
  // 返回
  return () {
    let menus = wx.getStorageSync('menus');
    util.returnMenu2(menus.id, menus.title);
  },
  setSeach(e) {
    // console.log(e)
    this.setData({
      seach: e.detail.value
    })
  },
  // 模糊查询
  seachInfo() {
    list = [];
    wx.showLoading({
      title: '加载中',
    });
    this.setData({
      pages: 1
    })
    designP({
      designman: this.data.seach
    }).then(res => {
      // console.log(res)
      if (res.code == 10000) {
        item = res.List;
        list = util.listData(item.reverse(), app.globalData.department, this.data.pages, list,this,'designtaskSynthesize');
        this.setData({
          InfoList: list,
          item,
          seach: ''
        })
        wx.hideLoading();
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id) {
      wx.setStorageSync('menus', options)
    }
    if (options.source) {
      wx.setStorageSync('carte', options)
    }
    list = [];
    wx.showLoading({
      title: '加载中',
    });
    // 调用查询
    designP().then(res => {
      console.log(res.List)
      if (res.code == 10000) {
        item = res.List;
        list = util.listData(item.reverse(), app.globalData.department, this.data.pages, list,this,'designtaskSynthesize');
        this.setData({
          InfoList: list,
          item
        })
        wx.hideLoading();
      }
    }).catch(err => {
      console.log(err)
    })
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
  onPullDownRefresh: function () {},

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