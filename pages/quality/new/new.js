// pages/new/new.js
import Toast from 'vant-weapp/dist/toast/toast';
import {
  addquality,
  detailquality,
  updatequality,
  MainSubproject,
  Companytitle
} from "../../../service/getData";
var util = require("../../../utils/util");
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    info: {
      projectcode: '',
      commpanytitle: '',
      subprojectname: "",
      characterAccident: '',
      part: '',
      dateString: '',
      accconditions: '',
      acccause: '',
      acctrouble: '',
      accquantity	: '',
      costOfLabor: '',
      accquantity: '',
      otherCharges:"",
      lateWorkingDay:"",
      remark:"",
      ConstructionunitCheckMan:"",
      supervisionunit:""
    },
    currentDate: new Date().getTime(),
    show_nature: false,
    show_time: false,
    show_endtime: false,
    nature: [],
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
  // 分包项目属性
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
   // 分包项目属性
   showPopup1() {
    this.setData({
      show_nature1: true
    })
  },
  onClose1() {
    this.setData({
      show_nature1: false
    })
  },
  onConfirm1(e) {
    // console.log(e)
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info,
      show_nature1: false
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
    if (this.data.info.projectcode && this.data.info.commpanytitle && this.data.info.subprojectname && this.data.info.ConstructionunitCheckMan && this.data.info.supervisionunit) {
      let info = this.data.info;
      util.checkContent(info, this);
      util.intro(info,this)
      this.setData({
        info
      })
      addquality(this.data.info).then(res => {
        // console.log(res)
        if (res.code == 10000) {
          wx.showToast({
            title: '新建成功',
            icon: 'success',
            duration: 3000
          })
          util.returnPrev('quality')
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
    util.returnPrev('quality')
  },
  // 编辑分包项目页面的确定和返回
  editreturn() {
    util.returnPrev('quality',this)
  },
  editconfirm() {
   
    let info = this.data.info;
    util.checkChange(info, this,app.globalData.department);
    util.intro(info,this)
    this.setData({
      info
    })
    updatequality(this.data.info).then(res => {
      // console.log(res)
      if (res.code == 10000) {
        wx.showToast({
          title: '编辑成功',
          icon: 'success',
          duration: 3000
        })
        util.returnPrev('quality',this)
      }
    })
  },
  qingqiu(){
    // MainSubproject,
    // Companytitle 
    MainSubproject().then(res => {
      // console.log(res)
      var q = JSON.parse(res)
      var s = q.map(t => {
        return t.subprojectname
      })
      this.setData({
        section1: s,
      })
      // console.log(this.data.section1)
    })
    Companytitle().then(res => {
      // console.log(res)
      var q = JSON.parse(res)
      var s = q.map(t => {
        return t.Value
      })
      console.log(s)
      this.setData({
        section2: s,
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.qingqiu()
    this.setData({
      nature: app.globalData.nature
    })
   
    if (options.id) {
      detailquality({
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