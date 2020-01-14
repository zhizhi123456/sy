// pages/generalcontract/detail/detail.js
import {
  referLedger,
  cancelLedger,
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
    steps: []
  },
  // 文件
  up_photo() {
    wx.chooseImage({
      count: 9,
      // sourceType:"camera",
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        // console.log(tempFilePaths)
      }
    })
  },
  // 返回
  return () {
    util.returnPrev('ledger')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    });
    if (options.id) {
      referLedger({
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
        }
      })
    }
  },
  // 删除
  delete() {
    // console.log(this.data.info)
    util.expurgate(this, cancelLedger, 'ledger')
  },
})