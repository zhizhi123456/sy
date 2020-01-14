// / pages/generalcontract/detail/detail.js
import {
  detailbid,
  delbid,
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
    util.returnPrev('bid')
  },
  tap_pic(e) {
    util.preview(this, e)
  },
  defaultimg(e) {
    let info = util.defaultimg(e, this);
    this.setData({
      info
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    });
    if (options.id) {
      detailbid({
        ID: options.id
      }).then(res => {
        // console.log(res)
        if (res.code == 10000) {
          let item = res.Item;
          util.handleData(item, this, app.globalData.department);
          util.outflow(item, this)
          this.setData({
            info: item
          })
          wx.hideLoading();
          // 调取工作流记录
          //列表
          let mid = res.Item.formid;
          if (mid) {
            util.workList(this, mid)
          }
          //处理状态判断
          util.checkState(this, mid, 'bidtoproject', item.CurStepbh);
        }
      })
    }
  },
  // 工作流流转
  // 退回上步
  sendback() {
    util.Triggerflow(this, 'return', 'bidtoproject', 'bid')
  },
  // 提交下步
  putin() {
    util.Triggerflow(this, 'next', 'bidtoproject', 'bid')
  },
  // 删除
  delete() {
    util.expurgate(this, delbid, 'bid')
  },
})