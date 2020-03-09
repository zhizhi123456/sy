// pages/generalcontract/detail/detail.js
import {
  detailapplyFor ,
  delapplyFor,
  queryapplyForsmall
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
    table: "a",
    returned: true,
    isreturn: true,
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
    if (this.data.history) {
      util.OAreturn('applyFor', this);
    } else {
      util.OAreturn('applyFor');
    }
  },
  // 新增明细表
  addndlink() {
    wx.redirectTo({
      url: "/OAmoudle/pages/applyFor/newlink/newlink?id=" + this.data.info.ID
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
    if (!options.history) {
      wx.setStorageSync('history', '')
    }
    this.setData({
      history: options.history
    })
    wx.showLoading({
      title: '加载中',
    });
    util.readRecordlist('applyform', options.id, this,'申领')
    if (options.id) {
      detailapplyFor({
        ID: options.id
      }).then(res => {
        // console.log(res)
        if (res.code == 10000) {
          var history = wx.getStorageSync("history")
          console.log(history)
          let item = res.Item;
          if (history) {
            item = history
          }
          util.handleData(item, this, app.globalData.department);
          util.outflow(item,this)
          this.setData({
            info: item
          })
          wx.hideLoading();
          // 调取工作流记录
          let mid = res.Item.formid;
         
            util.workList(this, mid, 'applyform', options.id)
      
           //处理状态判断
           util.checkState(this, res.Item.formid || res.Item.Formid, 'applyform', item.CurStepbh,'');
           console.log(this.data.info.formid,this.data.isnext,this.data.returned,this.data.isreturn)
        }
      })
      // 调取明细表
      queryapplyForsmall({
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
    util.Triggerflow(this, 'return', 'applyform', 'applyFor', '', '', '', '', '', '', 'oa')
  },
  // 审核通过
  putin() {
    util.Triggerflow(this, 'next', 'applyform', 'applyFor', '', '', '', '', '', '', 'oa')
  },
  // 删除
  delete() {
    // console.log(this.data.info)
    util.OAexpurgate(this, delapplyFor, 'applyFor')
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
  change12(e) {
    console.log(e)
    if (e.currentTarget.dataset.i) {
      // console.log(JSON.parse(e.currentTarget.dataset.i))
      wx.setStorageSync('history', JSON.parse(e.currentTarget.dataset.i))
      wx.redirectTo({
        url: '/OAmoudle/pages/applyFor/detail/detail?history=5&id=' + JSON.parse(e.currentTarget.dataset.i).ID
      })
    }
  }

})