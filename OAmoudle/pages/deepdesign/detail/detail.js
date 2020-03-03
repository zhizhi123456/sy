// pages/generalcontract/detail/detail.js
import {
  cancelDeepdesign,
  referDeepdesign,
  getDeepddetail,
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
    tab: "a",
    returned: true,
    isreturn: true,
  },
  // 返回
  return () {
    util.OAreturn('deepdesign');
  },
  // 新增明细表
  addndlink() {
    wx.redirectTo({
      url: "/OAmoudle/pages/deepdesign/newlink/newlink?id=" + this.data.info.ID
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.tab) {
      this.setData({
        tab: options.tab
      })
    }
    wx.showLoading({
      title: '加载中',
    });
    if (options.id) {
      referDeepdesign({
        ID: options.id
      }).then(res => {
        // console.log(res)
        if (res.code == 10000) {
          let item = res.Item;
          util.handleData(item, this, app.globalData.department);
          this.setData({
            info: item
          })
          wx.hideLoading();
          // 调取工作流记录
          let mid = res.Item.formid;
          util.workList(this, mid, 'DeepDesign');
          //处理状态判断
          util.checkState(this, mid, 'DeepDesign', item.CurStepbh);
        }
      })
      // 调取明细表
      getDeepddetail({
        inwarehouseID: options.id
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
    util.Triggerflow(this, 'return', 'DeepDesign', 'deepdesign','', '', '', '', '', '', 'oa')
  },
  // 提交下步
  putin() {
    util.Triggerflow(this, 'next', 'DeepDesign', 'deepdesign','', '', '', '', '', '', 'oa')
  },
  // 删除
  delete() {
    let that = this;
    wx.showModal({
      content: '确认要删除吗？',
      success(res) {
        if (res.confirm) {
          cancelDeepdesign({
            ID: that.data.info.ID
          }).then(res => {
            if (res.code == 10000) {
              wx.showToast({
                title: '删除成功',
                icon: 'success',
                duration: 3000
              })
              setTimeout(function () {
                util.OAreturn('deepdesign');
              }, 1000)
            }
          })
        }
      }
    })
  },
})