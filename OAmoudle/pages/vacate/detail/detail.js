// pages/generalcontract/detail/detail.js
import {
  referVacate,
  cancelVacate,
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
    tab: 'a',
    returned: true,
    isreturn: true,
  },
  // 返回
  return () {
    util.OAreturn('vacate');
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    });
    if (options.id) {
      referVacate({
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
          let mid = res.Item.formid;
          util.workList(this, mid, 'leaveapplyform');
          //处理状态判断
          util.checkState(this, mid, 'leaveapplyform', item.CurStepbh);
        }
      })
    }
  },
  // 工作流流转
  // 退回上步
  sendback() {
    util.Triggerflow(this, 'return', 'leaveapplyform', 'vacate', '', '', '', '', '', '', 'oa')
  },
  // 提交下步
  putin() {
    util.Triggerflow(this, 'next', 'leaveapplyform', 'vacate', '', '', '', '', '', '', 'oa')
  },
  // 删除
  delete() {
    let that = this;
    wx.showModal({
      content: '确认要删除吗？',
      success(res) {
        if (res.confirm) {
          cancelVacate({
            ID: that.data.info.ID
          }).then(res => {
            if (res.code == 10000) {
              wx.showToast({
                title: '删除成功',
                icon: 'success',
                duration: 3000
              })
              setTimeout(function () {
                util.OAreturn('vacate');
              }, 1000)
            }
          })
        }
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