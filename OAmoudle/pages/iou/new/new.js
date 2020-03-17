// pages/new/new.js
import Toast from 'vant-weapp/dist/toast/toast';
import {
  addiou,
  detailiou,
  updateiou
} from "../../../../service/getData";
var util = require("../../../../utils/util");
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    info: {
      debitnotetype: '',
      Companytitle: '',
      department: "",
      usesealtype: '',
      projectcode: '',
      subprojectcode: '',
      amount: '',
      leavereason: '',
      API_Picurl: [],
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
    show5: false,
    show6: false,
    currentDate: new Date().getTime(),
    currentDate1: new Date().getTime(),
    currentDate3: new Date().getTime(),
    currentDate4: new Date().getTime(),
    show_photo: false,
    check_photo: [{
      name: "拍照"
    }, {
      name: "从相册选择"
    }],
    goods: true,
    money: true,
    chapter: true
  },
  // 图片
  showPopup_photo() {
    this.setData({
      show_photo: true
    })
  },
  onClose_photo() {
    this.setData({
      show_photo: false
    })
  },
  onSelect_photo(e) {
    util.upImage(this);
  },
  delimg(e) {
    util.deleteImg(this, e)
  },
  tap_pic(e) {
    util.preview(this, e)
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
    info.amount = e.detail;
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
    if (e.detail.value.text == '物类') {
      this.setData({
        chapter: false,
        money: false,
      })
    }
    if (e.detail.value.text == '钱类') {
      this.setData({
        chapter: false,
        money: true,
      })
    }
    if (e.detail.value.text == '章类') {
      this.setData({
        chapter: true,
        money: false,
      })
    }
  },
  // 用章类型
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
  // 公司抬头
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
  // 分包项目编号
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
    // //console.log(e)
    let info = util.editInfo(e, this, e.detail.value.value);
    this.setData({
      info,
      show5: false
    })
  },
  // 项目编号
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
    // //console.log(e)
    let info = util.editInfo(e, this, e.detail.value.value);
    this.setData({
      info,
      show6: false
    })
  },
  confirm() {
    // //console.log(this.data.info)
    if (this.data.info.debitnotetype && this.data.info.Companytitle &&
      this.data.info.department) {
      let info = this.data.info;
      util.checkContent(info, this);
      util.intro(info, this)
      this.setData({
        info
      })
      addiou(this.data.info).then(res => {
        // //console.log(res)
        if (res.code == 10000) {
          wx.showToast({
            title: '新建成功',
            icon: 'success',
            duration: 3000
          })
          util.OAreturn('iou')
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
    util.OAreturn('iou')
  },
  // 编辑分包项目页面的确定和返回
  editreturn() {
    util.OAreturn('iou', this)
  },
  editconfirm() {
    let info = this.data.info;
    util.checkChange(info, this, app.globalData.department);
    util.intro(info, this)
    this.setData({
      info
    })
    updateiou(this.data.info).then(res => {
      // //console.log(res)
      if (res.code == 10000) {
        wx.showToast({
          title: '编辑成功',
          icon: 'success',
          duration: 3000
        })
        util.ModifyRecord(this.data.information, "debitnote")
        util.OAreturn('iou', this)
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
      section1: app.globalData.Debitnotetype,
      section2: app.globalData.Usesealtype,
      section6: app.globalData.MainProject1,
      section5: app.globalData.MainSubproject
    })
    var user = wx.getStorageSync("myInfo");
    if (user) {
      var message = wx.getStorageSync("message");
      console.log(message)
      let info = this.data.info;
      info.department = message.departmenttext
      info.Companytitle = message.Companytitletext
      this.setData({
        info
      })
    }
    if (options.id) {
      detailiou({
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
        if (item.debitnotetype == '物类') {
          this.setData({
            chapter: false,
            money: false,
          })
        }
        if (item.debitnotetype == '钱类') {
          this.setData({
            chapter: false,
            money: true,
          })
        }
        if (item.debitnotetype == '章类') {
          this.setData({
            chapter: true,
            money: false,
          })
        }
       
      })
    }
  },


})