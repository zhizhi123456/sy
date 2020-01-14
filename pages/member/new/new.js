// pages/new/new.js
import Toast from 'vant-weapp/dist/toast/toast';
import {
  addmember,
  detailmember,
  updatemember,
  ConstructionTeam
} from "../../../service/getData";
var util = require("../../../utils/util");
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    info: {
      ConstructionTeamID: '',
      MemberName: '',
      Age: "",
      nation: '',
      nativePlace: '',
      Address: '',
      contactway: '',
      duty: '',
      API_Picurl: []
    },
    show_nature1: false,
    section2: [],
    section3:[],
    show_photo: false,
    ConstructionTeamIDtext: '',
    check_photo: [{
      name: "拍照"
    }, {
      name: "从相册选择"
    }],
    MemberNametext:'',
    show2:false
  },
  // 照片
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
  projectcodelur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
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
    let info = util.editInfo(e, this, e.detail.value.value);

    this.setData({
      info,
      show_nature1: false,
      ConstructionTeamIDtext: e.detail.value.text
    })
  },
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
    let info = util.editInfo(e, this, e.detail.value.value);

    this.setData({
      info,
      show2: false,
      MemberNametext: e.detail.value.text
    })
  },
  confirm() {

    let info = this.data.info;
    if (this.data.info.ConstructionTeamID && !(isNaN(info.Age))) {
      info.Age = parseInt(Number(info.Age))
      util.checkContent(info, this);
      util.intro(info, this)
      this.setData({
        info
      })
      addmember(this.data.info).then(res => {
        // console.log(res)
        if (res.code == 10000) {
          wx.showToast({
            title: '新建成功',
            icon: 'success',
            duration: 3000
          })
          util.returnPrev('member')
        }
      })
    } else {
      Toast({
        message: '请填写必填项,请填写正确的年龄',
        mask: true
      });
    }
  },
  // 返回
  return () {
    util.returnPrev('member')
  },
  // 编辑分包项目页面的确定和返回
  editreturn() {
    util.returnPrev('member', this)
  },
  editconfirm() {

    let info = this.data.info;
    util.checkChange(info, this, app.globalData.department);
    util.intro(info, this)
    this.setData({
      info
    })
    updatemember(this.data.info).then(res => {
      // console.log(res)
      if (res.code == 10000) {
        wx.showToast({
          title: '编辑成功',
          icon: 'success',
          duration: 3000
        })
        util.returnPrev('member', this)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      section2: app.globalData.ConstructionTeam,
      section3:app.globalData.Principal
    })
    if (options.id) {
      detailmember({
        ID: options.id
      }).then(res => {
        // console.log(res)
        let item = res.Item;
        util.handleData(item, this, app.globalData.department);
        util.outflow(item, this)
        this.setData({
          ConstructionTeamIDtext: item.ConstructionTeamID,
          MemberNametext:item.MemberName
        })
        this.setData({
          info: item
        })
      })
    }
  },

})