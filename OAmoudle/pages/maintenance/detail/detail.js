// pages/generalcontract/detail/detail.js
import {
  detailmaintenance ,
  delmaintenance,
  querymaintenancesmall
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
    material_list: [],
    table: "a"
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
    util.OAreturn('maintenance')
  },
  // 新增明细表
  addndlink() {
    wx.redirectTo({
      url: "/OAmoudle/pages/maintenance/newlink/newlink?id=" + this.data.info.ID
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.table) {
      this.setData({
        table: options.table
      })
    }
    wx.showLoading({
      title: '加载中',
    });
    util.readRecord('maintenancem', options.id, this,'申领')
    if (options.id) {
      detailmaintenance({
        ID: options.id
      }).then(res => {
        // console.log(res)
        if (res.code == 10000) {
          let item = res.Item;
          util.handleData(item, this, app.globalData.department);
          util.outflow(item,this)
          this.setData({
            info: item
          })
          wx.hideLoading();
          // 调取工作流记录
          let mid = res.Item.formid;
          if (mid) {
            util.workList(this, mid, 'maintenancem')
          }
           //处理状态判断
           util.checkState(this, mid, 'maintenancem', item.CurStepbh);
        }
      })
      // 调取明细表
      querymaintenancesmall({
        applyid: options.id
      }).then(res => {
        // console.log(res)
        if (res.code == 10000) {
          let item = res.List;
          util.listData(item, app.globalData.department);
          this.setData({
            material_list: item.reverse()
          })
        }
      })
    }
  },
  // 工作流流转
  // 退回
  sendback() {
    util.Triggerflow(this, 'return', 'maintenancem', 'maintenance', '', '', '', '', '', '', 'oa')
  },
  // 审核通过
  putin() {
    util.Triggerflow(this, 'next', 'maintenancem', 'maintenance', '', '', '', '', '', '', 'oa')
  },
  // 删除
  delete() {
    // console.log(this.data.info)
    util.OAexpurgate(this, delmaintenance, 'maintenance')
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

})