// pages/generalcontract/detail/detail.js
import {
  referTask,
  cancelTask
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
    hadNew: 1,
    hadMy: 0
  },
  // 返回
  return () {
    if (this.data.hadNew) {
      if (this.data.hadMy) {
        wx.navigateBack({
          url: '/pages/task/pact/pact?hadMy=' + this.data.hadMy
        })
      } else {
        util.returnPrev('task')
      }
    } else {
      wx.navigateBack({
        url: "/pages/task/pact/pact"
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if (options.hadMy) {
      this.setData({
        hadMy: options.hadMy
      })
    }
    wx.showLoading({
      title: '加载中',
    });
    if (options.hadNew == '0') {
      this.setData({
        hadNew: false
      })
    }
    if (options.id) {
      referTask({
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
          if (mid) {
            util.workList(this, mid)
          }
          //处理状态判断
          util.checkState(this, mid, 'prjassignbook', item.CurStepbh);
        }
      })
    }
  },
  // 工作流流转
  // 退回上步
  sendback() {
    util.Triggerflow(this, 'return', 'prjassignbook', 'task',this.data.userid, this.data.caption, this.data.dep, this.data.deptxt,
    this.data.rid, this.data.title,this.data.hadMy)
  },
  // 提交下步
  putin() {
    util.Triggerflow(this, 'next', 'prjassignbook', 'task',this.data.userid, this.data.caption, this.data.dep, this.data.deptxt,
    this.data.rid, this.data.title,this.data.hadMy)
  },
  // 删除
  delete() {
    // console.log(this.data.info)
    cancelTask({
      ID: this.data.info.ID
    }).then(res => {
      if (res.code == 10000) {
        wx.showToast({
          title: '删除成功',
          icon: 'success',
          duration: 3000
        })
      
          if (this.data.hadMy) {
            wx.redirectTo({
              url: '/pages/task/pact/pact?hadMy=' + this.data.hadMy
            })
          } else {
            util.returnPrev('task')
          }
      
      }
    })
  },
})