// pages/new/new.js
import Toast from 'vant-weapp/dist/toast/toast';
import { 
  addresumption,
  detailresumption,
  updateresumption
} from "../../../../service/getData";
var util = require("../../../../utils/util");
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    info: {
      applycancelman: '',
      Companytitle: '',
      department: "",
      cancelreason: '',
      leavecancedate: '',
      leaveenddate: '',
      leavedate: '',
      show_time: false,
      show_time1: false,
      show_time3: false,
      show_time14: false,
    },
    show_nature: false,
    nature: [],
    sections: [],
    section1: [],
    section2: [],
    section3: [],
    section4: [],
    show: false,
    show1: false,
    show2: false,
    show3: false,
    show4: false,
    currentDate: new Date().getTime(),
    currentDate1: new Date().getTime(),
    currentDate3: new Date().getTime(),
    currentDate4: new Date().getTime(),
  },
  // 总包项目名称
  projectnameblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 公司抬头
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
    // //console.log(e)
    let info = util.editInfo(e, this, e.detail.value.text);
    this.setData({
      info,
      show_nature: false
    })
  },
  // 部门
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
    // //console.log(e)
    let info = util.editInfo(e, this, e.detail.value.text);
    this.setData({
      info,
      show1: false
    })
  },
  // 所有人
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
    // //console.log(e)
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
    // //console.log(e)
    let info = util.editInfo(e, this, e.detail.value.text);
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
    // //console.log(e)
    let info = util.editInfo(e, this, e.detail.value.text);
    this.setData({
      info,
      show4: false
    })
  },
  // 签订时间
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
  // 计划开工时间
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
  // 创建时间
  showPopup_time2() {
    this.setData({
      show_time3: true
    })
  },
  onClose_time2() {
    this.setData({
      show_time3: false
    })
  },
  onConfirm_time2(e) {
    let info = util.editInfo(e, this, util.datefomate(e.detail));
    this.setData({
      info,
      show_time3: false
    })
  },
  
  confirm() {
    // //console.log(this.data.info)
    if (this.data.info.applycancelman && this.data.info.Companytitle 
      && this.data.info.department && this.data.info.cancelreason 
      && this.data.info.leavecancedate &&  this.data.info.leaveenddate &&
      this.data.info.leavedate) {
      let info = this.data.info;
      util.checkContent(info, this);
      util.intro(info, this)
      this.setData({
        info
      })
      addresumption(this.data.info).then(res => {
        // //console.log(res)
        if (res.code == 10000) {
          wx.showToast({
            title: '新建成功',
            icon: 'success',
            duration: 3000
          })
          util.OAreturn('resumption')
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
    util.OAreturn('resumption')
  },
  // 编辑分包项目页面的确定和返回
  editreturn() {
    util.OAreturn('resumption', this)
  },
  editconfirm() {
    let info = this.data.info;
    util.checkChange(info, this, app.globalData.department);
    util.intro(info, this)
    this.setData({
      info
    })
    updateresumption(this.data.info).then(res => {
      // //console.log(res)
      if (res.code == 10000) {
        wx.showToast({
          title: '编辑成功',
          icon: 'success',
          duration: 3000
        })
        util.ModifyRecord(this.data.information,"OfficeCharge")
        util.OAreturn('resumption', this)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      nature: app.globalData.Companytitle,
      sections: app.globalData.department,
      section1: app.globalData.Principal,
      section2: app.globalData.costobj,
      section3: app.globalData.costkind,
    })
    if (options.id) {
      detailresumption({
        ID: options.id
      }).then(res => {
        // //console.log(res)
        let item = res.Item;
        var data1 =res.Item
        var b = JSON.stringify(data1)
        var c  = JSON.parse(b)
        this.setData({
          information:c
        })
        util.handleData(item, this, app.globalData.department);
        util.outflow(item, this)
        this.setData({
          info: item
        })
      })
    }
  },


})