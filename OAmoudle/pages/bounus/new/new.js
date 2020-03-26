// pages/new/new.js
import Toast from 'vant-weapp/dist/toast/toast';
import {
  addMemberBounus,
  referMemberBounus,
  amendMemberBounus,
  TotalBonus,
  ProjectDeptBonus,
  DeptMemberBounus
} from "../../../../service/getData";
var util = require("../../../../utils/util");
var app = getApp();
let user = wx.getStorageSync("myInfo");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    info: {},
    show: false,
    firms: [],
    totals: [],
    currentDate: new Date().getTime(),
    departmenttext: "请选择",
    MemberLevels: [{
      text: '公司领导',
      value: 0
    }, {
      text: '部门领导',
      value: 1
    }, {
      text: '部门员工',
      value: 2
    }]
  },
  // 项目编号
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
    let info = util.editInfo(e, this, e.detail.value.value);
    info.projectname = e.detail.value.text;
    this.setData({
      info,
      show: false
    })
    //项目总奖金
    TotalBonus({
      projcectCode: e.detail.value.value
    }).then(res => {
      console.log(res)
    })
  },
  // 奖金种类
  BonusKindblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
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
    ProjectDeptBonus({
      Department: e.detail.value.text
    }).then(res => {
      console.log(res)
    })
  },
  // 员工姓名
  overtimehoursblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
    DeptMemberBounus({
      DeptMemberBounus: e.detail.value
    }).then(res => {
      console.log(res)
    })
  },
  // 员工级别
  // MemberLevelblur(e) {
  //   let info = util.editInfo(e, this, e.detail.value);
  //   this.setData({
  //     info
  //   })
  // },
  // 员工级别
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
  // 奖金级别
  showPopup_2() {
    this.setData({
      show_2: true
    });
  },
  onClose_2() {
    this.setData({
      show_2: false
    });
  },
  onConfirm_2(e) {
    let info = util.editInfo(e, this, e.detail.value.text);
    this.setData({
      info,
      show_2: false
    })
  },
  // 奖金额
  Bounusamountsblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  confirm() {
    // console.log(this.data.info)
    if (this.data.info.projcectCode && this.data.info.projectname && this.data.info.BonusKind && this.data.info.Department && this.data.info.DepartmentMan) {
      let info = this.data.info;
      util.checkContent(info, this);
      this.setData({
        info
      })
      addMemberBounus(this.data.info).then(res => {
        // console.log(res)
        if (res.code == 10000) {
          wx.showToast({
            title: '新建成功',
            icon: 'success',
            duration: 3000
          })
          util.OAreturn('bounus');
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
    util.OAreturn('bounus');
  },
  // 编辑页面的确定和返回
  editreturn() {
    util.OAreturn('bounus', this);
  },
  editconfirm() {
    let info = this.data.info;
    util.checkChange(info, this, app.globalData.department);
    this.setData({
      info
    })
    // console.log(infodata)
    amendMemberBounus(this.data.info).then(res => {
      // console.log(res)
      if (res.code == 10000) {
        wx.showToast({
          title: '编辑成功',
          icon: 'success',
          duration: 3000
        })
        util.OAreturn('bounus', this);
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      totals: app.globalData.MainProject,
      sections: app.globalData.department
    })
    if (options.id) {
      referMemberBounus({
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
    user = wx.getStorageSync("myInfo");
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
    user = wx.getStorageSync("myInfo");
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
  onShareAppMessage: function () {}
})