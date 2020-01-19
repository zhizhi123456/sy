// pages/generalcontract/detail/detail.js
import {
  referCost,
  cancelCost,
  amendCost
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
    nape: '',
    returnid: '',
    tab: 'a',
    returned: true,
    isreturn: true,
    hadNew: 1
  },
  // 返回
  return () {
    if (this.data.nape) {
      wx.redirectTo({
        url: '/pages/' + this.data.nape + '/detail/detail?tab=c&id=' + this.data.returnid
      })
    } else {
      util.returnPrev('cost', '', this.data.userid, this.data.caption, this.data.dep, this.data.deptxt,
        this.data.rid, this.data.title)
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    if (options.nape && options.returnid) {
      let nape = options.nape,
        returnid = options.returnid;
      this.setData({
        nape,
        returnid
      })
    }
    if (options.id || options.rid) {
      this.setData({
        rid: options.rid,
        title: options.title,
      })
    }
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
      referCost({
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
            amendCost(this.data.info).then(res => {
              if (res.code == 10000) {
                console.log('已查看')
              }
            })
          }
          wx.hideLoading();
          // 调取工作流记录
          let mid = res.Item.formid;
          util.workList(this, mid, 'charge');
          //处理状态判断
          util.checkState(this, mid, 'charge', item.CurStepbh);
        }
      })
    }
  },
  // 工作流流转
  // 退回上步
  sendback() {
    util.Triggerflow(this, 'return', 'charge', 'cost', this.data.userid, this.data.caption, this.data.dep, this.data.deptxt,
      this.data.rid, this.data.title)
  },
  // 提交下步
  putin() {
    util.Triggerflow(this, 'next', 'charge', 'cost', this.data.userid, this.data.caption, this.data.dep, this.data.deptxt,
      this.data.rid, this.data.title)
  },
  // 删除
  delete() {
    let that = this;
    wx.showModal({
      content: '确认要删除吗？',
      success(res) {
        if (res.confirm) {
          cancelCost({
            ID: that.data.info.ID
          }).then(res => {
            if (res.code == 10000) {
              wx.showToast({
                title: '删除成功',
                icon: 'success',
                duration: 3000
              })
              setTimeout(function () {
                util.returnPrev('cost', '', that.data.userid, that.data.caption, that.data.dep, that.data.deptxt,
                  that.data.rid, that.data.title);
              }, 1000)
            }
          })
        }
      }
    })
  },

})