// / pages/generalcontract/detail/detail.js
import {
  detaildisclosure,
  deldisclosure
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
    steps: []
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
    util.returnPrev('disclosure')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    });
    if (options.id) {
      detaildisclosure({
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
          //列表

          let mid = res.Item.Formid; 
          if (mid) {
            util.workList(this, mid, 'EngineerdisclosureRpt')
            // console.log(this.data.steps)
          }
           //处理状态判断
          util.checkState(this, mid, 'EngineerdisclosureRpt', item.CurStepbh);
        
        }
      })
    }
  },
  // 工作流流转
  // 退回上步
  sendback() {
    util.Triggerflow(this, 'return', 'EngineerdisclosureRpt', 'disclosure')
  },
  // 提交下步
  putin() {
    util.Triggerflow(this, 'next', 'EngineerdisclosureRpt', 'disclosure')
  },
  // 删除
  delete() {
    util.expurgate(this, deldisclosure, 'disclosure')
  },
})