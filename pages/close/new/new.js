// pages/new/new.js
import Toast from 'vant-weapp/dist/toast/toast';
import {
  addClose,
  referClose,
  amendClose
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
  // 序号
  serialblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 名称
  nameblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 单位
  unitblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 计算式
  calculatedModeblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 工程量
  quantityblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 监理确认数
  confirmTheDatablur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 施工单位
  constructionunitblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 项目经理
  constructionunitCheckManblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 施工单位盖章日期
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

  // 监理单位
  supervisionunitblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 总监理工程师
  supervisionunitCheckManblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 监理单位盖章日期
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
  // 实施单位
  exploitingentityblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 实施单位盖章日期
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
  confirm() {
    // console.log(this.data.info)
    if (this.data.info.projectcode && this.data.info.serial&& this.data.info.name&& this.data.info.unit&& this.data.info.calculatedMode&& this.data.info.quantity) {
      let info = this.data.info;
      util.checkContent(info, this);
      this.setData({
        info
      })
      // console.log(infodata)
      addClose(this.data.info).then(res => {
        // console.log(res)
        if (res.code == 10000) {
          wx.showToast({
            title: '新建成功',
            icon: 'success',
            duration: 3000
          })
          util.returnPrev('close')
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
    util.returnPrev('close')
  },
  // 编辑分包项目页面的确定和返回
  editreturn() {
    util.returnPrev('close', this)
  },
  editconfirm() {
    let info = this.data.info;
    util.checkChange(info, this, app.globalData.department);
    this.setData({
      info
    })
    amendClose(this.data.info).then(res => {
      // console.log(res)
      if (res.code == 10000) {
        wx.showToast({
          title: '编辑成功',
          icon: 'success',
          duration: 3000
        })
        util.returnPrev('close', this)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      totals: app.globalData.MainProject,
    })
    if (options.id) {
      referClose({
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


})