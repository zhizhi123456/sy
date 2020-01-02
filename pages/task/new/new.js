// pages/new/new.js
import Toast from 'vant-weapp/dist/toast/toast';
import {
  addTask,
  referTask,
  amendTask
} from "../../../service/getData";
var util = require("../../../utils/util");
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    info: {
    },
    currentDate: new Date().getTime(),
    show: false,
    show_nature: false,
    show_state: false,
    show_time: false,
    show_endtime: false,
    show_kind: false,
    show_6: false,
    firms: [],
    totals: [],
    result: [],
    allkinds: [],
    nature: [],
    concludesign: []
  },
  // 建设单位名称
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
  // 项目名称
  projectnamelur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 任务书编号
  proassignbookcodeblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 总包项目类型
  showPopup_kind() {
    this.setData({
      show_kind: true
    })
  },
  onClose_kind() {
    this.setData({
      show_kind: false
    })
  },
  onChangekind(e) {
    this.setData({
      result: e.detail
    })
  },
  onConfirm_kind() {
    let info = this.data.info;
    info.mainprojecttype = this.data.result.join(",");
    this.setData({
      info,
      show_kind: false
    })
  },
  // 总包项目属性
  showPopup_4() {
    this.setData({
      show_nature: true
    })
  },
  onClose_4() {
    this.setData({
      show_nature: false
    })
  },
  onConfirm_4(e) {
    // console.log(e)
    let info = util.editInfo(e, this, e.detail.value.text);
    this.setData({
      info,
      show_nature: false
    })
  },
  // 甲方报建编号
  firstrptprjcodeblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 我公司项目编号
  showPopup_6() {
    this.setData({
      show_6: true
    })
  },
  onClose_6() {
    this.setData({
      show_6: false
    })
  },
  onConfirm_6(e) {
    // console.log(e)
    let info = util.editInfo(e, this, e.detail.value.text);
    this.setData({
      info,
      show_6: false
    })
  },
  // 项目地址以及建筑面积
  prjaddresssquareblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 施工内容
  projectcontextblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
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
  onConfirm_endtime(e) {
    let info = util.editInfo(e, this, util.datefomate(e.detail));
    this.setData({
      info,
      show_endtime: false
    })
  },
  // 合同签订情况
  showPopup_5() {
    this.setData({
      show_state: true
    })
  },
  onClose_5() {
    this.setData({
      show_state: false
    })
  },
  onConfirm_5(e) {
    // console.log(e)
    let info = util.editInfo(e, this, e.detail.value.text);
    this.setData({
      info,
      show_state: false
    })
  },
  // 项目联系人
  procontactmanblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 联系方式
  contactwayblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 附件内容情况说明
  attactfileexplainblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 备注
  remarkblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  confirm() {
    console.log(this.data.info)
    if (this.data.info.planbegindate && this.data.info.planenddate && this.data.info.projectname && this.data.info.proassignbookcode) {
      let info = this.data.info;
      util.checkContent(info, this);
      this.setData({
        info
      })
      // console.log(infodata)
      addTask(this.data.info).then(res => {
        // console.log(res)
        if (res.code == 10000) {
          wx.showToast({
            title: '新建成功',
            icon: 'success',
            duration: 3000
          })
          util.returnPrev('task')
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
    util.returnPrev('task')
  },
  // 编辑分包项目页面的确定和返回
  editreturn() {
    util.returnPrev('task',this)
  },
  editconfirm() {
    let info = this.data.info;
    util.checkChange(info, this,app.globalData.department);
    this.setData({
      info
    })
    amendTask(this.data.info).then(res => {
      // console.log(res)
      if (res.code == 10000) {
        wx.showToast({
          title: '编辑成功',
          icon: 'success',
          duration: 3000
        })
        util.returnPrev('task',this)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      firms: app.globalData.Companytitle,
      totals: app.globalData.MainProject,
      allkinds: app.globalData.Projecttype,
      nature: app.globalData.Projectprop,
      concludesign: app.globalData.Ifmakecontactlist
    })
    if (options.id) {
      referTask({
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