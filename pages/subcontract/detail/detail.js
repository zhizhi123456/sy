// pages/generalcontract/detail/detail.js
import {
  referSubItems,
  cancelSubItems,
  amendSubItems
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
    hadNew: 1
  },
  // // 文件
  // up_photo() {
  //   wx.chooseImage({
  //     count: 9,
  //     // sourceType:"camera",
  //     success(res) {
  //       // tempFilePath可以作为img标签的src属性显示图片
  //       const tempFilePaths = res.tempFilePaths;
  //       // console.log(tempFilePaths)
  //     }
  //   })
  // },
  // 返回
  return () {
    if (wx.getStorageSync('urgent')) {
      wx.redirectTo({
        url: '/pages/hot/mself/mself'
      })
      wx.removeStorageSync('urgent');
    } else {
      util.returnPrev('subcontract', '', this.data.userid, this.data.caption, this.data.dep, this.data.deptxt,
        this.data.rid, this.data.title)
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id || options.rid) {
      this.setData({
        rid: options.rid,
        title: options.title,
      })
    }
    if (options.urgent) {
      wx.setStorageSync('urgent', '1')
    }
    // console.log(options)
    if (options.userid) {
      this.setData({
        userid: options.userid,
        caption: options.caption,
        dep: options.dep,
        deptxt: options.deptxt,
        me: Number(options.me),
        applyT: Number(options.applyT),
        hadNew: Number(options.hadNew),
        ISconduct: Number(options.ISconduct)
      })
      if (options.caption == '我') {
        this.setData({
          me: 1,
        })
      }
      if (options.caption == '我申请') {
        this.setData({
          applyT: 1
        })
      }
    }
    wx.showLoading({
      title: '加载中',
    });
    if (options.id) {
      referSubItems({
        ID: options.id
      }).then(res => {
        // console.log(res)
        if (res.code == 10000) {
          let item = res.Item;
          util.handleData(item, this, app.globalData.department);
          this.setData({
            info: item
          })
          if (this.data.applyT && this.data.info.ApplygetNew) {
            let info = this.data.info;
            info.ApplygetNew = false;
            util.checkContent(info, this);
            this.setData({
              info
            })
            amendSubItems(this.data.info).then(res => {
              if (res.code == 10000) {
                console.log('已查看')
              }
            })
          }
          wx.hideLoading();
          // 调取工作流记录
          // console.log(res.Item.formid)
          let mid = res.Item.formid;
          util.workList(this, mid, 'subproject');
          //处理状态判断
          util.checkState(this, mid, 'subproject', item.CurStepbh);
        }
      })
    }

  },
  // 工作流流转
  // 退回上步
  sendback() {
    util.Triggerflow(this, 'return', 'subproject', 'subcontract', this.data.userid, this.data.caption, this.data.dep, this.data.deptxt,
      this.data.rid, this.data.title)
  },
  // 提交下步
  putin() {
    util.Triggerflow(this, 'next', 'subproject', 'subcontract', this.data.userid, this.data.caption, this.data.dep, this.data.deptxt,
      this.data.rid, this.data.title)
  },
  // 删除
  delete() {
    let that = this;
    wx.showModal({
      content: '确认要删除吗？',
      success(res) {
        if (res.confirm) {
          cancelSubItems({
            ID: that.data.info.ID
          }).then(res => {
            if (res.code == 10000) {
              wx.showToast({
                title: '删除成功',
                icon: 'success',
                duration: 3000
              })
              setTimeout(function () {
                util.returnPrev('subcontract', '', that.data.userid, that.data.caption, that.data.dep, that.data.deptxt,
                  that.data.rid, that.data.title);
              }, 1000)
            }
          })
        }
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})