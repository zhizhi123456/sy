// pages/new/new.js
import Toast from 'vant-weapp/dist/toast/toast';
import {
  addofficeCost,
  detailofficeCost,
  updateofficeCost,
  addDictionary,
  costkind
} from "../../../../service/getData";
var util = require("../../../../utils/util");
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    info: {
      usechargeman: "1",
      StatisticalCycle: util.titleTime(new Date())
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
    seach: '',
    showchoice: false,
    applyfortype: '',
  },
  setSeach(e) {
    this.setData({
      seach: e.detail.value
    })
  },
  finditem() {
    let arr = util.findone(app.globalData.department, this.data.seach);
    this.setData({
      sections: arr,
      seach: ''
    })
  },
  setSeach1(e) {
    this.setData({
      seach1: e.detail.value
    })
  },
  finditem1() {
    let arr = util.findone(app.globalData.Companytitle, this.data.seach1);
    this.setData({
      nature: arr,
      seach1: ''
    })
  },
  // finditem1() {
  //   let arr = util.findone(app.globalData.costobj, this.data.seach);
  //   this.setData({
  //     section2: arr,
  //     seach: ''
  //   })
  // },
  finditem2() {
    let arr = util.findone(app.globalData.costkind, this.data.seach);
    this.setData({
      section3: arr,
      seach: ''
    })
  },
  // 总包项目名称
  projectnameblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 数字筛选
  checknum(e) {
    let info = this.data.info;
    util.formatNum(e);
    info.chargeamount = e.detail;
    this.setData({
      info
    })
  },
  // 公司名称
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
      show1: true,
      seach: ''
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
      show3: true,
      seach: ''
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
      show4: true,
      seach: ''
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
  onClosechoice() {
    this.setData({
      showchoice: false
    })
  },
  Dictionaryblur(e) {
    this.setData({
      applyfortype: e.detail
    })
  },
  confirmchoice() {
    var num = Math.round(app.globalData.costkind.length) + 1

    var ifhave = app.globalData.costkind.some(s => {
      return s.text == this.data.applyfortype
    })
    if (ifhave) {
      wx.showToast({
        title: '已存在相同信息',
        icon: 'none',
        duration: 3000
      })
    } else {
      var data = {
        Key: "chargetype" + num,
        Value: this.data.applyfortype,
        ParentId: '3083'
      }
      addDictionary(data).then(res => {
        if (res.code == 10000) {
          costkind().then(res => {
            let costkind = JSON.parse(res.replace(/Key/g, 'value').replace(/Value/g, 'text'));
            app.globalData.costkind = costkind;
            console.log(app.globalData.costkind)
            this.setData({
              section3: costkind,
              showchoice: false,
              applyfortype: ''
            })
          })
        }
      })

    }


  },
  newDictionary() {
    this.setData({
      showchoice: true
    })
  },
  confirm() {
    // //console.log(this.data.info)
    if (this.data.info.chargename && this.data.info.Companytitle &&
      this.data.info.department && this.data.info.belongtoman &&
      this.data.info.usechargeman) {
      let info = this.data.info;
      util.checkContent(info, this);
      util.intro(info, this)
      this.setData({
        info
      })
      addofficeCost(this.data.info).then(res => {
        console.log(res)
        if (res.code == 10000) {
          wx.showToast({
            title: '新建成功',
            icon: 'success',
            duration: 3000
          })
          util.OAreturn('officeCost')
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
    util.OAreturn('officeCost')
  },
  // 编辑分包项目页面的确定和返回
  editreturn() {
    util.OAreturn('officeCost', this)
  },
  editconfirm() {
    let info = this.data.info;
    util.checkChange(info, this, app.globalData.department);
    util.intro(info, this)
    this.setData({
      info
    })
    updateofficeCost(this.data.info).then(res => {
      // //console.log(res)
      if (res.code == 10000) {
        wx.showToast({
          title: '编辑成功',
          icon: 'success',
          duration: 3000
        })
        util.ModifyRecord(this.data.information, "OfficeCharge")
        util.OAreturn('officeCost', this)
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
    var user = wx.getStorageSync("myInfo");
    if (user) {
      var message = app.globalData.message
      console.log(message)
      let info = this.data.info;
      info.department = message.departmenttext
      info.Companytitle = message.Companytitletext
      info.belongtoman = message.userId
      this.setData({
        info
      })
    }
    if (options.id) {
      detailofficeCost({
        ID: options.id
      }).then(res => {
        // //console.log(res)
        let item = res.Item;
        var data1 = res.Item
        var b = JSON.stringify(data1)
        var c = JSON.parse(b)
        this.setData({
          information: c
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