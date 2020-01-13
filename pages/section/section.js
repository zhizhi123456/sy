// pages/section/section.js
var app = getApp();
var util = require("../../utils/util");
import {
  employee,
} from "../../service/getData";
let userinfo = wx.getStorageSync("myInfo");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show_o: false,
    info: {},
    InfoList: [],
    activeKey: 0,
    content: true
  },
  return () {
    util.returnMenu(1002);
  },
  onChange(e) {
    this.setData({
      info: {}
    })
    let id = this.data.sections[e.detail].value;
    this.setData({
      dep: id,
      deptxt: this.data.sections[e.detail].text
    })
    employee({
      ID: id
    }).then(res => {
      this.setData({
        employee: util.getBase(res, "name", "userId")
      })
    })
  },
  //部门
  showPopup_o() {
    this.setData({
      show_o: true
    });
  },
  onClose_o() {
    this.setData({
      show_o: false
    });
  },
  onConfirm_o(e) {
    // console.log(e)
    let info = util.editInfo(e, this, e.detail.value.text);
    this.setData({
      info,
      show_o: false,
      activeKey: e.detail.index,
      dep: e.detail.value.value,
      deptxt: e.detail.value.text
    })
    employee({
      ID: e.detail.value.value
    }).then(res => {
      // console.log(res)
      let info = this.data.info;
      info.person = '';
      this.setData({
        info,
        employee: util.getBase(res, "name", "userId")
      })
    })
  },
  //员工
  showPopup_1() {
    if (!this.data.info.department) {
      wx.showToast({
        title: '请先选择部门',
        icon: 'none',
        duration: 2000
      })
      this.setData({
        show_1: false
      });
    } else if (this.data.employee[0]) {
      this.setData({
        show_1: true
      });
    } else {
      wx.showToast({
        title: '无员工信息',
        icon: 'none',
        duration: 2000
      })
    }
  },
  onClose_1() {
    this.setData({
      show_1: false
    });
  },
  onConfirm_1(e) {
    let info = util.editInfo(e, this, e.detail.value.text);
    this.setData({
      info,
      show_1: false,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    userinfo = wx.getStorageSync("myInfo");
    // console.log(options)
    if (userinfo) {
      let resStr = wx.getStorageSync("principal");
      if (resStr) {
        let sections = util.getBase(resStr, 'techofficename', 'ID');
        this.setData({
          sections
        })
      }
    } else {
      this.setData({
        content: false
      })
      wx.showToast({
        title: '请登录',
        icon: 'none',
        duration: 2000
      })
    }
    if (app.globalData.CountItem) {
      this.setData({
        // sections: app.globalData.department,
        employee: app.globalData.employee,
        Companytitle: app.globalData.Companytitle,
        dep: app.globalData.department[0].value,
        deptxt: app.globalData.department[0].text
      })
    } else {
      app.DataCallback = employ => {
        if (employ != '') {
          this.setData({
            // sections: app.globalData.department,
            employee: app.globalData.employee,
            Companytitle: app.globalData.Companytitle,
            dep: app.globalData.department[0].value,
            deptxt: app.globalData.department[0].text
          })
        }
      }
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