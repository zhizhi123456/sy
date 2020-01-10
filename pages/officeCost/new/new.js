// pages/new/new.js
import Toast from 'vant-weapp/dist/toast/toast';
import { 
  addofficeCost,
  detailofficeCost,
  updateofficeCost
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
    show4: false
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
    // console.log(e)
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
    // console.log(e)
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
    // console.log(e)
    let info = util.editInfo(e, this, e.detail.value.text);
    this.setData({
      info,
      show4: false
    })
  },
  confirm() {
    // console.log(this.data.info)
    if (this.data.info.chargename && this.data.info.Companytitle 
      && this.data.info.department && this.data.info.belongtoman 
      && this.data.info.usechargeman ) {
      let info = this.data.info;
      util.checkContent(info, this);
      util.intro(info, this)
      this.setData({
        info
      })
      addofficeCost(this.data.info).then(res => {
        // console.log(res)
        if (res.code == 10000) {
          wx.showToast({
            title: '新建成功',
            icon: 'success',
            duration: 3000
          })
          util.returnPrev('officeCost')
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
    util.returnPrev('officeCost')
  },
  // 编辑分包项目页面的确定和返回
  editreturn() {
    util.returnPrev('officeCost', this)
  },
  editconfirm() {
    let info = this.data.info;
    util.checkChange(info, this, app.globalData.department);
    util.intro(info, this)
    this.setData({
      info
    })
    updateofficeCost(this.data.info).then(res => {
      // console.log(res)
      if (res.code == 10000) {
        wx.showToast({
          title: '编辑成功',
          icon: 'success',
          duration: 3000
        })
        util.returnPrev('officeCost', this)
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
      detailofficeCost({
        ID: options.id
      }).then(res => {
        // console.log(res)
        let item = res.Item;
        util.handleData(item, this, app.globalData.department);
        util.outflow(item, this)
        this.setData({
          info: item
        })
      })
    }
  },


})