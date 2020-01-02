// pages/pact/pact.js
import {
  getPurchase,
  groupPurchase
} from '../../../service/getData.js';
var app = getApp();
var util = require("../../../utils/util");
let item, list;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    seach: '',
    loading: false,
    show: false,
    val: 0,
    currentDate: new Date().getTime(),
    title: '材料采购查询',
    InfoList: [],
    Supplier: [],
    info: {},
    show_time: false,
    show_endtime: false,
    item: [],
    pages: 1,
  },
  // 返回
  return () {
    util.returnMenu();
  },
  setSeach(e) {
    // console.log(e)
    this.setData({
      seach: e.detail.value
    })
  },
  // 模糊查询
  seachInfo() {
    list = [];
    wx.showLoading({
      title: '加载中',
    });
    this.setData({
      pages: 1
    })
    getPurchase({
      purchasecontactCode: this.data.seach
    }).then(res => {
      // console.log(res)
      if (res.code == 10000) {
        item = res.List;
        list = util.listData(item.reverse(), app.globalData.department, this.data.pages, list);
        this.setData({
          InfoList: list,
          item,
          seach: ''
        })
        wx.hideLoading();
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    list = [];
    if (app.globalData.CountItem) {
      this.setData({
        Supplier: app.globalData.Supplier
      })
    } else {
      app.DataCallback = employ => {
        if (employ != '') {
          this.setData({
            Supplier: app.globalData.Supplier
          })
        }
      }
    }
    wx.showLoading({
      title: '加载中',
    });
    // 调用查询
    getPurchase().then(res => {
      // console.log(res.List)
      if (res.code == 10000) {
        item = res.List;
        list = util.listData(item.reverse(), app.globalData.department, this.data.pages, list);
        this.setData({
          InfoList: list,
          item
        })
        // console.log(this.data.Times)
        wx.hideLoading();
      }
    }).catch(err => {
      console.log(err)
    })
  },
  showgroup() {
    this.setData({
      show: true
    })
  },
  onClose() {
    this.setData({
      show: false
    })
  },
  onConfirm_seach() {
    list = [];
    wx.showLoading({
      title: '加载中',
    });
    this.setData({
      pages: 1
    })
    if (this.data.info.begintime || this.data.info.supplier || this.data.info.purchasecontactCode) {
      groupPurchase(this.data.info).then(res => {
        if (res.code == 10000) {
          item = res.List;
          list = util.listData(item.reverse(), app.globalData.department, this.data.pages, list);
          this.setData({
            InfoList: list,
            item,
            info: {}
          })
          wx.hideLoading();
        }
      })
      this.setData({
        show: false
      })
    } else(
      wx.showToast({
        title: '请至少输入一项内容',
        icon: 'none',
        duration: 3000
      })
    )

  },
  // 组合查询
  // 供应商
  showPopup_0() {
    this.setData({
      show_0: true
    })
  },
  onClose_0() {
    this.setData({
      show_0: false
    })
  },
  onConfirm_0(e) {
    let info = util.editInfo(e, this, e.detail.value.text);
    this.setData({
      show_0: false,
      info
    })
  },
  // 采购编号
  purchasecontactCodeblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 开始时间
  showPopup_time() {
    this.setData({
      show_time: true
    })
  },
  onClose_time() {
    this.setData({
      show_time: false
    })
  },
  onConfirm_time(e) {
    let info = util.editInfo(e, this, util.datefomate(e.detail));
    this.setData({
      info,
      show_time: false
    })
  },
  // 结束时间
  showPopup_endtime() {
    this.setData({
      show_endtime: true
    })
  },
  onClose_endtime() {
    this.setData({
      show_endtime: false
    })
  },
  onConfirm_endtime(e) {
    let info = util.editInfo(e, this, util.datefomate(e.detail));
    this.setData({
      info,
      show_endtime: false
    })
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
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (item.length > 5 && list.length < item.length) {
      this.setData({
        loading: true
      })
      let pages = this.data.pages,
        n = Math.ceil(item.length / 5);
      if (n > pages) {
        setTimeout(() => {
          pages = pages + 1;
          list = util.listData(item, app.globalData.department, pages, list);
          this.setData({
            pages,
            InfoList: list,
          })
        }, 1000)
      }
    } else {
      this.setData({
        loading: false
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})