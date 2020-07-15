// pages/generalcontract/detail/detail.js
import {
  referChapter,
  cancelChapter,
  amendChapter,
} from '../../../../service/getData.js';
var app = getApp();
var util = require("../../../../utils/util");
let userinfo = wx.getStorageSync("myInfo");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    count1:2,
    edit: false,
    info: {},
    steps: [],
    tab: 'a',
    returned: false,//*1
    AudiEdit: false,//*1
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
    // if (this.data.history) {
    //   util.OAreturn('chapter', this);
    // } else {
    //   util.OAreturn('chapter');
    // }
    if(this.data.a==0){
      util.OAreturn('chapter');
    }
    if(this.data.a==1){
      wx.navigateBack({
        delta:2
      })  
    }
    if(this.data.c==2 && this.data.b==0){
      util.OAreturn('chapter');
    }
    if(this.data.c==2 && this.data.b==1){
      wx.navigateBack({
        delta:2
      })
    }
    //wx.navigateBack()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(22222)
    console.log(options)
    this.setData({
      count:options.id,
      a:options.count,
      c:options.caption,
      b:options.dep
      //status:options.status
    })
    // if(this.data.status==1){
    //   this.data.info.ApplygetNew=false
    // }
    userinfo = wx.getStorageSync("myInfo");
    wx.showLoading({
      title: '加载中',
    });
    if (!options.history) {
      wx.setStorageSync('history', '')
    }
    this.setData({
      history: options.history
    })
    util.readRecordlist('usesealform', options.id, this, '用章')
    if (options.id) {
      referChapter({
        ID: options.id
      }).then(res => {
        // console.log(res)
        if (res.code == 10000) {
          var history = wx.getStorageSync("history")
          // console.log(history)
          let item = res.Item;
          if (history) {
            item = history
          }
          util.handleData(item, this, app.globalData.department);
          this.setData({
            info: item
          })
          util.getbutton(item.ID, 'usesealform', item.CurStepbh, this);
          let menus = wx.getStorageSync('menus');
          if (menus.caption == '我申请' && this.data.info.ApplygetNew) {
            let info = this.data.info;
            info.ApplygetNew = false;
            util.checkChange(info, this, app.globalData.department);
            this.setData({
              info
            })
            amendChapter(this.data.info).then(res => {
              if (res.code == 10000) {
                console.log('已查看')
              }
            })
          }
          wx.hideLoading();
          // 调取工作流记录
          let mid = res.Item.formid;
          util.workList(this, mid, 'usesealform', this.data.info.ID);
          //处理状态判断
          util.checkState(this, mid, 'usesealform', item.CurStepbh);
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
  ApprovalOpinionblur(e) {
    this.setData({
      ApprovalOpinion: e.detail
    })
  },
  // 退回
  sendback(e) {
    // console.log(e)
    this.setData({
      show: true,
      ApprovalOpinion: '',
      state: e.currentTarget.dataset.state
    })
    // util.Triggerflow(this, 'return', 'workovertime', 'overtime', '', '', '', '', '', '', 'oa')
  },
  // 审核通过
  putin(e) {
    if (this.data.info.formid) {
      this.setData({
        show: true,
        ApprovalOpinion: "同意。",
        state: e.currentTarget.dataset.state
      })
    } else {
      util.Triggerflow(this, 'next', 'usesealform', 'chapter', '', '', '', '', '', '', 'oa')
    }
    // e.currentTarget.dataset.state
    // util.Triggerflow(this, 'next', 'workovertime', 'overtime', '', '', '', '', '', '', 'oa')
  },
  sconfirm() {
    console.log(this.data.state)
    var dangqiantime = (Date.parse(new Date()) / 1000);
    if (util.Reclick(dangqiantime)) {
      if (this.data.state == 'return') {
        if (this.data.ApprovalOpinion) {
          util.Triggerflow(this, 'return', 'usesealform', 'chapter', '', '', '', '', '', '', 'oa', this.data.ApprovalOpinion ? this.data.ApprovalOpinion : '不同意。', JSON.stringify(this.data.idea.API_Picurl), JSON.stringify(this.data.idea.API_Fileurl))
        } else {
          wx.showToast({
            title: '请输入审批意见',
            icon: 'none',
            duration: 3000
          })
        }
      } else {
        util.Triggerflow(this, 'next', 'usesealform', 'chapter', '', '', '', '', '', '', 'oa', this.data.ApprovalOpinion ? this.data.ApprovalOpinion : '同意。', JSON.stringify(this.data.idea.API_Picurl), JSON.stringify(this.data.idea.API_Fileurl))
      }
    }
  },
  // // 退回
  // sendback() {
  //   util.Triggerflow(this, 'return', 'usesealform', 'chapter', '', '', '', '', '', '', 'oa')
  // },
  // // 审核通过
  // putin() {
  //   util.Triggerflow(this, 'next', 'usesealform', 'chapter', '', '', '', '', '', '', 'oa')
  // },
  // 删除
  delete() {
    let that = this;
    wx.showModal({
      content: '确认要删除吗？',
      success(res) {
        if (res.confirm) {
          cancelChapter({
            ID: that.data.info.ID
          }).then(res => {
            if (res.code == 10000) {
              wx.showToast({
                title: '删除成功',
                icon: 'success',
                duration: 3000
              })
              setTimeout(function () {
                util.OAreturn('chapter');
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
  change12(e) {
    if (e.currentTarget.dataset.i) {
      // console.log(JSON.parse(e.currentTarget.dataset.i))
      wx.setStorageSync('history', JSON.parse(e.currentTarget.dataset.i))
      wx.redirectTo({
        url: '/OAmoudle/pages/chapter/detail/detail?history=5&id=' + JSON.parse(e.currentTarget.dataset.i).ID
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    userinfo = wx.getStorageSync("myInfo");
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