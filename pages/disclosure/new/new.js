// pages/new/new.js
import Toast from 'vant-weapp/dist/toast/toast';
import {
  MainProject,
  MainSubproject,
  IntentionClass,
  adddisclosure,
  detaildisclosure,
  updatedisclosure
} from "../../../service/getData";
var util = require("../../../utils/util");
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    info: {
      RecID: '',
      ProjectIDName: '',
      SubProjectIDName: "",
      WorkPosition: '',
      WorkContext: '',
      TellIntentionClass: '',
      TellIntentionDate: '',
      TellIntentionContext: '',
      TellIntenTechSign: '',
      SpeciSafemanSign: '',
      AcceptIntentChargeSign: '',
      WorkManSign: '',
      Remark: ''
    },
    currentDate3: new Date().getTime(),
    show_nature: false,
    show_time: false,
    nature: [],
    sections: [],
    section1: [],
    show: false,
    show1: false,
    show2: false
  },
  // 总包项目名称
  projectnameblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 工程编号名称
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
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info,
      show_nature: false
    })
  },
  // 施工单位
  showPopup1() {
    this.setData({
      show1: true
    })
  },
  onClose1() {
    this.setData({
      show1: false
    })
  },
  onConfirm1(e) {
    // console.log(e)
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info,
      show1: false
    })
  },
  // 交底类别
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
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info,
      show2: false
    })
  },
  // 交底日期
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
  confirm() {
    // console.log(this.data.info)
    if (this.data.info.ProjectIDName && this.data.info.RecID) {
      let info = this.data.info;
      util.checkContent(info, this);
      util.intro(info,this)
      this.setData({
        info
      })
      adddisclosure(this.data.info).then(res => {
        // console.log(res)
        if (res.code == 10000) {
          wx.showToast({
            title: '新建成功',
            icon: 'success',
            duration: 3000
          })
          util.returnPrev('disclosure')
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
    util.returnPrev('disclosure')
  },
  // 编辑分包项目页面的确定和返回
  editreturn() {
    util.returnPrev('disclosure', this)
  },
  editconfirm() {
    let info = this.data.info;
    util.checkChange(info, this, app.globalData.department);
    util.intro(info,this)
    this.setData({
      info
    })
    updatedisclosure(this.data.info).then(res => {
      // console.log(res)
      if (res.code == 10000) {
        wx.showToast({
          title: '编辑成功',
          icon: 'success',
          duration: 3000
        })
        util.returnPrev('disclosure', this)
      }
    })
  },
  qingqiu() {
    // 工程编号
    MainProject().then(res => {
      // console.log(res)
      var w = JSON.parse(res)
      var q = w.map(s => {
        return s.projectname
      })
      this.setData({
        nature: q
      })
      //
    })
    //
    // 分部分项工程名称
    MainSubproject().then(res => {
      // console.log(res)
      var w = JSON.parse(res)
      var q = w.map(s => {
        return s.subprojectname
      })
      this.setData({
        sections: q
      })
    })
    // 交底类别
    IntentionClass().then(res => {
      // console.log(res)
      var w = JSON.parse(res)
      var q = w.map(s => {
        return s.Value
      })
      this.setData({
        section1: q
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.qingqiu()
    if (options.id) {
      detaildisclosure({
        ID: options.id
      }).then(res => {
        // console.log(res)
        let item = res.Item;
        util.handleData(item, this, app.globalData.department);
        util.outflow(item,this)
        this.setData({
          info: item
        })
      })
    }
  },


})