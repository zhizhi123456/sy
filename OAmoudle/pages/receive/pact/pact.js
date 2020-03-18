// pages/generalcontract/pact/pact.js
import {
  qgroupreceive
} from '../../../../service/getData';
var app = getApp();
var util = require("../../../../utils/util");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    item: [],
    seach: '',
    loading: false,
    top: '材料领用查询',
    currentDate: new Date().getTime(),
    pages: 1,
    InfoList: [],
    info: {
      StartTime: "",
      EndTime: "",
      project: "",
      warehouseName: "",
      Type: '',
      chargemanName: "",
      keyword: "",
    },
    sections: '',
    pull: false,
    show: false,
    currentDate: new Date().getTime(),
    currentDate1: new Date().getTime(),
    show_time: false,
    show_endtime: false,
  },
  // 返回
  return () {
    util.returnMenu2(1006, "材料管理");
  },
  setSeach(e) {
    // console.log(e)
    this.setData({
      seach: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.source) {
      wx.setStorageSync('carte', options)
    }
    this.setData({
      sections: app.globalData.MainProject,
      section1: app.globalData.states,
      section2: app.globalData.Goodsname,
      section5: app.globalData.Companytitle,
      section3: app.globalData.statistics,
      section4: app.globalData.Principal,
      'info.c': 'c'
    })
    util.qgroupdeliver(qgroupreceive, this, 0, 1)

  },
  // 总包项目名称
  projectnameblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 分包项目名称
  subprojectnameblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 分包单位名称
  subcompanynameblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 分包项目属性
  subprojectpropblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 开始时间
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
  // 结束时间
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
  },
  // 开始时间
  showPopup_time2() {
    this.setData({
      show_time2: true
    })
  },
  onClose_time2() {
    this.setData({
      show_time2: false
    })
  },
  onConfirm_time2(e) {
    let info = util.editInfo(e, this, util.datefomate(e.detail));
    this.setData({
      info,
      show_time2: false
    })
  },
  // 结束时间
  showPopup_endtime2() {
    this.setData({
      show_endtime2: true
    })
  },
  onClose_endtime2() {
    this.setData({
      show_endtime2: false
    })
  },
  onConfirm_endtime2(e) {
    let info = util.editInfo(e, this, util.datefomate(e.detail));
    this.setData({
      info,
      show_endtime2: false
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  meetplaceblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  showPopup1() {
    this.setData({
      show1: true
    });
  },
  onClose1() {
    this.setData({
      show1: false
    });
  },
  onConfirm1(e) {
    let info = util.editInfo(e, this, e.detail.value.value);
    this.setData({
      info,
      show1: false,
      // departmenttext: e.detail.value.text
    })
  },
  // 部门
  showPopup2() {
    this.setData({
      show2: true
    })
  },
  onClose2() {
    this.setData({
      show2: false
    })
  },
  onConfirm2(e) {
    // console.log(e)
    let info = util.editInfo(e, this, e.detail.value.text);
    this.setData({
      info,
      show2: false
    })
  },
  // 费用对象
  showPopup3() {
    this.setData({
      show3: true
    })
  },
  onClose3() {
    this.setData({
      show3: false
    })
  },
  onConfirm3(e) {
    // console.log(e)
    let info = util.editInfo(e, this, e.detail.value.value);
    this.setData({
      info,
      show3: false
    })
  },
  // 费用类型
  showPopup4() {
    this.setData({
      show4: true
    })
  },
  onClose4() {
    this.setData({
      show4: false
    })
  },
  onConfirm4(e) {
    // console.log(e)
    let info = util.editInfo(e, this, e.detail.value.value);
    this.setData({
      info,
      show4: false
    })
  },
  // 创建人
  showPopup5() {
    this.setData({
      show5: true
    })
  },
  onClose5() {
    this.setData({
      show5: false
    })
  },
  onConfirm5(e) {
    // console.log(e)
    let info = util.editInfo(e, this, e.detail.value.value);
    this.setData({
      info,
      show5: false
    })
  },
  // 计划开工时间
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
  // 计划完工时间
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
  //公司名称
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
      // departmenttext: e.detail.value.text
    })
  },
  onConfirm_endtime(e) {
    // console.log(e)
    // console.log(util.datefomate(e.detail))
    let info = util.editInfo(e, this, util.datefomate(e.detail));
    this.setData({
      info,
      show_endtime: false
    })
  },
  change() {
    this.setData({
      pull: true,
      show: true
    })
  },
  onClose() {
    this.setData({
      show: false
    });
  },
  // 组合查询
  seachqur() {
    this.setData({
      'info.c': 'c'
    })
    util.qgroupdeliver(qgroupreceive, this)
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

})