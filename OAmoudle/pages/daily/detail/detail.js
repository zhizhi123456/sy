// / pages/generalcontract/detail/detail.js
import {
  detaildaily,
  deldaily
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
    steps: []
  },
  tap_pic(e) {
    util.preview(this, e)
  },
  defaultimg(e) {
    let info = util.defaultimg(e, this);
    this.setData({
      info
    })
  },
  downF(e) {
    util.lookFileIDEA(e);
  },
  // 返回
  return () {
    // util.OAreturn('daily')
    if (this.data.history) {
      util.OAreturn('daily', this);
    } else {
      util.OAreturn('daily');
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    });
    if (!options.history) {
      wx.setStorageSync('history', '')
    }
    this.setData({
      history: options.history
    })
    util.readRecordlist('dailylog', options.id, this, '工作日志')
    if (options.id) {
      detaildaily({
        ID: options.id
      }).then(res => {
        console.log(res)
        if (res.code == 10000) {
          let item = res.Item;
          var history = wx.getStorageSync("history")
          if (history) {
            item = history
          }
          util.handleData(item, this, app.globalData.department);
          util.outflow(item, this)
          this.setData({
            info: item
          })
          
          wx.hideLoading();

        }
      })
    }
  },
  // 删除
  delete() {
    util.OAexpurgate(this, deldaily, 'daily')
  },
  change12(e) {
    console.log(e)
    if (e.currentTarget.dataset.i) {
      // console.log(JSON.parse(e.currentTarget.dataset.i))
      wx.setStorageSync('history', JSON.parse(e.currentTarget.dataset.i))
      wx.redirectTo({
        url: '/OAmoudle/pages/daily/detail/detail?history=5&id=' + JSON.parse(e.currentTarget.dataset.i).ID
      })
    }
  },
})