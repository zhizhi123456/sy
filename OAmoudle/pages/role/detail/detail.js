// / pages/generalcontract/detail/detail.js
import {
  detailrole,
  delrole
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
    util.OAreturn('role')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    });
    // if (!options.history) {
    //   wx.setStorageSync('history', '')
    // }
    // this.setData({
    //   history: options.history
    // })
    // data.IslockedOut = whethercontent(data.IslockedOut)
    // util.readRecordlist('User', options.id, this, '角色管理')
    if (options.id) {
      detailrole({
        ID: options.id
      }).then(res => {
        console.log(res)
        if (res.code == 10000) {
          // var history = wx.getStorageSync("history")
          let item = res.Item;
          // if (history) {
          //   item = history
          // }
          util.handleData(item, this, app.globalData.department);
          // util.outflow(item, this)
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
    util.OAexpurgate(this, delrole, 'role')
  },
  change12(e) {
    console.log(e)
    if (e.currentTarget.dataset.i) {
      // console.log(JSON.parse(e.currentTarget.dataset.i))
      wx.setStorageSync('history', JSON.parse(e.currentTarget.dataset.i))
      wx.redirectTo({
        url: '/OAmoudle/pages/role/detail/detail?history=5&id=' + JSON.parse(e.currentTarget.dataset.i).ID
      })
    }
  },
})