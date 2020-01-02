// pages/new/new.js
import Toast from 'vant-weapp/dist/toast/toast';
import {
  Role, //职位职称数据
  MainProject, //总包项目id
  // addSubItems,
  // referSubItems,
  // amendSubItems，
  detailticket,
  updateticket,
  addticket
} from "../../../service/getData";
var util = require("../../../utils/util");
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    upimg: false,
    bianid: false,
    departmenttext: "",
    info: {
      ProjectID: "",
      Checkman: "",
      Ranks: "",
      Address: "",
      ClientManUnit: "",
      Getoutofline: "",
      FineAmount: "",
      FineAccording: "",
      API_Picurl: [],
      createman: "",
      createtime: "",
      updateman: "",
      updatetime: ""
    },
    i: 0,
    fileList: [],
    check_photo: [{
      name: "拍照"
    }, {
      name: "从相册选择"
    }],
    show_photo: false,
    currentDate: new Date().getTime(),
    currentDate1: new Date().getTime(),
    show: false,
    show_o: false,
    show_3: false,
    show_nature: false,
    show_time: false,
    show_endtime: false,
    // sections: [],
    // firms: [],
    // totals: [],
    // nature: [],
    section1: [],
    section2: []
  },
  // 项目id
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
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info,
      show: false
    })
  },
  // 职位职称
  showPopup_o() {
    this.setData({
      show_o: true
    });
  },
  onClose_o() {
    this.setData({
      show_o: false
    });
  },
  onConfirm_o(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info,
      show_o: false,
      // departmenttext: e.detail.value.text
    })
  },
  // 分包工程编号 处理内容
  subprojcectCodeblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
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
    console.log(e)
    console.log(util.datefomate(e.detail))
    let info = util.editInfo(e, this, util.datefomate(e.detail));
    this.setData({
      info,
      show_endtime: false
    })
  },
  // 照片
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
  confirm() {
    app.globalData.pic = []
    console.log(this.data.info)
    if (this.data.info.ProjectID && this.data.info.Checkman) {
      let info = this.data.info;

      util.checkContent(info, this);
      util.intro(info, this)

      this.setData({
        info
      })

      console.log(this.data.info)
      let infodata = {
        Timestamp: app.globalData.time,
        ...this.data.info
      }
      // console.log(infodata)
      addticket(infodata).then(res => {
        console.log(res)
        if (res.code == 10000) {
          wx.showToast({
            title: '新建成功',
            icon: 'success',
            duration: 3000
          })
          wx.redirectTo({
            url: '/pages/sceneticket/pact/pact'
          })
        }
      })
    } else {
      Toast({
        message: '请填写必填项 项目id,检查人 ',
        mask: true
      });
    }
  },
  // 返回
  return () {
    wx.redirectTo({
      url: "/pages/sceneticket/pact/pact"
    })
  },
  // 编辑分包项目页面的确定和返回
  editreturn() {
    wx.redirectTo({
      url: "/pages/sceneticket/detail/detail?id=" + this.data.info.ID
    })
  },
  editconfirm() {
    app.globalData.pic = []
    let info = this.data.info;
    util.checkChange(info, this, app.globalData.department);
    util.intro(info, this)
    this.setData({
      info
    })
    let infodata = {
      Timestamp: app.globalData.time,
      ...this.data.info
    }
    // console.log(infodata)
    updateticket(infodata).then(res => {
      console.log(res)
      if (res.code == 10000) {
        wx.showToast({
          title: '编辑成功',
          icon: 'success',
          duration: 3000
        })
        wx.redirectTo({
          url: "/pages/sceneticket/detail/detail?id=" + this.data.info.ID
        })
      }
    })
  },
  // 请求基础数据  //总包项目id 职位职称
  qingqiu() {
    Role().then(res => {
      // console.log(res)
      var q = JSON.parse(res)
      var s = q.map(t => {
        return t.Value
      })
      this.setData({
        section1: s
      })
      // console.log(this.data.section1)
    })
    MainProject().then(res => {
      console.log(res)
      var q = JSON.parse(res)
      var s = q.map(t => {
        return t.projectname
      })
      this.setData({
        section2: s
      })
      // console.log(this.data.section2)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.globalData.pic = []
    console.log(options.id)
    this.qingqiu()
    if (options.id) {
      this.setData({
        bianid: options.id // 页面判断是否有id
      })
      detailticket({
        Timestamp: app.globalData.time,
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