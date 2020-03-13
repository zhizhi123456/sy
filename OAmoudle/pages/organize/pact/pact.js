// OAmoudle/pages/organize/pact/pact.js
import {
  getStruct,
  getStructLevel,
  getStructCode,
  cancelStruct
} from '../../../../service/getData.js';
var app = getApp();
var util = require("../../../../utils/util");
let userinfo = wx.getStorageSync("myInfo");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    n: 1,
    activeNames: '1',
    val: 0,
    tier: [{
      text: '请选择',
      value: 0
    }],
    info: {
      StructLevel: 0,
      OrganizStructName: ''
    }
  },
  changeItem(e) {
    this.setData({
      'info.StructLevel': e.detail
    })
    this.seachInfo();
  },
  setSeach(e) {
    this.setData({
      'info.OrganizStructName': e.detail.value
    })
  },
  seachInfo() {
    wx.showLoading({
      title: '加载中',
    });
    getStruct(this.data.info).then(res => {
      if (res.code == 10000) {
        this.setData({
          InfoList: res.List,
        })
        wx.hideLoading();
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id || options.rid) {
      wx.setStorageSync('menus', options)
    }
    this.seachInfo();
    getStructLevel().then(res => {
      if (res.code == 10000) {
        let tier = this.data.tier,
          list = res.List;
        list.forEach((element, index) => {
          tier.push({
            text: '第' + (index + 1) + '层',
            value: index + 1
          })
        });
        this.setData({
          tier
        })
      }
    })
  },
  getsubset(code) {
    getStructCode({
      OrganizStructCode: code
    }).then(res => {
      if (res.code == 10000) {
        this.setData({
          depLIst: res.List
        })
      }
    })
  },
  lookItem(e) {
    let code = e.currentTarget.dataset.code,
      i = e.currentTarget.dataset.i;
    let n = this.data.n;
    n++;
    this.setData({
      n
    })
    this.getsubset(code);
    if (this.data.n % 2) {
      this.setData({
        activeNames: 0
      })
    } else {
      this.setData({
        activeNames: i
      })
    }
  },
  delItem(e) {
    let that = this;
    wx.showModal({
      content: '确认要删除吗？',
      success(res) {
        if (res.confirm) {
          cancelStruct({
            ID: e.currentTarget.dataset.i
          }).then(res => {
            if (res.code == 10000) {
              wx.showToast({
                title: '删除成功',
                icon: 'success',
                duration: 3000
              })
              setTimeout(function () {
                util.OAreturn('organize');
              }, 1000)
            }
          })
        }
      }
    })
  },
  return () {
    let menus = wx.getStorageSync('menus');
    util.returnMenu2(menus.id, menus.title);
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