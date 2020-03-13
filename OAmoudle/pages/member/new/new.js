// pages/new/new.js
import Toast from 'vant-weapp/dist/toast/toast';
import {
  addMembernew,
  referMembernew,
  amendMembernew
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
    departmenttext: "请选择",
    currentDate: new Date().getTime(),
  },
  // 账户
  userIdblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 姓名
  nameblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 职位
  positionblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 性别
  sexblur(e) {
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
  },
  // 状态
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
  // 学历
  learnrecordblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 户籍类型
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
  // 出生日期
  showPopup_time() {
    this.setData({
      show_time: true
    })
  },
  onClose_time() {
    this.setData({
      show_time: false
    })
  },
  onConfirm_time(e) {
    let info = util.editInfo(e, this, util.datefomate(e.detail));
    this.setData({
      info,
      show_time: false
    })
  },
  // 民族
  nationblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 毕业院校
  graduateschoolblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 所学专业
  majorblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 毕业日期
  showPopup_facttime() {
    this.setData({
      show_facttime: true
    })
  },
  onClose_facttime() {
    this.setData({
      show_facttime: false
    })
  },
  onConfirm_facttime(e) {
    let info = util.editInfo(e, this, util.datefomate(e.detail));
    this.setData({
      info,
      show_facttime: false
    })
  },
  // 职称证(详细记录)
  Titlecertificateblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 婚姻状况
  marriageblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 职称
  memberrankblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 入职日期
  showPopup_endtime() {
    this.setData({
      show_endtime: true
    })
  },
  onClose_endtime() {
    this.setData({
      show_endtime: false
    })
  },
  onConfirm_endtime(e) {
    let info = util.editInfo(e, this, util.datefomate(e.detail));
    this.setData({
      info,
      show_endtime: false
    })
    this.setData({
      mindata: e.detail
    })
    if (this.data.info.enterdate && this.data.info.onjobdate) {
      var duration = (new Date(this.data.info.onjobdate).getTime()) - (new Date(this.data.info.enterdate).getTime())
      if (duration < 0) {
        wx.showToast({
          title: '入职日期应小于离职时间',
          icon: 'none',
          duration: 3000
        })
        this.setData({
          "info.enterdate": '',
          "info.onjobdate": '',
          currentDate: new Date().getTime(),
        })
      }
    }
  },
  // 在职时间
  showPopup_timeZ() {
    this.setData({
      show_timeZ: true
    })
  },
  onClose_timeZ() {
    this.setData({
      show_timeZ: false
    })
  },
  onConfirm_timeZ(e) {
    let info = util.editInfo(e, this, util.datefomate(e.detail));
    this.setData({
      info,
      show_timeZ: false
    })
  },
  // 身份证号码
  IDcardNoblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 年龄
  ageblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 用工形式
  employmentformblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 手机号码
  mobilephoneblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 身份证地址
  IDcardNoAddressblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 紧急联系人
  urgentcontactmanblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 紧急联系电话
  urgentcontactphoneblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 紧急联系人关系
  urgentcontmanrelablur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // email
  emailblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 持有资质证书
  qualicertifiblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 入司前工作经历
  workexperienceblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 劳动手册相关
  labourmanualblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 公积金账号
  accumulatfundAccountblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  confirm() {
    // console.log(this.data.info)
    if (this.data.info.name && this.data.info.position && this.data.info.state && this.data.info.sex && this.data.info.department && this.data.info.birthday && this.data.info.userId) {
      let info = this.data.info;
      util.checkContent(info, this);
      this.setData({
        info
      })
      addMembernew(this.data.info).then(res => {
        // console.log(res)
        if (res.code == 10000) {
          wx.showToast({
            title: '新建成功',
            icon: 'success',
            duration: 3000
          })
          util.OAreturn('member');
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
    util.OAreturn('member');
  },
  // 编辑页面的确定和返回
  editreturn() {
    util.OAreturn('member', this);
  },
  editconfirm() {
    let info = this.data.info;
    util.checkChange(info, this, app.globalData.department);
    this.setData({
      info
    })
    amendMembernew(this.data.info).then(res => {
      if (res.code == 10000) {
        wx.showToast({
          title: '编辑成功',
          icon: 'success',
          duration: 3000
        })
        util.OAreturn('member', this);
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    user = wx.getStorageSync("myInfo");
    this.setData({
      sections: app.globalData.department,
      state: app.globalData.state,
      householdregister: app.globalData.householdregister,
    })
    if (options.id) {
      referMembernew({
        ID: options.id
      }).then(res => {
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
  onShareAppMessage: function () {

  }
})