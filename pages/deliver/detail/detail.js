// pages/detail/detail.js
import {
  detaildeliver,
  querydeliversmall,
  deldeliver,
  qgroupdeliver,
  qgroupdeliversmall
} from '../../../service/getData';
var app = getApp();
var util = require("../../../utils/util");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    edit: false,
    speak: '',
    show: false,
    info: {},
    active: 0,
    steps: [],
    material_list: [],
    table: "a",
    small: {
      delievryid: "",
      goodscode: "",
      goodsname: "",
      specifications: "",
      unit: "",
      quantity: "",
      demo: "",

    },
    InfoList: [],
    pull: false,
    show: false,
    currentDate: new Date().getTime(),
    currentDate1: new Date().getTime(),
    show_time: false,
    show_endtime: false,
  },

  // 返回
  return () {
    wx.redirectTo({
      url: "/pages/deliver/pact/pact"
    })
  },
  tap_pic(e) {
    util.preview(this, e)
  },
  defaultimg(e) {
    let info = util.defaultimg(e, this);
    this.setData({
      info
    })
  },
  add_speak() {
    this.setData({
      show: true
    })
  },
  onChange(e) {
    this.setData({
      show: false,
      speak: e.detail.value
    })
  },
  defaultimg(e) {
    let i = e.currentTarget.dataset.name,
      info = this.data.info;
    info.API_Picurl[i] = "../../../img/default-pic.png";
    this.setData({
      info
    })
    // console.log(this.data.info)
  },
  delete() {
    deldeliver({
      Timestamp: app.globalData.time,
      ID: this.data.info.ID
    }).then(res => {
      console.log(res)
      if (res.code == 10000) {
        wx.showToast({
          title: '删除成功',
          icon: 'success',
          duration: 3000
        })
        wx.redirectTo({
          url: "/pages/deliver/pact/pact"
        })
      }
    })
  },
  // 新增明细表
  addndlink() {
    wx.redirectTo({
      url: "/pages/deliver/newlink/newlink?id=" + this.data.info.ID
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    });
   //只能查询当前页面的 材料
    this.setData({
      'small.delievryid':options.id
    })
    if (options.id) {
      console.log(options.id)
      // 资料详情options.id
      detaildeliver({
        Timestamp: app.globalData.time,
        ID: options.id
      }).then(res => {
        if (res.code == 10000) {
          let item = res.Item;
          for (let i in item) {
            if (item[i] == null || item[i] == "null" || !item[i]) {
              item[i] = "";
            }
          }
          if (item.API_Picurl) {
            item.API_Picurl = item.API_Picurl.split(",");
          }
          this.setData({
            info: item
          })
          wx.hideLoading();
        }
      })
      console.log()
      // 领料单关联的明细列表
      querydeliversmall({
        Timestamp: app.globalData.time,
        delievryid: options.id
      }).then(res => {
        // console.log(res)
        if (res.code == 10000) {
          this.setData({
            material_list: res.List.reverse()
          })
        }
      }).catch(err => {
        console.log(err)
      })
    }
    if (options.table) {
      this.setData({
        table: options.table
      })
    }
  },

  meetplaceblur(e) {
    let small = util.editInfo(e, this, e.detail.value);
    this.setData({
      small
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
    // console.log(e)
    // console.log(util.datefomate(e.detail))
    let info = util.editInfo(e, this, util.datefomate(e.detail));
    this.setData({
      info,
      show_endtime: false
    })
  },
  change() {
    this.setData({
      pull: true,
      show: true,
    })
  },
  onClose() {
    this.setData({
      show: false
    });
  },
  // 组合查询
  seachqur() {
    
    this.data.small.delievryid = this.data.info.ID

    util.qgroupsmall(qgroupdeliversmall, this)
  },
})