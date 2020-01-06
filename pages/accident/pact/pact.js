// pages/generalcontract/pact/pact.js
import {
  queryaccident
} from '../../../service/getData.js';
var app = getApp();
var util = require("../../../utils/util");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    seach: '',
    loading: false,
    val: 0,
    pact: [{
        text: '全部重大工程质量事故报告',
        value: 0
      },
      {
        text: '我的重大工程质量事故报告',
        value: 1
      }
    ],
    InfoList: []
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
    wx.showLoading({
      title: '加载中',
    });
    queryaccident({
      projectcode: this.data.seach
    }).then(res => {
      // console.log(res)
      if (res.code == 10000) {
        let item = res.List;
        util.listData(item, app.globalData.department);
        this.setData({
          InfoList: item.reverse()
        })
        wx.hideLoading();
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    });
    // 调用查询
    queryaccident().then(res => {
      // console.log(res.List)
      if (res.code == 10000) {
        let item = res.List;
        util.listData(item, app.globalData.department);
        // util.outflow(item,this)
        this.setData({
          InfoList: item.reverse()
        })
        wx.hideLoading();
      }
    }).catch(err => {
      console.log(err)
    })
  },

})