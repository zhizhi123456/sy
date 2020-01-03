// / pages/generalcontract/detail/detail.js
import {
  detaildesign,
  deldesign
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
    hadNew:1
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
    if(this.data.hadNew){
      util.returnPrev('design')
    }else{
      util.retPrev('design')
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.hadNew == '0'){
      this.setData({
        hadNew:false
      })
     }
    wx.showLoading({
      title: '加载中',
    });
    if (options.id) {
      detaildesign({
        ID: options.id
      }).then(res => {
        // console.log(res)
        if (res.code == 10000) {
          let item = res.Item;
          util.handleData(item, this, app.globalData.department);
          util.outflow(item,this)
          item.ifcomplete = util.whethercontent1(item.ifcomplete)
          this.setData({
            info: item
          })
          wx.hideLoading();
          // 调取工作流记录
          //列表

          let mid = res.Item.Formid; 
          if (mid) {
            util.workList(this, mid)
            // console.log(this.data.steps)
          }
           //处理状态判断
          util.checkState(this, mid, 'EngineerdesignRpt', item.CurStepbh);
        
        }
      })
    }
  },
  // 删除
  delete() {
    // console.log(this.data.info)
    deldesign({
      ID: this.data.info.ID
    }).then(res => {
      if (res.code == 10000) {
        wx.showToast({
          title: '删除成功',
          icon: 'success',
          duration: 3000
        })
        util.returnPrev('design')
      }
    })
  },
})