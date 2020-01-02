// pages/management/management.js
import {
  department,
  constPersonne
} from "../../../service/getData";
var util = require("../../../utils/util");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    staff: [],
    show11: false,
    info: {
      ID: ""
    },
    section10: []
  },
  showPopup10() {
    this.setData({
      show11: true
    });
  },
  onClose10() {
    this.setData({
      show11: false
    });
  },
  onConfirm10(e) {
    let info = util.editInfo(e, this, e.detail.value);
    app.globalData.department.forEach((s) => {
      if (s.text == info.ID) {
        info.ID = s.value
      }
    })
    this.setData({
      info,
      show11: false,
    })
    constPersonne({
      ID: this.data.info.ID
    }).then(res => {
      // console.log(res)
      if (res) {
        var s = JSON.parse(res)
      
        this.setData({
          staff: s
        })
        var info = this.data.info
        app.globalData.department.forEach((s) => {
          if (s.value == info.ID) {
            info.ID = s.text
          }
        })
        this.setData({
          info
        })
      }

    })

  },
  qingqiu() {
    //部门
    department().then(res => {
      // console.log(res)
      var w = JSON.parse(res)
      var q = w.map(s => {
        return s.techofficename
      })
      this.setData({
        section10: q
      })
    })
  },
  return () {
    wx.navigateBack({
      delta: 1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.qingqiu()
  },

})