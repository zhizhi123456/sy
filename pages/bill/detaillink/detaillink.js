// pages/bill/detaillink/detaillink.js
import {
  cancelBdetail,
  referBdetail,
  referBill
} from '../../../service/getData';
var app = getApp();
var util = require("../../../utils/util");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    speak: '',
    show: false,
    info: {},
    bill: {},
    active: 0,
    steps: [],
    material_list: [],
  },
  // 返回
  return () {
    wx.redirectTo({
      url: "/pages/bill/detail/detail?tab=c&id=" + this.data.info.getmaterialid + '&rid=' + this.data.rid + '&title=' + this.data.title + (this.data.userid ? '&caption=' + this.data.caption + '&dep=' + this.data.dep + '&deptxt=' + this.data.deptxt + '&userid=' + this.data.userid : '')
    })
  },
  // add_speak() {
  //   this.setData({
  //     show: true
  //   })
  // },
  // onChange(e) {
  //   this.setData({
  //     show: false,
  //     speak: e.detail.value
  //   })
  // },
  delete() {
    cancelBdetail({
      ID: this.data.info.ID
    }).then(res => {
      // console.log(res)
      if (res.code == 10000) {
        wx.showToast({
          title: '删除成功',
          icon: 'success',
          duration: 3000
        })
        wx.redirectTo({
          url: "/pages/bill/detail/detail?tab=c&id=" + this.data.info.getmaterialid + '&rid=' + this.data.rid + '&title=' + this.data.title + (this.data.userid ? '&caption=' + this.data.caption + '&dep=' + this.data.dep + '&deptxt=' + this.data.deptxt + '&userid=' + this.data.userid : '')
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if (options.id || options.rid) {
      this.setData({
        rid: options.rid,
        title: options.title,
      })
    }
    if (options.userid) {
      this.setData({
        userid: options.userid,
        caption: options.caption,
        dep: options.dep,
        deptxt: options.deptxt,
        me: Number(options.me),
        applyT: Number(options.applyT)
      })
    }
    wx.showLoading({
      title: '加载中',
    });
    if (options.detailid) {
      // 资料详情
      referBdetail({
        ID: options.detailid
      }).then(res => {
        if (res.code == 10000) {
          // console.log(res)
          let item = res.Item;
          util.handleData(item, this, app.globalData.department);
          this.setData({
            info: item
          })
          return referBill({
            ID: this.data.info.getmaterialid
          })
        }
      }).then(res => {
        let Bitem = res.Item;
        util.handleData(Bitem, this, app.globalData.department);
        this.setData({
          bill: Bitem
        })
        wx.hideLoading();
      })
    }
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