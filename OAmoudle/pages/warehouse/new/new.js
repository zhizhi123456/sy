// pages/new/new.js
import Toast from 'vant-weapp/dist/toast/toast';
import {
  addwarehouse,
  referwarehouse,
  amendwarehouse
} from "../../../../service/getData";
var util = require("../../../../utils/util");
var app = getApp();
let userinfo = wx.getStorageSync("myInfo");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    info: {},
  },
  // ID: 10004
  // 组织架构编码 OrganizStructCode: "11"
  // 组织架构名称 OrganizStructName: "尚雍"
  // 父组织架构 ParentCode: null
  // 组织架构类型 StructKind: 0
  // 组织架构层级 StructLevel: 1
  // createman: "root3"
  // createtime: "2020-03-10 14:25:46"
  // 是否启用 ifenable: true
  // updateman: null
  // updatetime: null
  checknum(e) {
    let info = this.data.info;
    info.ClassCode = e.detail.replace(/[^\d]/g, '');
    this.setData({
      info
    })
  },
  // 组织架构编码
  OrganizStructCodeblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 组织架构名称
  OrganizStructNameblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 上级组织架构层级
  ParentCodeblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 本组织架构层级
  StructLevelblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  confirm() {
    this.setData({
      'info.createman': userinfo.UserName,
      'info.createtime': util.format(new Date()),
      'info.ifenable': 1
    })
    if (this.data.next) {
      console.log(this.data.pevInfo.ClassCode)
      console.log(this.data.info.ClassCode)
      this.setData({
        'info.ClassLevel': this.data.pevInfo.ClassLevel + 1,
        'info.ParentClass': this.data.pevInfo.ClassCode,
        'info.ClassCode': this.data.pevInfo.ClassCode + this.data.info.ClassCode
      })
    } else {
      this.setData({
        'info.ClassLevel': 1,
      })
    }
    if (this.data.info.ClassCode && this.data.info.ClassName) {
      addwarehouse(this.data.info).then(res => {
        if (res.code == 10000) {
          wx.showToast({
            title: '新建成功',
            icon: 'success',
            duration: 3000
          })
          util.OAreturn('warehouse');
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
    util.OAreturn('warehouse');
  },
  // 编辑页面的确定和返回
  editreturn() {
    util.OAreturn('warehouse', this);
  },
  editconfirm() {

    this.setData({

      'info.updateman': userinfo.UserName,
      'info.updatetime': util.format(new Date())
    })
    if (this.data.info.ClassLevel == '1') {
      this.setData({
        'info.ClassCode': this.data.info.ClassCode,
      })
    } else {
      this.setData({
        'info.ClassCode': this.data.info.ParentClass + this.data.info.ClassCode,
      })
    }
    amendwarehouse(this.data.info).then(res => {
      if (res.code == 10000) {
        wx.showToast({
          title: '编辑成功',
          icon: 'success',
          duration: 3000
        })
        util.OAreturn('warehouse', this);
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    userinfo = wx.getStorageSync("myInfo");
    if (options.next && options.id) {
      this.setData({
        next: true
      })
      referwarehouse({
        ID: options.id
      }).then(res => {
        let item = res.Item;
        this.setData({
          pevInfo: item,
        })
      })
    } else if (options.id) {
      referwarehouse({
        ID: options.id
      }).then(res => {
        console.log(res)
        let item = res.Item;
        var str = item.ClassCode
        item.ClassCode = str.slice(-2)
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