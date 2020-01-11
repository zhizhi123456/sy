// pages/bill/pact/pact.js
import {
  querybuilding,
  qgroupbuilding
} from '../../../service/getData';
var util = require("../../../utils/util");
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    firms: [],
    seach: '',
    loading: false,
    val: 0,
    info: {
      keyword: "",
      chargemanName: "",
      StartTime: "",
      EndTime: "",
      Type: '',
      state:''
    },
    sections: '',
    pull: false,
    show: false,
    show1:false,
    currentDate: new Date().getTime(),
    currentDate1: new Date().getTime(),
    show_time: false,
    show_endtime: false,
    section1:["所有","未处理","已处理","已超时"]
  },
  // 返回
  return (e) {
    util.returnMenu2(1010,"质量验收");
  },
  setSeach(e) {
    // console.log(e)
    this.setData({
      seach: e.detail.value
    })
  },
  dispose(item) {
    util.listData(item, app.globalData.department)
    util.outflowlist(item, this)
    this.setData({
      InfoList: item.reverse()
    })
    wx.hideLoading();
  },
  // 模糊查询
  seachItem() {
    wx.showLoading({
      title: '加载中',
    });
    querybuilding({
      Timestamp: app.globalData.time,
      delievrycode: this.data.seach
    }).then(res => {
      // console.log(res)
      if (res.code == 10000) {
        let item = res.List;

        this.dispose(item)
        // 请求筛选数据
        var a = app.globalData.Companytitle.map(s => {
          return s.text
        })
        this.setData({
          sections: a
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.qingqiu()
    // 列表
    this.setData({
      seach: ""
    })
    wx.showLoading({
      title: '加载中',
    });
    this.seachItem()
    // this.setData({
    //   firms: app.globalData.Companytitle,
    // })
  },
  meetplaceblur(e) {
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
  //项目或合同编号
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
  showPopup1() {
    this.setData({
      show1: true
    });
  },
  onClose1() {
    this.setData({
      show1: false
    });
  },
  onConfirm1(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info,
      show1: false,
      // departmenttext: e.detail.value.text
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
      show: true
    })
  },
  onClose() {
    this.setData({
      show: false
    });
  },
  // 组合查询
  seachqur() {
    util.qgroupdeliver(qgroupbuilding, this)
  },

})