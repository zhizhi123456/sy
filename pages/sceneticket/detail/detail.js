// pages/generalcontract/detail/detail.js
import {

  detailticket,
  delticket,
  // 工作流
  record,
  flow,
  Role,
} from '../../../service/getData.js';
var util = require("../../../utils/util");
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    edit: false,
    info: {},
    steps: [],
    upimg: false
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
  // 点击图片放大预览
  tap_pic(e) {
    util.preview(this, e)
  },
  defaultimg(e) {
    let info = util.defaultimg(e, this);
    this.setData({
      info
    })
  },
  // 返回
  return () {
    wx.redirectTo({
      url: "/pages/sceneticket/pact/pact"
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
      detailticket({
        Timestamp: app.globalData.time,
        ID: options.id
      }).then(res => {
        // console.log(res)
        if (res.code == 10000) {
          let item = res.Item;
          util.handleData(item, this, app.globalData.department)
         
          if (item.Ranks) {
            Role().then(res1 => {
              var ress = JSON.parse(res1)
              ress.forEach((m) => {
                if (item.Ranks == m.Key) {
                  //  console.log(m.Value)
                  item.Ranks = m.Value
                  // console.log( value.Ranks)
                }
              })
              // 回调函数 请求完毕后赋值
              this.setData({
                info: item
              })
              wx.hideLoading();
            })
          } else {
            this.setData({
              info: item
            })
            wx.hideLoading();
          }
        }
      })
    }
  },
  // 删除
  delete() {
    util.expurgate(this, delticket, 'sceneticket')
  },
})