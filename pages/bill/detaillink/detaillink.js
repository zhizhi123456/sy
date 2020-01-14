// pages/bill/detaillink/detaillink.js
import {
  cancelBdetail,
  referBdetail,
  referBill
} from '../../../service/getData';
var app = getApp();
var util = require("../../../utils/util");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    speak: '',
    show: false,
    info: {},
    bill: {},
    active: 0,
    steps: [],
    material_list: [],
  },
  // 返回
  return () {
    wx.redirectTo({
      url: "/pages/bill/detail/detail?tab=c&id=" + this.data.info.getmaterialid + '&rid=' + this.data.rid + '&title=' + this.data.title + (this.data.userid ? '&caption=' + this.data.caption + '&dep=' + this.data.dep + '&deptxt=' + this.data.deptxt + '&userid=' + this.data.userid : '')
    })
  },
  delete() {
    let that = this;
    wx.showModal({
      content: '确认要删除吗？',
      success(res) {
        if (res.confirm) {
          cancelBdetail({
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
                  url: "/pages/bill/detail/detail?tab=c&id=" + that.data.info.getmaterialid + '&rid=' + that.data.rid + '&title=' + that.data.title + (that.data.userid ? '&caption=' + that.data.caption + '&dep=' + that.data.dep + '&deptxt=' + that.data.deptxt + '&userid=' + that.data.userid : '')
                })
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
    console.log(options)
    if (options.id || options.rid) {
      this.setData({
        rid: options.rid,
        title: options.title,
      })
    }
    if (options.userid) {
      this.setData({
        userid: options.userid,
        caption: options.caption,
        dep: options.dep,
        deptxt: options.deptxt,
        me: Number(options.me),
        applyT: Number(options.applyT)
      })
    }
    wx.showLoading({
      title: '加载中',
    });
    if (options.detailid) {
      // 资料详情
      referBdetail({
        ID: options.detailid
      }).then(res => {
        if (res.code == 10000) {
          // console.log(res)
          let item = res.Item;
          util.handleData(item, this, app.globalData.department);
          this.setData({
            info: item
          })
          return referBill({
            ID: this.data.info.getmaterialid
          })
        }
      }).then(res => {
        let Bitem = res.Item;
        util.handleData(Bitem, this, app.globalData.department);
        this.setData({
          bill: Bitem
        })
        wx.hideLoading();
      })
    }
  },

})