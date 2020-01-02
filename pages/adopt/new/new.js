// pages/new/new.js
import Toast from 'vant-weapp/dist/toast/toast';
import {
  addAdopt,
  referAdopt,
  amendAdopt
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
    show_time: false,
    show_time1: false,
    show_time2: false,
    show_time3: false,
    show_time4: false,
    show_time5: false,
    show_time6: false,
    totals: [],
  },
  // 工程名称
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
  // 建筑面积
  buildAreablur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 项目名称
  itemNameblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 工程地址
  projectSiteblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 结算签证时间
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
  // 单位
  unitblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 原预算工作量
  oldWorkQuentityblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 后变更工作量
  changeLaterblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 合计工作量
  sumWorkQuentityblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 监理复核
  supervisorReviewblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 业主经办人
  ownerUserblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 业主签订日期
  showPopup_time1() {
    this.setData({
      show_time1: true
    })
  },
  onClose_time1() {
    this.setData({
      show_time1: false
    })
  },
  onConfirm_time1(e) {
    let info = util.editInfo(e, this, util.datefomate(e.detail));
    this.setData({
      info,
      show_time1: false
    })
  },
  // 监理单位经办人
  supervisorUserblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 监理单位签订日期
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
  // 实施单位经办人
  implementUserblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 实施单位签订日期
  showPopup_time3() {
    this.setData({
      show_time3: true
    })
  },
  onClose_time3() {
    this.setData({
      show_time3: false
    })
  },
  onConfirm_time3(e) {
    let info = util.editInfo(e, this, util.datefomate(e.detail));
    this.setData({
      info,
      show_time3: false
    })
  },
  // 物业经办人
  tenementUserblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 物业签订日期
  showPopup_time4() {
    this.setData({
      show_time4: true
    })
  },
  onClose_time4() {
    this.setData({
      show_time4: false
    })
  },
  onConfirm_time4(e) {
    let info = util.editInfo(e, this, util.datefomate(e.detail));
    this.setData({
      info,
      show_time4: false
    })
  },
  // 施工单位经办人
  constructUserblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 施工单位签订日期
  showPopup_time5() {
    this.setData({
      show_time5: true
    })
  },
  onClose_time5() {
    this.setData({
      show_time5: false
    })
  },
  onConfirm_time5(e) {
    let info = util.editInfo(e, this, util.datefomate(e.detail));
    this.setData({
      info,
      show_time5: false
    })
  },
  // 街道经办人
  streetUserblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 街道办签订日期
  showPopup_time6() {
    this.setData({
      show_time6: true
    })
  },
  onClose_time6() {
    this.setData({
      show_time6: false
    })
  },
  onConfirm_time6(e) {
    let info = util.editInfo(e, this, util.datefomate(e.detail));
    this.setData({
      info,
      show_time6: false
    })
  },
  // 修缮科目
  RepairSubjectsblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 序号
  numberblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 计算式
  figureTypeblur(e) {
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
    // console.log(this.data.info)
    if (this.data.info.itemName&&this.data.info.projectName) {
      let info = this.data.info;
      util.checkContent(info, this);
      this.setData({
        info
      })
      // console.log(infodata)
      addAdopt(this.data.info).then(res => {
        // console.log(res)
        if (res.code == 10000) {
          wx.showToast({
            title: '新建成功',
            icon: 'success',
            duration: 3000
          })
          util.returnPrev('adopt')
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
    util.returnPrev('adopt')
  },
  // 编辑分包项目页面的确定和返回
  editreturn() {
    util.returnPrev('adopt', this)
  },
  editconfirm() {
    let info = this.data.info;
    util.checkChange(info, this, app.globalData.department);
    this.setData({
      info
    })
    amendAdopt(this.data.info).then(res => {
      // console.log(res)
      if (res.code == 10000) {
        wx.showToast({
          title: '编辑成功',
          icon: 'success',
          duration: 3000
        })
        util.returnPrev('adopt', this)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let MainProject = JSON.stringify(app.globalData.MainProject);
    MainProject = JSON.parse(MainProject.replace(/text/g, 'value').replace(/value/g, 'text'));
    this.setData({
      totals: MainProject,
    })
    if (options.id) {
      referAdopt({
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