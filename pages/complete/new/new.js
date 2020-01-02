// pages/new/new.js
import Toast from 'vant-weapp/dist/toast/toast';
import {
  MainProject,
  Companytitle,
  addcomplete,
  detailcomplete,
  updatecomplete
} from "../../../service/getData";
var util = require("../../../utils/util");
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    info: {
      RecordCode: '',
      EngineerName: '',
      BuiliderCompany: "",
      ConstructCompany: '',
      PlanStartEngierdate: '',
      PlanCompleteEngierdate: '',
      PlanEndEngierdate: '',
      ActEndEngierdate: '',
      CompleteEnginerContext: '',
      AdvOrDelayReason: '',
      SupervisionExamRpt: '',
    },
    currentDate: new Date().getTime(),
    currentDate1: new Date().getTime(),
    currentDate2: new Date().getTime(),
    currentDate3:new Date().getTime(),
    show_nature: false,
    show_time: false,
    show_endtime: false,
    show_endtime1: false,
    show_endtime2: false,
    nature: [],
    sections: [],
    show: false
  },
  // 总包项目名称
  projectnameblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 总包项目编号
  projectcodelur(e) {
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
  // 计划完工日期
  showPopup_endtime1() {
    this.setData({
      show_endtime1: true
    })
  },
  onClose_endtime1() {
    this.setData({
      show_endtime1: false
    })
  },
  onConfirm_endtime1(e) {
    let info = util.editInfo(e, this, util.datefomate(e.detail));
    this.setData({
      info,
      show_endtime1: false
    })
  },
  // 实际完工日期
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
  // 施工地点
  bulidareasblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 合同金额
  contractamountblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 主要施工内容
  mainprojectcontextblur(e) {
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
  // 标准的分包项目编号
  verifysubprocodeblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  confirm() {
    // console.log(this.data.info)
    if (this.data.info.EngineerName && this.data.info.RecordCode) {
      let info = this.data.info;
      util.intro(info,this)
      util.checkContent(info, this);
     
      this.setData({
        info
      })
      addcomplete(this.data.info).then(res => {
        // console.log(res)
        if (res.code == 10000) {
          wx.showToast({
            title: '新建成功',
            icon: 'success',
            duration: 3000
          })
          util.returnPrev('complete')
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
    util.returnPrev('complete')
  },
  // 编辑分包项目页面的确定和返回
  editreturn() {
    util.returnPrev('complete', this)
  },
  editconfirm() {
    let info = this.data.info;
    util.checkChange(info, this, app.globalData.department);
    util.intro(info,this)
    this.setData({
      info
    })
    updatecomplete(this.data.info).then(res => {
      // console.log(res)
      if (res.code == 10000) {
        wx.showToast({
          title: '编辑成功',
          icon: 'success',
          duration: 3000
        })
        util.returnPrev('complete', this)
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
    // 公司
    Companytitle().then(res => {
      // console.log(res)
      var w = JSON.parse(res)
      var q = w.map(s => {
        return s.Value
      })
      this.setData({
        sections: q
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.qingqiu()
    if (options.id) {
      detailcomplete({
        ID: options.id
      }).then(res => {
        console.log(res)
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