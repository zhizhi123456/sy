// pages/new/new.js
import Toast from 'vant-weapp/dist/toast/toast';
import {
  addstartUp,
  detailstartUp,
  updatestartUp,
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
      projectname: '',
      projectcode: '',
      subprojectname: "",
      subcompanyname: '',
      subprojectprop: '请选择',
      planbegindate: '请选择',
      planenddate: '请选择',
      bulidareas: '',
      contractamount: '',
      mainprojectcontext: '',
      remark: '',
      verifysubprocode: ''
    },
    currentDate: new Date().getTime(),
    currentDate1: new Date().getTime(),
    currentDate2: new Date().getTime(),
    show_nature: false,
    show_time: false,
    show_endtime: false,
    show_endtime1: false,
    show_endtime2: false,
    nature: [],
    show1: false,
    show2: false,
    show3: false,
    show5: false,
    show6: false,
    section1: [],
    section2: [],
    section3: ["是", "否"]
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
    let info = util.editInfo(e, this, e.detail.value.text);
    this.setData({
      info,
      show_nature: false
    })
  },
  // 计划开工时间
  showPopup_time() {
    this.setData({
      show_time: true
    })
  },
  // 工程编号
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
  // 施工单位
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
  // 维护部门意见
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
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info,
      show3: false
    })
  },
  // 填表单位
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
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info,
      show5: false
    })
  },
  // 批准单位
  showPopup6() {
    this.setData({
      show6: true
    })
  },
  onClose6() {
    this.setData({
      show6: false
    })
  },
  onConfirm6(e) {
    // console.log(e)
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info,
      show6: false
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
  // 维护部门盖章日期
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
  // 批准日期
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
    if (this.data.info.projectcode && this.data.info.opinion) {
      let info = this.data.info;
      if (info.opinion) {
        var whether = util.whether(info.opinion)
        info.opinion = whether
      }
      util.checkContent(info, this);
      util.intro(info,this)
      this.setData({
        info
      })
      addstartUp(this.data.info).then(res => {
        // console.log(res)
        if (res.code == 10000) {
          wx.showToast({
            title: '新建成功',
            icon: 'success',
            duration: 3000
          })
          util.returnPrev('startUp')
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
    util.returnPrev('startUp')
  },
  // 编辑分包项目页面的确定和返回
  editreturn() {
    util.returnPrev('startUp', this)
  },
  editconfirm() {
    let info = this.data.info;
    if (info.opinion) {
      var whether = util.whether(info.opinion)
      info.opinion = whether
    }
    util.checkChange(info, this, app.globalData.department);
    util.intro(info,this)
    this.setData({
      info
    })
    updatestartUp(this.data.info).then(res => {
      // console.log(res)
      if (res.code == 10000) {
        wx.showToast({
          title: '编辑成功',
          icon: 'success',
          duration: 3000
        })
        util.returnPrev('startUp', this)
      }
    })
  },
  qingqiu() {
    //  工程编号
    MainSubproject().then(res => {
      console.log(res)
      var w = JSON.parse(res)
      var q = w.map(s => {
        return s.subprojcectCode
      })
      this.setData({
        section1: q
      })
      //
    })
    // 公司
    Companytitle().then(res => {
      console.log(res)
      var w = JSON.parse(res)
      var q = w.map(s => {
        return s.Value
      })
      this.setData({
        section2: q
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.qingqiu()
    if (options.id) {
      detailstartUp({
        ID: options.id
      }).then(res => {
        // console.log(res)
        let item = res.Item;
        item.opinion = util.whethercontent(item.opinion)
        util.handleData(item, this, app.globalData.department);
        util.outflow(item,this)
        this.setData({
          info: item
        })
      })
    }
  },

})