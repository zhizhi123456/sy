// pages/pact/pact.js
import {
  getuser,
  Resetpassword,
  Islocked
} from '../../../../service/getData';
var app = getApp();
var util = require("../../../../utils/util");
let userinfo = wx.getStorageSync("myInfo");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    seach: '',
    loading: false,
    // top: '用户管理',
    InfoList: [],
  },
  // 返回
  return () {
    let menus = wx.getStorageSync('menus');
    util.returnMenu(menus.id);
  },
  setSeach(e) {
    this.setData({
      seach: e.detail.value
    })
  },
  // 模糊查询
  seachInfo() {
    wx.showLoading({
      title: '加载中',
    });
    getuser({
      UserName: this.data.seach
    }).then(res => {
      if (res.code == 10000) {
        this.setData({
          InfoList: res.List,
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
    userinfo = wx.getStorageSync("myInfo");
    if (options.id) {
      wx.setStorageSync('menus', options)
    }
    wx.showLoading({
      title: '加载中',
    });
    getuser().then(res => {
      if (res.code == 10000) {
        this.setData({
          InfoList: res.List
        })
        wx.hideLoading();
      }
    })
  },
  //重置密码
  Reset(e) {
    let id = e.currentTarget.dataset.id;
    Resetpassword({
      ID: id
    }).then(res => {
      if (res.code == 10000) {
        wx.showToast({
          title: '密码重置成功！',
          icon: 'success',
          duration: 3000
        })
        setTimeout(function () {
          util.OAreturn('userControl');
        }, 1000)
      }
    })
  },
  //锁定
  Islocked(e) {
    let id = e.currentTarget.dataset.id,
      content = e.currentTarget.dataset.content;
    Islocked({
      ID: id
    }).then(res => {
      if (res.code == 10000) {
        wx.showToast({
          title: content,
          icon: 'success',
          duration: 3000
        })
        setTimeout(function () {
          util.OAreturn('userControl');
        }, 1000)
      }
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
    userinfo = wx.getStorageSync("myInfo");
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
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})