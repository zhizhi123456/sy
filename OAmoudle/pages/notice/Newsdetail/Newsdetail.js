import {
  detailnotice,
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
    steps: [],
    oa: false
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
    if (this.data.oa) {
      wx.redirectTo({
        url: '/pages/contracts/contracts?grading=2090&title=公司oa项目'
      })
    } else {
      wx.redirectTo({
        url: `/OAmoudle/pages/notice/News/News`
      })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    });
    if (options.oa) {
      this.setData({
        oa: true
      })
    }

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
  }
})