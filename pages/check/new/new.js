// pages/new/new.js
import Toast from 'vant-weapp/dist/toast/toast';
import {
  addcheck,
  detailcheck,
  updatecheck,
  staff,
  getSubItems
} from "../../../service/getData";
var util = require("../../../utils/util");
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    upimg: false,
    departmenttext: "请选择",
    info: {
      subprojectcode: '',
      chargeman: '',
      scoremonth: '',
      qualityscore: '',
      progressscore: '',
      safetyscore: '',
      managescore: '',
      materialusescore: '',
      averagescore: '',
      picurl: []
    },
    check_photo: [{
      name: "拍照"
    }, {
      name: "从相册选择"
    }],
    show_photo: false,
    currentDate: new Date().getTime(),
    show: false,
    show1: false,
    show_time: false,
    sections: [],
    section1: []
  },
  // 分包项目编号
  showPopup() {
    this.setData({
      show: true
    })
  },
  onClose() {
    this.setData({
      show: false
    })
  },
  onConfirm(e) {
    console.log(e.detail.value)
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info,
      show: false,
      // departmenttext: e.detail.value.text
    })
  },
  // 负责人
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
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info,
      show1: false,
      // departmenttext: e.detail.value.text
    })
  },
  // 会议名称
  meetnamelur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 会议时间
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
  // 会议地点
  meetplaceblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 会议纪要
  meetbriefcontextblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
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
  dispose(info){
    if(info.qualityscore){
      info.qualityscore = parseInt(info.qualityscore)
    }
    if(info.progressscore){
      info.progressscore = parseInt(info.progressscore)
    }
    if(info.safetyscore){
      info.safetyscore = parseInt(info.safetyscore)
    }
    if(info.managescore){
      info.managescore = parseInt(info.managescore)
    }
    if(info.materialusescore){
      info.materialusescore = parseInt(info.materialusescore)
    }
    if(info.scoremonth){
      info.scoremonth = info.scoremonth.slice(0,7)
    }
  },
  confirm() {
    // console.log(this.data.info)
    if (this.data.info.subprojectcode) {
      let info = this.data.info;
      this.dispose(info)
      util.checkContent(info, this);
      this.setData({
        info
      })
      addcheck(this.data.info).then(res => {
        // console.log(res)
        if (res.code == 10000) {
          wx.showToast({
            title: '新建成功',
            icon: 'success',
            duration: 3000
          })
          util.returnPrev('check');
        } else {
          let info = this.data.info;
          info.picurl = [];
          this.setData({
            info
          })
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
    util.returnPrev('check');
  },
  // 编辑页面的确定和返回
  editreturn() {
    util.returnPrev('check', this);
  },
  editconfirm() {
    let info = this.data.info;
    this.dispose(info)
    util.checkChange(info, this, app.globalData.department);
    this.setData({
      info
    })
    updatecheck(this.data.info).then(res => {
      // console.log(res)
      if (res.code == 10000) {
        wx.showToast({
          title: '编辑成功',
          icon: 'success',
          duration: 3000
        })
        util.returnPrev('check', this);
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getSubItems().then(res=>{
      console.log(res)
      var w = res.List
      var q = w.map(s => {
        return s.subprojcectCode
      })
      this.setData({
        sections: q
      })
    })
    staff().then(res => {
      console.log(res)
      var w = JSON.parse(res)
      var q = w.map(s => {
        return s.Name
      })
      this.setData({
        section1: q
      })
    })
    
    if (options.id) {
      detailcheck({
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