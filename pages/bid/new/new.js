// pages/new/new.js
import Toast from 'vant-weapp/dist/toast/toast';
import {
  addbid,
  detailbid,
  updatebid
} from "../../../service/getData";
var util = require("../../../utils/util");
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    info: {
      projectname: "",
      Companytitle: "",
      department: "",
      ApprovalStatusint: "",
      bidprojectcode: "",
      projectprop: "",
      projecttype: "",
      projectaddress: "",
      bulidareas: "",
      projectrange: "",
      charageman: "",
      API_Picurl:[]
    },
    section1:[],
    section2:[],
    section3:[],
    section4:[],
    section4:[],
    section5:[],
    section6:[],
    section7:[],
    show1:false,
    show2:false,
    show3:false,
    show4:false,
    show5:false,
    show6:false,
    check_photo: [{
      name: "拍照"
    }, {
      name: "从相册选择"
    }],
    show_photo: false,
  },
  // 
  projectnameblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 公司抬头
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
  // 部门
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
  // 总包项目属性
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
  // 部门
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
  // 负责人
  showPopup7() {
    this.setData({
      show7: true
    })
  },
  onClose7() {
    this.setData({
      show7: false
    })
  },
  onConfirm7(e) {
    // console.log(e)
    let info = util.editInfo(e, this, e.detail.value.text);
    this.setData({
      info,
      show7: false
    })
  },
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
    if (this.data.info.projectname && this.data.info.Companytitle && this.data.info.department && this.data.info.ApprovalStatusint && this.data.info.bidprojectcode&&
      this.data.info.projectprop && this.data.info.projecttype && this.data.info.projectaddress && this.data.info.bulidareas && this.data.info.projectrange && this.data.info.charageman
      
      
      
      ) {
      let info = this.data.info;
      util.checkContent(info, this);
      util.intro(info, this)
      this.setData({
        info
      })
      addbid(this.data.info).then(res => {
        // console.log(res)
        if (res.code == 10000) {
          wx.showToast({
            title: '新建成功',
            icon: 'success',
            duration: 3000
          })
          util.returnPrev('bid')
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
    util.returnPrev('bid')
  },
  // 编辑分包项目页面的确定和返回
  editreturn() {
    util.returnPrev('bid', this)
  },
  editconfirm() {
    let info = this.data.info;
    util.checkChange(info, this, app.globalData.department);
    util.intro(info, this)
    this.setData({
      info
    })
    updatebid(this.data.info).then(res => {
      // console.log(res)
      if (res.code == 10000) {
        wx.showToast({
          title: '编辑成功',
          icon: 'success',
          duration: 3000
        })
        util.returnPrev('bid', this)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      section1:app.globalData.Companytitle,
      section2:app.globalData.department,
      section3:app.globalData.Projectprop,
      section4:app.globalData.Projecttype,
      section7:app.globalData.Principal
    })
    if (options.id) {
      detailbid({
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