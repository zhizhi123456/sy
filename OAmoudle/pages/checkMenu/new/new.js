// pages/new/new.js
import Toast from 'vant-weapp/dist/toast/toast';
import {
  addMenu,
  amendMenu,
  referMenu
} from "../../../../service/getData";
var util = require("../../../../utils/util");
var app = getApp();
let userinfo = wx.getStorageSync("myInfo");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    info: {},
  },
  //   ID: 2093
  // PID: 2088
  // icon: "icon-keshihuajianguan
  // ↵"
  // menuId: null
  // name: "工程监管"
  // pageaddres: null
  // 组织架构编码
  nameblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 组织架构名称
  iconblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  confirm() {
    if (this.data.next) {
      this.setData({
        'info.PID': this.data.pevInfo.ID,
      })
    }else{
      this.setData({
        'info.PID':1
      })
    }
    if (this.data.info.name && this.data.info.icon) {
      addMenu(this.data.info).then(res => {
        if (res.code == 10000) {
          wx.showToast({
            title: '新建成功',
            icon: 'success',
            duration: 3000
          })
          util.OAreturn('checkMenu');
        }
      })
    } else {
      Toast({
        message: '请填写必填项',
        mask: true
      });
    }
  },
  // 返回
  return () {
    util.OAreturn('checkMenu');
  },
  // 编辑页面的确定和返回
  editreturn() {
    util.OAreturn('checkMenu', this);
  },
  editconfirm() {
    amendMenu(this.data.info).then(res => {
      if (res.code == 10000) {
        wx.showToast({
          title: '编辑成功',
          icon: 'success',
          duration: 3000
        })
        util.OAreturn('checkMenu', this);
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    userinfo = wx.getStorageSync("myInfo");
    if (options.next && options.id) {
      this.setData({
        next: true
      })
      referMenu({
        ID: options.id
      }).then(res => {
        let item = res.Item;
        this.setData({
          pevInfo: item,
        })
      })
    } else if (options.id) {
      referMenu({
        ID: options.id
      }).then(res => {
        let item = res.Item;
        this.setData({
          info: item
        })
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