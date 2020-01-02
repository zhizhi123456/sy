// pages/bill/pact/pact.js
import {
  MainProject,
  querydeliver,
  qgroupdeliver
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
    pact: [{
        text: '全部送货单',
        value: 0
      },
      {
        text: '我的送货单',
        value: 1
      }
    ],
    info: {
      Company: "",
      projectcode: "",
      goodsname: "",
      createtime: "",
      updatetime: "",
    },
    sections: [],
    show1: false,
    show_o: false,
    InfoList: [],
    pull: false,
    show: false,
    currentDate: new Date().getTime(),
    currentDate1: new Date().getTime(),
    show_time: false,
    show_endtime: false,
  },
  // 返回
  return (e) {
    util.returnMenu2(1006,'材料管理');
  },
  setSeach(e) {
    // console.log(e)
    this.setData({
      seach: e.detail.value
    })
  },
  dispose(item) {
    for (let k of item) {
      for (let i in k) {
        if (k[i] == null || k[i] == "null" || !k[i]) {
          k[i] = " "
        }
      }
    }
    item.forEach(value => {
      app.globalData.department.forEach(depart => {
        if (value.department == depart.value) {
          value.department = depart.text
        }
      })
    });
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
    querydeliver({
      Timestamp: app.globalData.time,
      delievrycode: this.data.seach
    }).then(res => {
      console.log(res)
      if (res.code == 10000) {
        let item = res.List;
        this.dispose(item)
      }
    })
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
  onConfirm_endtime(e) {
    // console.log(e)
    // console.log(util.datefomate(e.detail))
    let info = util.editInfo(e, this, util.datefomate(e.detail));
    this.setData({
      info,
      show_endtime: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.qingqiu()
    // 列表
    this.setData({
      seach: ""
    })
    wx.showLoading({
      title: '加载中',
    });
    this.seachItem()
    this.setData({
      firms: app.globalData.Customer,
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
  // 公司抬头
  showPopup() {
    this.setData({
      show1: true
    });
  },
  onClose1() {
    this.setData({
      show1: false
    });
  },
  onConfirm(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info,
      show1: false
    })
  },
    // 基础材料
    qingqiu() {
      MainProject().then(res => {
        // console.log(res)
        var q = JSON.parse(res)
        var s = q.map(t => {
          return t.projcectCode
        })
        this.setData({
          sections: s,
        })
        // console.log(this.data.section1)
      })
    },
  // 组合查询关闭与开启
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
    util.qgroupdeliver(qgroupdeliver, this)
  },
})