// pages/generalcontract/detail/detail.js
import {
  referContract,
  cancelContract,
} from '../../../service/getData.js';
var app = getApp();
var util = require("../../../utils/util");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    edit: false,
    info: {},
    steps: [],
    tab: 'a',
    returned: true,
    isreturn: true,
    hadNew: 1
  },
  // 返回
  return () {
    if (this.data.hadNew) {
      util.returnPrev('contract')
    } else {
      util.retPrev('contract')
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.hadNew) {
      this.setData({
        hadNew: Number(options.hadNew)
      })
    }
    wx.showLoading({
      title: '加载中',
    });
    if (options.id) {
      referContract({
        ID: options.id
      }).then(res => {
        // console.log(res)
        if (res.code == 10000) {
          let item = res.Item;
          util.handleData(item, this, app.globalData.department);
          this.setData({
            info: item
          })
          wx.hideLoading();
          // 调取工作流记录
          // console.log(res.Item.formid)
          //列表
          let mid = res.Item.formid;
          if (mid) {
            util.workList(this, mid)
          }
          //处理状态判断
          util.checkState(this, mid, 'subcontact', item.CurStepbh);
        }
      })
    }
  },
  // 工作流流转
  // 退回上步
  sendback() {
    util.Triggerflow(this, 'return', 'subcontact', 'contract')
  },
  // 提交下步
  putin() {
    util.Triggerflow(this, 'next', 'subcontact', 'contract')
  },
  delete() {
    // console.log(this.data.info)
    cancelContract({
      ID: this.data.info.ID
    }).then(res => {
      if (res.code == 10000) {
        wx.showToast({
          title: '删除成功',
          icon: 'success',
          duration: 3000
        })
        util.returnPrev('contract')
      }
    })
  },
  // 点击图片放大预览
  tap_pic(e) {
    util.preview(this, e)
  },
  defaultimg(e) {
    let info = util.defaultimg(e, this);
    this.setData({
      info
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