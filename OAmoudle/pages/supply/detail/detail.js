// / pages/generalcontract/detail/detail.js
import {
  detailsupply,
  delsupply
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
  // 文件
  up_photo() {
    wx.chooseImage({
      count: 9,
      // sourceType:"camera",
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        // //console.log(tempFilePaths)
      }
    })
  },
  // 返回
  return () {
    util.OAreturn('supply')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    });
    
    if (options.id) {
      detailsupply({
        ID: options.id
      }).then(res => {
        //console.log(res)
        if (res.code == 10000) {
          let item = res.Item;
          util.handleData(item, this, app.globalData.department);
          util.outflow(item, this)
          this.setData({
            info: item
          })
          wx.hideLoading();
          util.readRecord('OfficeCharge', options.id, this,'办公费用')
          // 调取工作流记录
          //列表
          let mid = res.Item.formid;
          if (mid) {
            util.workList(this, mid, 'OfficeCharge')
            // //console.log(this.data.steps)
          }
          //处理状态判断
          util.checkState(this, mid, 'OfficeCharge', item.CurStepbh);
        }
      })
    }
  },
  // 工作流流转
  // 退回
  sendback() {
    util.Triggerflow(this, 'return', 'OfficeCharge', 'supply', '', '', '', '', '', '', 'oa')
  },
  // 审核通过
  putin() {
    util.Triggerflow(this, 'next', 'OfficeCharge', 'supply', '', '', '', '', '', '', 'oa')
  },
  // 删除
  delete() {
    // //console.log(this.data.info)
    util.OAexpurgate(this, delsupply, 'supply')
  },
})