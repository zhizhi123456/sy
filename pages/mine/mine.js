// pages/mine/mine.js
var util = require("../../utils/util");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userinfo: {}
  },
  return(){
    util.returnMenu();
  },
  goenter() {
    wx.redirectTo({
      url: '/pages/login/login'
    })
  },
  quit() {
    if (this.data.userinfo.ID) {
      wx.showModal({
        content: '是否登出当前账号？',
        success(res) {
          if (res.confirm) {
            // console.log('用户点击确定')
            wx.removeStorageSync("myInfo");
            wx.redirectTo({
              url: '/pages/login/login'
            })
          }
        }
      })
    }
  },
  changeuserinfo() {
    if (this.data.userinfo.ID) {
      wx.redirectTo({
        url: '/pages/personaldetails/personaldetails?NOedit=had'
      })
    }
  },
  show_info() {
    if (this.data.userinfo.ID) {
      wx.redirectTo({
        url: '/pages/personaldetails/personaldetails'
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let myInfo = wx.getStorageSync("myInfo");
    if (myInfo) {
      this.setData({
        userinfo: myInfo
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