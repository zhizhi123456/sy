// pages/detail/detail.js
import {
  cancelBill,
  referBill,
  getBdetail
} from '../../../service/getData';
var app = getApp();
var util = require("../../../utils/util");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    edit: false,
    speak: '',
    show: false,
    info: {},
    active: 0,
    steps: [],
    material_list: [],
    tab: "a",
    returned: true,
    isreturn: true,
  },
  // 返回
  return () {
    util.returnPrev('bill');
  },
  add_speak() {
    this.setData({
      show: true
    })
  },
  onChange(e) {
    this.setData({
      show: false,
      speak: e.detail.value
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
    // console.log(this.data.info)
  },
  delete() {
    cancelBill({
      ID: this.data.info.ID
    }).then(res => {
      // console.log(res)
      if (res.code == 10000) {
        wx.showToast({
          title: '删除成功',
          icon: 'success',
          duration: 3000
        })
        util.returnPrev('bill')
      }
    })
  },
  // 新增明细表
  addndlink() {
    wx.redirectTo({
      url: "/pages/bill/newlink/newlink?id=" + this.data.info.ID
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    });
    if (options.id) {
      // 资料详情
      referBill({
        ID: options.id
      }).then(res => {
        if (res.code == 10000) {
          let item = res.Item;
          util.handleData(item, this, app.globalData.department);
          this.setData({
            info: item
          })
          wx.hideLoading();
          // 调取工作流记录
          //列表
          let mid = res.Item.formid;
          if (mid) {
            util.workList(this, mid)
          }
          //处理状态判断
          util.checkState(this, mid, 'getmaterial', item.CurStepbh);
        }
      })
      // 领料单关联的明细列表
      getBdetail({
        getmaterialid: options.id
      }).then(res => {
        // console.log(res)
        if (res.code == 10000) {
          let item = res.List;
          util.listData(item, app.globalData.department);
          this.setData({
            material_list: item.reverse()
          })
        }
      }).catch(err => {
        console.log(err)
      })
    }
    if (options.tab) {
      this.setData({
        tab: options.tab
      })
    }
  },
  // 工作流流转
  // 退回上步
  sendback() {
    util.Triggerflow(this, 'return', 'getmaterial', 'bill')
  },
  // 提交下步
  putin() {
    util.Triggerflow(this, 'next', 'getmaterial', 'bill')
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