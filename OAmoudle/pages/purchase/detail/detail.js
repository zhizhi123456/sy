// pages/generalcontract/detail/detail.js
import {
  referPurchase,
  cancelPurchase,
  getPdetail
} from '../../../../service/getData';
var app = getApp();
var util =  require("../../../../utils/util");
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
    returned: true,
    isreturn: true,
  },
  // 返回
  return () {
    util.OAreturn('purchase')
  },
  // 新增明细表
  addndlink() {
    wx.redirectTo({
      url: "/OAmoudle/pages/purchase/newlink/newlink?id=" + this.data.info.ID
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.tab) {
      this.setData({
        tab: options.tab
      })
    }
    wx.showLoading({
      title: '加载中',
    });
    if (options.id) {
      referPurchase({
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
          util.workList(this, mid, 'purchasecontact');
          //处理状态判断
          util.checkState(this, mid, 'purchasecontact', item.CurStepbh);
        }
      })
      // 调取明细表
      getPdetail({
        purchasecontactId: options.id
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
  },
  // 工作流流转
  // 退回
  sendback() {
    util.Triggerflow(this, 'return', 'purchasecontact', 'purchase', '', '', '', '', '', '', 'oa')
  },
  // 审核通过
  putin() {
    util.Triggerflow(this, 'next', 'purchasecontact', 'purchase', '', '', '', '', '', '', 'oa')
  },
  // 删除
  delete() {
    util.OAexpurgate(this, cancelPurchase, 'purchase')
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