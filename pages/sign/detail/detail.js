// pages/sign/detail/detail.js// pages/generalcontract/detail/detail.js
import {
  detailSign
} from '../../../service/getData.js';
var app = getApp();
var util = require("../../../utils/util");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    info: {},
  },
  // 返回
  return () {
    util.returnPrev('sign');

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    detailSign({
      ID: options.id
    }).then(res => {
      if (res.code == 10000) {
        this.setData({
          info: res.Item
        })
      }
    })
  }
})