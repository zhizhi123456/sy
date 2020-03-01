// pages/bill/detaillink/detaillink.js
import {
  cancelDeepddetail,
  referDeepddetail,
} from '../../../../service/getData';
var app = getApp();
var util = require("../../../../utils/util");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    speak: '',
    show: false,
    info: {},
    material_list: [],
  },
  // 返回
  return () {
    wx.redirectTo({
      url: "/OAmoudle/pages/deepdesign/detail/detail?id=" + this.data.info.inwarehouseID + "&tab=c"
    })
  },
  delete() {
    let that = this;
    wx.showModal({
      content: '确认要删除吗？',
      success(res) {
        if (res.confirm) {
          cancelDeepddetail({
            ID: that.data.info.ID
          }).then(res => {
            // console.log(res)
            if (res.code == 10000) {
              wx.showToast({
                title: '删除成功',
                icon: 'success',
                duration: 3000
              })
              setTimeout(function () {
                wx.redirectTo({
                  url: "/OAmoudle/pages/deepdesign/detail/detail?id=" + that.data.info.inwarehouseID + "&tab=c"
                });
              }, 1000)
            }
          })
        }
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
    if (options.detailid) {
      // 资料详情
      referDeepddetail({
        ID: options.detailid
      }).then(res => {
        if (res.code == 10000) {
          // console.log(res)
          let data = res.Item;
          for (let i in data) {
            // console.log(i)
            // console.log(data[i])
            if (data[i] == null) {
              data[i] = ""
            }
          }
          this.setData({
            info: data
          })
          wx.hideLoading();
        }
      })
    }
  },
})