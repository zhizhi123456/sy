// pages/new/new.js
import Toast from 'vant-weapp/dist/toast/toast';
import {
  addStruct,
  referStruct,
  amendStruct
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
    info.OrganizStructCode = e.detail.replace(/[^\d]/g, '');
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
  // 公司名称
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
    let info = util.editInfo(e, this, e.detail.value.text);
    this.setData({
      info,
      show_o: false,
    })
  },
  setSeach(e) {
    this.setData({
      seach: e.detail.value
    })
  },
  // 
  finditem3() {
    let arr = util.findone(app.globalData.Principal, this.data.seach);
    this.setData({
      section: arr,
      seach: ''
    })
  },
  confirm() {
    this.setData({
      'info.createman': userinfo.UserName,
      'info.createtime': util.format(new Date()),
      'info.ifenable': 1
    })
    if (this.data.next) {
      this.setData({
        'info.StructLevel': this.data.pevInfo.StructLevel + 1,
        'info.ParentCode': this.data.pevInfo.OrganizStructCode,
        'info.OrganizStructCode': this.data.pevInfo.OrganizStructCode + this.data.info.OrganizStructCode
      })
    } else {
      this.setData({
        'info.StructLevel': 1,
      })
    }
    if (this.data.info.OrganizStructCode && this.data.info.OrganizStructName) {
      addStruct(this.data.info).then(res => {
        if (res.code == 10000) {
          wx.showToast({
            title: '新建成功',
            icon: 'success',
            duration: 3000
          })
          util.OAreturn('organize');
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
    util.OAreturn('organize');
  },
  // 编辑页面的确定和返回
  editreturn() {
    util.OAreturn('organize', this);
  },
  editconfirm() {
    if (this.data.info.StructLevel == '1') {
      this.setData({
        'info.OrganizStructCode': this.data.info.OrganizStructCode,
      })
    } else {
      this.setData({
        'info.OrganizStructCode': this.data.info.ParentCode + this.data.info.OrganizStructCode,
      })
    }
    this.setData({
      'info.updateman': userinfo.UserName,
      'info.updatetime': util.format(new Date()),
      'info.OrganizStructCode': this.data.info.ParentCode ? (this.data.info.ParentCode + this.data.info.OrganizStructCode) : this.data.info.OrganizStructCode
    })
    amendStruct(this.data.info).then(res => {
      if (res.code == 10000) {
        wx.showToast({
          title: '编辑成功',
          icon: 'success',
          duration: 3000
        })
        util.OAreturn('organize', this);
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    userinfo = wx.getStorageSync("myInfo");
    this.setData({
      section:app.globalData.Principal,
      StructKind:app.globalData.StructKind,
    })
    if (options.next && options.id) {
      this.setData({
        next: true
      })
      referStruct({
        ID: options.id
      }).then(res => {
        let item = res.Item;
        this.setData({
          pevInfo: item,
        })
      })
    } else if (options.id) {
      referStruct({
        ID: options.id
      }).then(res => {
        let item = res.Item;
        item.OrganizStructCode = item.OrganizStructCode.slice(-2);
        this.setData({
          info: item
        })
      })
    }
  },
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
      show_1: false,
    })
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