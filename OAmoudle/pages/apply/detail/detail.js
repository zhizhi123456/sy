// pages/generalcontract/detail/detail.js
import {
  detailapply ,
  delapply,
  queryapplysmall
} from '../../../service/getData.js';
var app = getApp();
var util = require("../../../utils/util");
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
    util.returnPrev('apply')
  },
  // 新增明细表
  addndlink() {
    wx.redirectTo({
      url: "/pages/apply/newlink/newlink?id=" + this.data.info.ID
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
    if (options.id) {
      detailapply({
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
            util.workList(this, mid)
          }
           //处理状态判断
           util.checkState(this, mid, 'applybuyform', item.CurStepbh);
        }
      })
      // 调取明细表
      queryapplysmall({
        applybuyid: options.id
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
  // 退回上步
  sendback() {
    util.Triggerflow(this, 'return', 'applybuyform', 'apply')
  },
  // 提交下步
  putin() {
    util.Triggerflow(this, 'next', 'applybuyform', 'apply')
  },
  // 删除
  delete() {
    // console.log(this.data.info)
    delapply({
      ID: this.data.info.ID
    }).then(res => {
      if (res.code == 10000) {
        wx.showToast({
          title: '删除成功',
          icon: 'success',
          duration: 3000
        })
        util.returnPrev('apply')
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

})