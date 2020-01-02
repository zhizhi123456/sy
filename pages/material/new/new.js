// pages/new/new.js
import Toast from 'vant-weapp/dist/toast/toast';
import {
  addmaterial,
  updatematerial,
  detailmaterial,

} from "../../../service/getData";
var util = require("../../../utils/util");
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    upimg: false,
    departmenttext: "",
    info: {
      goodscode: "",
      goodsothercode: "",
      goodsname: "",
      specifications: "",
      goodsclasscode: "",
      quantity: "",
      unitprice: "",
      API_Picurl: [],
    },
    check_photo: [{
      name: "拍照"
    }, {
      name: "从相册选择"
    }],
    show_photo: false,
    currentDate: new Date().getTime(),
    show: false,
    show_time: false,
    sections: [],
  },
 
  // 部门
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
    let info = util.editInfo(e, this, e.detail.value.value);
    this.setData({
      info,
      show: false,
      departmenttext: e.detail.value.text
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
  confirm() {
    // console.log(this.data.info)
    if (this.data.info.goodscode && this.data.info.goodsothercode && this.data.info.goodsname && this.data.info.specifications && this.data.info.quantity && this.data.info.unitprice) {
      let info = this.data.info;
      util.checkContent(info, this);
      this.setData({
        info
      })
      addmaterial(this.data.info).then(res => {
        // console.log(res)
        if (res.code == 10000) {
          wx.showToast({
            title: '新建成功',
            icon: 'success',
            duration: 3000
          })
          util.returnPrev('material');
        } else {
          let info = this.data.info;
          info.API_Picurl = [];
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
    util.returnPrev('material');
  },
  // 编辑页面的确定和返回
  editreturn() {
    util.returnPrev('material', this);
  },
  editconfirm() {
    let info = this.data.info;
    util.checkChange(info, this, app.globalData.department);
    this.setData({
      info
    })
    updatematerial(this.data.info).then(res => {
      // console.log(res)
      if (res.code == 10000) {
        wx.showToast({
          title: '编辑成功',
          icon: 'success',
          duration: 3000
        })
        util.returnPrev('material', this);
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      sections: app.globalData.department
    })
    if (options.id) {
      detailmaterial({
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