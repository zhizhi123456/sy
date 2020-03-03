// pages/generalcontract/detail/detail.js
import {
  referSave,
  cancelSave,
  getSaveDetail
} from '../../../../service/getData.js';
var app = getApp();
var util = require("../../../../utils/util");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    edit: false,
    info: {},
    steps: [],
    material_list: [],
    tab: "a",
  },
  // 返回
  return () {
    util.OAreturn('save');
  },
  // 新增明细表
  addndlink() {
    wx.redirectTo({
      url: "/OAmoudle/pages/save/newlink/newlink?id=" + this.data.info.ID+'&ChargeYM='+this.data.info.ChargeYM
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    });
    if (options.tab) {
      this.setData({
        tab: options.tab
      })
    }
    if (options.id) {
      referSave({
        ID: Number(options.id)
      }).then(res => {
        // console.log(res)
        if (res.code == 10000) {
          let item = res.Item;
          util.handleData(item, this, app.globalData.department);
          this.setData({
            info: item
          })
          // 调取明细表
          if (item.ChargeYM) {
            getSaveDetail({
              ChargeYM: item.ChargeYM
            }).then(res => {
              // console.log(res)
              if (res.code == 10000) {
                let item = res.List;
                util.listData(item, app.globalData.department);
                this.setData({
                  material_list: item.reverse()
                })
              }
            })
          }
          wx.hideLoading();
        }
      })
    }
  },
  // 删除
  delete() {
    let that = this;
    wx.showModal({
      content: '确认要删除吗？',
      success(res) {
        if (res.confirm) {
          cancelSave({
            ID: that.data.info.ID
          }).then(res => {
            if (res.code == 10000) {
              wx.showToast({
                title: '删除成功',
                icon: 'success',
                duration: 3000
              })
              setTimeout(function () {
                util.OAreturn('save');
              }, 1000)
            }
          })
        }
      }
    })
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