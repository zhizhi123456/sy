// pages/personaldetails/personaldetails.js
import {
  changeinfo,
  only,
  upimg
} from "../../service/getData";
var app = getApp();
var util = require("../../utils/util");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    NOedit: true,
    info: {}
  },
  return () {
    wx.switchTab({
      url: '/pages/mine/mine'
    })
  },
  // 数据绑定
  UserName(e) {
    if (e.detail.value) {
      if (e.detail.value != this.data.info.UserName) {
        only({
          username: e.detail.value
        }).then(res => {
          // console.log(res)
          if (res.code == 10000) {
            if (res.value) {
              let info = util.editInfo(e, this, e.detail.value);
              this.setData({
                info
              })
            } else {
              wx.showToast({
                title: '用户名已存在',
                icon: "none",
                duration: 2000
              })
            }
          }
        })
      }
    } else {
      wx.showToast({
        title: '用户名不可为空',
        icon: "none",
        duration: 2000
      })
    }
  },
  MobilePIN(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  Email(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  Memo(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  EmpName(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  EmpCode(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  edituserconfirm() {
    let info = this.data.info;
    info.LUD = app.globalData.time;
    this.setData({
      info
    })
    let infodata = {
      Timestamp: app.globalData.time,
      ...this.data.info
    }
    // console.log(infodata)
    changeinfo(infodata).then(res => {
      // console.log(res)
      if (res.code == 10000) {
        wx.setStorageSync("myInfo", this.data.info)
        // 转到个人中心
        wx.showToast({
          title: '信息更改成功',
          icon: "success",
          duration: 2000
        })
        setTimeout(function () {
          wx.switchTab({
            url: '/pages/mine/mine'
          })
        }, 1000)
      }
    })
  },
  // 头像上传
  getHimg() {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album'],
      success(res) {
        console.log(res)
        const tempFilePaths = res.tempFilePaths[0];
       
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.NOedit) {
      this.setData({
        NOedit: !this.data.NOedit
      })
    }
    let myInfo = wx.getStorageSync("myInfo");
    if (myInfo) {
      this.setData({
        info: myInfo
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