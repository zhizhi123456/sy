// pages/workrecord/pact/pact.js
import {
  Role, //角色
  queryfollow,
  qgroupfollow
} from '../../../service/getData.js';
var util = require("../../../utils/util");
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    seach: '',
    loading: false,
    val: 0,
    pact: [{
        text: '全部随工记录',
        value: 0
      },
      {
        text: '我的随工记录',
        value: 1
      }
    ],
    info: {
      keyword: "",
      chargemanName: "",
      StartTime: "",
      EndTime: "",
      Type: '',
      state: ''
    },
    sections: '',
    pull: false,
    show: false,
    show1: false,
    currentDate: new Date().getTime(),
    currentDate1: new Date().getTime(),
    show_time: false,
    show_endtime: false,
    section1: ["所有", "未处理", "已处理", "已超时"]
  },
  // 返回
  return () {
    util.returnMenu2(1007, "施工现场");
  },
  setSeach(e) {
    // console.log(e)
    // 改变seach值
    this.setData({
      seach: e.detail.value
    })
  },
  // 模糊查询
  seachInfo() {
    wx.showLoading({
      title: '加载中',
    });
    queryfollow({
      Timestamp: app.globalData.time,
      Checkman: this.data.seach
    }).then(res => {
      console.log(res)
      if (res.code == 10000) {
        let item = res.List;
        // 对数据库 数据的处理

        util.listData(item, app.globalData.department);
        // 对职位职称的处理 传过来是key 要获取 value
        util.outflowlist(item, this)
        this.setData({
          InfoList: item.reverse()
        })
        wx.hideLoading();
        var a = app.globalData.Role.map(s => {
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
    this.setData({
      seach: ""
    })
    if (options.source) {
      wx.setStorageSync('carte', options)
    }
    // 调用模糊查询
    this.seachInfo()
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

    util.qgroupdeliver(qgroupfollow, this)
  },

})