// pages/new/new.js
import Toast from 'vant-weapp/dist/toast/toast';
import {
  addPlan,
  referPlan,
  amendPlan,
  Engineer
} from "../../../service/getData";
var util = require("../../../utils/util");
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    info: {},
    currentDate: new Date().getTime(),
    show: false,
    show1: false,
    show2: false,
    show3: false,
    show_time: false,
    show_time1: false,
  },
  // 统计年月
  showPopup() {
    this.setData({
      show: true
    })
  },
  onClose() {
    this.setData({
      show: false
    })
  },
  onConfirm(e) {
    // console.log(e)
    let info = util.editInfo(e, this, e.detail.value.text);
    this.setData({
      info,
      show: false
    })
  },
  // 统计项目
  showPopup1() {
    this.setData({
      show1: true
    })
  },
  onClose1() {
    this.setData({
      show1: false
    })
  },
  onConfirm1(e) {
    // console.log(e)
    let info = util.editInfo(e, this, e.detail.value.text);
    this.setData({
      info,
      show1: false
    })
  },
  // 统计周期开始
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
  // 统计周期结束
  showPopup_time1() {
    this.setData({
      show_time1: true
    })
  },
  onClose_time1() {
    this.setData({
      show_time1: false
    })
  },
  onConfirm_time1(e) {
    let info = util.editInfo(e, this, util.datefomate(e.detail));
    this.setData({
      info,
      show_time1: false
    })
  },
  // 工程类别
  showPopup2() {
    this.setData({
      show2: true
    })
  },
  onClose2() {
    this.setData({
      show2: false
    })
  },
  onConfirm2(e) {
    let info = util.editInfo(e, this, e.detail.value.text);
    this.setData({
      info,
      show2: false,
    })
    Engineer({
      ID: e.detail.value.ID
    }).then(res => {
      this.setData({
        Engineer:util.getBase(res, "Value", "Key")
      })
    })
  },
  // 工程进度
  showPopup3() {
    this.setData({
      show3: true
    })
  },
  onClose3() {
    this.setData({
      show3: false
    })
  },
  onConfirm3(e) {
    // console.log(e)
    let info = util.editInfo(e, this, e.detail.value.text);
    this.setData({
      info,
      show3: false,
    })
  },
  // 工程量
  EngineerQuantblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  confirm() {
    if (this.data.info.CountYearMonth && this.data.info.CountItem) {
      let info = this.data.info;
      util.checkContent(info, this);
      this.setData({
        info
      })
      addPlan(this.data.info).then(res => {
        // console.log(res)
        if (res.code == 10000) {
          wx.showToast({
            title: '新建成功',
            icon: 'success',
            duration: 3000
          })
          util.returnPrev('plan');
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
    util.returnPrev('plan');
  },
  // 编辑页面的确定和返回
  editreturn() {
    util.returnPrev('plan', this);
  },
  editconfirm() {
    let info = this.data.info;
    util.checkChange(info, this, app.globalData.department);
    this.setData({
      info
    })
    // console.log(infodata)
    amendPlan(this.data.info).then(res => {
      // console.log(res)
      if (res.code == 10000) {
        wx.showToast({
          title: '编辑成功',
          icon: 'success',
          duration: 3000
        })
        util.returnPrev('plan', this);
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      EngineerClass: app.globalData.EngineerClass,
      CountYear: app.globalData.CountYear,
      Engineer: app.globalData.Engineer,
      CountItem: app.globalData.CountItem
    })
    if (options.id) {
      referPlan({
        ID: options.id
      }).then(res => {
        // console.log(res)
        let item = res.Item;
        util.handleData(item, this, app.globalData.department);
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