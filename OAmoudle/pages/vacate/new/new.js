// pages/new/new.js
import Toast from 'vant-weapp/dist/toast/toast';
import {
  addChapter,
  referChapter,
  amendChapter
} from "../../../../service/getData";
var util = require("../../../../utils/util");
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    info: {
      API_Picurl: [],
    },
    show: false,
    firms: [],
    totals: [],
    departmenttext: "请选择",
    check_photo: [{
      name: "拍照"
    }, {
      name: "从相册选择"
    }],
  },
  // 部门
  showPopup_o() {
    this.setData({
      show_o: true
    });
  },
  onClose_o() {
    this.setData({
      show_o: false
    });
  },
  onConfirm_o(e) {
    let info = util.editInfo(e, this, e.detail.value.value);
    this.setData({
      info,
      show_o: false,
      departmenttext: e.detail.value.text
    })
  },
  // 公司
  showPopup() {
    this.setData({
      show: true
    });
  },
  onClose() {
    this.setData({
      show: false
    });
  },
  onConfirm(e) {
    let info = util.editInfo(e, this, e.detail.value.text);
    this.setData({
      info,
      show: false
    })
  },
  // 用章类型
  showPopup_1() {
    this.setData({
      show_1: true
    });
  },
  onClose_1() {
    this.setData({
      show_1: false
    });
  },
  onConfirm_1(e) {
    let info = util.editInfo(e, this, e.detail.value.text);
    this.setData({
      info,
      show_1: false
    })
  },
  // 用途
  useInfoblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 数量
  usenumberblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 金额
  useamountblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
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
      util.upImage(this, 1);
    } else {
      util.upImage(this, 0);
    }
  },
  delimg(e) {
    util.deleteImg(this, e)
  },
  tap_pic(e) {
    util.preview(this, e)
  },

  confirm() {
    // console.log(this.data.info)
    if (this.data.info.department && this.data.info.Companytitle && this.data.info.usesealtype && this.data.info.useInfo) {
      let info = this.data.info;
      util.checkContent(info, this);
      this.setData({
        info
      })
      addChapter(this.data.info).then(res => {
        // console.log(res)
        if (res.code == 10000) {
          wx.showToast({
            title: '新建成功',
            icon: 'success',
            duration: 3000
          })
          util.OAreturn('chapter');
        }
      })
    } else {
      Toast({
        message: '请填写必填项',
        mask: true
      });
    }
  },
  // 返回
  return () {
    util.OAreturn('chapter');
  },
  // 编辑页面的确定和返回
  editreturn() {
    util.OAreturn('chapter', this);
  },
  editconfirm() {
    let info = this.data.info;
    util.checkChange(info, this, app.globalData.department);
    this.setData({
      info
    })
    // console.log(infodata)
    amendChapter(this.data.info).then(res => {
      // console.log(res)
      if (res.code == 10000) {
        wx.showToast({
          title: '编辑成功',
          icon: 'success',
          duration: 3000
        })
        util.OAreturn('chapter', this);
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      firms: app.globalData.Companytitle,
      sections: app.globalData.department,
      Usesealtype: app.globalData.Usesealtype,
    })
    if (options.id) {
      referChapter({
        ID: options.id
      }).then(res => {
        // console.log(res)
        let item = res.Item;
        util.handleData(item, this, app.globalData.department);
        this.setData({
          info: item
        })
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

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