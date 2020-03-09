// pages/generalcontract/detail/detail.js
import {
  referPayment,
  cancelPayment,
  amendPayment,
} from '../../../../service/getData.js';
var app = getApp();
var util = require("../../../../utils/util");
let userinfo = wx.getStorageSync("myInfo");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    edit: false,
    info: {},
    steps: [],
    stepLIst: [],
    tab: 'a',
    returned: true,
    isreturn: true,
    check_photo: [{
      name: "拍照"
    }, {
      name: "从相册选择"
    }],
    idea: {
      API_Picurl: [],
      API_Fileurl: []
    }
  },
  // 返回
  return () {
    let menus = wx.getStorageSync('menus');
    if (menus.caption) {
      wx.redirectTo({
        url: '/OAmoudle/pages/payment/pact/pact'
      })
    } else {
      util.OAreturn('payment');
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    userinfo = wx.getStorageSync("myInfo");
    this.setData({
      userinfo: userinfo
    })
    wx.showLoading({
      title: '加载中',
    });
    if (options.id) {
      this.setData({
        options: options
      })
      referPayment({
        ID: options.id
      }).then(res => {
        // console.log(res)
        if (res.code == 10000) {
          let item = res.Item;
          util.handleData(item, this, app.globalData.department);
          this.setData({
            info: item
          })
          let menus = wx.getStorageSync('menus');
          if (menus.caption == '我申请' && this.data.info.ApplygetNew) {
            let info = this.data.info;
            info.ApplygetNew = false;
            util.checkChange(info, this, app.globalData.department);
            this.setData({
              info
            })
            amendPayment(this.data.info).then(res => {
              if (res.code == 10000) {
                console.log('已查看')
              }
            })
          }
          wx.hideLoading();
          // 调取工作流记录
          let mid = res.Item.formid;
          util.workList(this, mid, 'paymentapproval', this.data.info.ID);
          //处理状态判断
          util.checkState(this, mid, 'paymentapproval', item.CurStepbh);
        }
      })
    }
  },
  // 工作流流转
  onClose() {
    this.setData({
      show: false
    })
  },
  onClose1() {
    this.setData({
      show1: false
    })
  },
  delF(e) {
    util.delFileIDEA(this, e);
  },
  downF(e) {
    util.lookFileIDEA(e);
  },
  // 文件上传
  up_file() {
    util.upFileIDEA(this);
  },
  //图片上传
  // 照片
  showPopup_photo() {
    this.setData({
      show_photo: true
    })
  },
  onClose_photo() {
    this.setData({
      show_photo: false
    })
  },
  onSelect_photo(e) {
    if (e.detail.name == "拍照") {
      util.upImageIDEA(this, 1);
    } else {
      util.upImageIDEA(this, 0);
    }
  },
  // 点击图片放大预览
  tap_pic1(e) {
    util.lookimgIDEA(e);
  },
  delimg(e) {
    util.deleteImgIDEA(this, e);
  },
  // 退回上步
  sendback() {
    this.setData({
      show1: true
    })
    // util.Triggerflow(this, 'return', 'paymentapproval', 'payment', '', '', '', '', '', '', 'oa')
  },
  ApprovalOpinionblur(e) {
    this.setData({
      ApprovalOpinion: e.detail
    })
  },
  tconfirm() {
    util.Triggerflow(this, 'return', 'paymentapproval', 'payment', '', '', '', '', '', '', 'oa', this.data.ApprovalOpinion ? this.data.ApprovalOpinion : '不同意。', JSON.stringify(this.data.idea.API_Picurl), JSON.stringify(this.data.idea.API_Fileurl))
  },
  sconfirm() {
    util.Triggerflow(this, 'next', 'paymentapproval', 'payment', '', '', '', '', '', '', 'oa', this.data.ApprovalOpinion ? this.data.ApprovalOpinion : '同意。', JSON.stringify(this.data.idea.API_Picurl), JSON.stringify(this.data.idea.API_Fileurl))
  },
  // 审核通过
  putin() {
    if (this.data.info.formid) {
      this.setData({
        show: true
      })
    } else {
      util.Triggerflow(this, 'next', 'paymentapproval', 'payment', '', '', '', '', '', '', 'oa')
    }
  },
  // 删除
  delete() {
    let that = this;
    wx.showModal({
      content: '确认要删除吗？',
      success(res) {
        if (res.confirm) {
          cancelPayment({
            ID: that.data.info.ID
          }).then(res => {
            if (res.code == 10000) {
              wx.showToast({
                title: '删除成功',
                icon: 'success',
                duration: 3000
              })
              setTimeout(function () {
                util.OAreturn('payment');
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
})