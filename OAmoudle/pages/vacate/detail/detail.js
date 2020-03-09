// pages/generalcontract/detail/detail.js
import {
  referVacate,
  cancelVacate,
  amendVacate,
  Leavetypelist
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
    tab: 'a',
    returned: true,
    isreturn: true,
    leavetypetext: '',
    small: {
      ApprovalOpinion: ""
    }
  },
  // 返回
  return () {

    if (this.data.history) {
      util.OAreturn('vacate', this);
    } else {
      util.OAreturn('vacate');
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    });
    if (!options.history) {
      wx.setStorageSync('history', '')
    }
    this.setData({
      history: options.history
    })
    util.readRecordlist('leaveapplyform', options.id, this, '请假')
    if (options.id) {
      referVacate({
        ID: options.id
      }).then(res => {
        console.log(res)
        if (res.code == 10000) {
          var history = wx.getStorageSync("history")
          console.log(history)
          let item = res.Item;
          if (history) {
            item = history
          }
          util.handleData(item, this, app.globalData.department);
          this.setData({
            info: item,
            applyT: Number(options.applyT)
          })
          // amendVacate
          if (this.data.applyT && this.data.info.ApplygetNew) {
            let info = this.data.info;
            info.ApplygetNew = false;
            util.checkContent(info, this);
            this.setData({
              info
            })
            amendVacate(this.data.info).then(res => {
              if (res.code == 10000) {
                console.log('已查看')
              }
            })
          }
          wx.hideLoading();
          // 调取工作流记录
          let mid = res.Item.formid;
          util.workList(this, mid, 'leaveapplyform', options.id);
          //处理状态判断
          util.checkState(this, res.Item.formid || res.Item.Formid, 'leaveapplyform', item.CurStepbh, '');
        }
      })
    }
  },
  // 工作流流转
  // 退回
  sendback(e) {
    this.setData({
      state: e.currentTarget.dataset.state
    })
    if (this.data.info.formid) {
      this.setData({
        pull: true,
        show: true,
      })
    } else {
      util.Triggerflow(this, 'return', 'leaveapplyform', 'vacate', '', '', '', '', '', '', 'oa')
    }
  },
  // 审核通过
  putin(e) {
    console.log(e.currentTarget.dataset.state)
    this.setData({
      state: e.currentTarget.dataset.state
    })
    if (this.data.info.formid) {
      this.setData({
        pull: true,
        show: true,
      })
    } else {
      util.Triggerflow(this, 'next', 'leaveapplyform', 'vacate', '', '', '', '', '', '', 'oa')
    }


  },
  // 删除
  delete() {
    let that = this;
    wx.showModal({
      content: '确认要删除吗？',
      success(res) {
        if (res.confirm) {
          cancelVacate({
            ID: that.data.info.ID
          }).then(res => {
            if (res.code == 10000) {
              wx.showToast({
                title: '删除成功',
                icon: 'success',
                duration: 3000
              })
              setTimeout(function () {
                util.OAreturn('vacate');
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
  change() {
    this.setData({
      pull: true,
      show: true,
    })
  },
  onClose() {
    this.setData({
      show: false
    });
  },
  meetplaceblur(e) {
    let small = util.editInfosmall(e, this, e.detail.value);
    this.setData({
      small
    })
  },
  // 组合查询
  seachqur() {
    console.log(this.data.small, this.data.state)
    util.Triggerflow(this, this.data.state, 'leaveapplyform', 'vacate', '', '', '', '', '', '', 'oa', this.data.small.ApprovalOpinion)
  },
  change12(e) {
    console.log(e)
    if (e.currentTarget.dataset.i) {
      // console.log(JSON.parse(e.currentTarget.dataset.i))
      wx.setStorageSync('history', JSON.parse(e.currentTarget.dataset.i))
      wx.redirectTo({
        url: '/OAmoudle/pages/vacate/detail/detail?history=5&id=' + JSON.parse(e.currentTarget.dataset.i).ID
      })
    }
  }
})