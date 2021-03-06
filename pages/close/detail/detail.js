// pages/generalcontract/detail/detail.js
import {
  referClose,
  cancelClose
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
    tab: 'a',
    returned: true,
    isreturn: true,
  },
  // 返回
  return () {
    util.returnPrev('close')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    });
    if (options.id) {
      referClose({
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
          // console.log(res.Item.formid)
          let mid = res.Item.formid;
          util.workList(this, mid, 'projectsettlementdetails');
          //处理状态判断
          util.checkState(this, mid, 'projectsettlementdetails', item.CurStepbh);
        }
      })
    }
  },
  // 工作流流转
  // 退回
  sendback() {
    util.Triggerflow(this, 'return', 'projectsettlementdetails', 'close')
  },
  // 审核通过
  putin() {
    util.Triggerflow(this, 'next', 'projectsettlementdetails', 'close')
  },
  // 删除
  delete() {
    let that = this;
    wx.showModal({
      content: '确认要删除吗？',
      success(res) {
        if (res.confirm) {
          cancelClose({
            ID: that.data.info.ID
          }).then(res => {
            if (res.code == 10000) {
              wx.showToast({
                title: '删除成功',
                icon: 'success',
                duration: 3000
              })
              setTimeout(function () {
                util.returnPrev('close');
              }, 1000)
            }
          })
        }
      }
    })
  },
})