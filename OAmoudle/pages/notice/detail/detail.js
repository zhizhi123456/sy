// / pages/generalcontract/detail/detail.js
import {
  detailnotice,
  delnotice
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
  // 文件
  up_photo() {
    wx.chooseImage({
      count: 9,
      // sourceType:"camera",
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        // //console.log(tempFilePaths)
      }
    })
  },
  tap_pic(e) {
    util.previews(this, e, this.data.info.cover)
  },
  defaultimg(e) {
    let info = util.defaultimg(e, this);
    this.setData({
      info
    })
  },
  // 返回
  return () {
    util.OAreturn('notice')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    });
    
    if (options.id) {
      detailnotice({
        ID: options.id
      }).then(res => {
        console.log(res)
        if (res.code == 10000) {
          let item = res.Item;
          if (item.cover) {
            item.cover = item.cover.split(",");
            this.setData({
              upimg: true
            })
          } else {
            item.cover = [];
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
    // //console.log(this.data.info)
    util.OAexpurgate(this, delnotice, 'notice')
  },
})