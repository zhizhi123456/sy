// pages/workrecord/detail/detail.js
import {
  
  detailfollow,
  delfollow,
  // 工作流
  record,
  flow,
  Role, //角色
} from '../../../service/getData.js';
var util = require("../../../utils/util");
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isnext:true,
    Workstate:"",
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
    wx.redirectTo({
      url: "/pages/workrecord/pact/pact"
    })
  },
  preimg(e) {
    console.log(e.currentTarget.dataset.img)
    var url = e.currentTarget.dataset.img
    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: [url] // 需要预览的图片http链接列表
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
      detailfollow({
        Timestamp: app.globalData.time,
        ID: options.id
      }).then(res => {
        // console.log(res)
        if (res.code == 10000) {
          let item = res.Item;
          util.handleData(item, this, app.globalData.department)
          // util.outflow(item,this)
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
    util.expurgate(this, delfollow, 'workrecord')
  },
})