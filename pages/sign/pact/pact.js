// pages/generalcontract/pact/pact.js
import {
  querysign,
} from '../../../service/getData.js';
var app = getApp();
var util = require("../../../utils/util");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    seach: '',
    loading: false,
    val: 0,
    pact: [{
        text: '我的考勤打卡',
        value: 0
      },
      // {
      //   text: '我的考勤打卡',
      //   value: 1
      // }
    ],
    info: {
      Company: "",
      starttime: "请选择",
      endtime: "请选择",
      Token: "",
      TokenType: "",
      UserID: "",
    },
    InfoList: [],
    pull: false,
    show: false,
    currentDate: new Date().getTime(),
    currentDate1: new Date().getTime(),
    show_time: false,
    show_endtime: false,
    Token: "",
    TokenType: "",
    UserID: "",
    starttime: "",
    endtime: ""
  },
  // 返回
  return () {
    util.returnMenu2(1004,"人员管理");
  },
  setSeach(e) {
    // console.log(e)
    this.setData({
      seach: e.detail.value
    })
  }, 
  // 模糊查询
  seachInfo() {
    wx.showLoading({
      title: '加载中',
    });
    querysign({
      Token: this.data.Token,
      TokenType: this.data.TokenType,
      UserID: this.data.UserID,
      starttime: this.data.starttime,
      endtime: this.data.endtime
    }).then(res => {
      console.log(res)
      if (res.code == 10000) {
        let item = res.Lists;
        util.listData(item, app.globalData.department);

        item.forEach(value => {
          value.checkindate = value.checkindate.substring(0, 10)
          // value.Checkintime = value.Checkintime.substring(10)
          value.condition == "忘打卡" ? value.Checkintime = '' : value.condition
        });
        this.setData({
          InfoList: item.reverse()
        })
        wx.hideLoading();
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取到  userid  token  tokrntype  开始时间 结束时间  设置给data
    // 获取到  userid  token  tokrntype   设置给info
    this.setData({
      Token: "ww",
      TokenType: "ww",
      UserID: "c30735fb-7b21-4b6e-919c-0039d9c8945f",
      starttime: "2017-12-12",
      endtime: "2060-12-12",
      "info.Token": "ww",
      "info.TokenType": "ww",
      "info.UserID": "c30735fb-7b21-4b6e-919c-0039d9c8945f",
    })
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
  onConfirm_endtime(e) {
    // console.log(e)
    // console.log(util.datefomate(e.detail))
    let info = util.editInfo(e, this, util.datefomate(e.detail));
    this.setData({
      info,
      show_endtime: false
    })
  },
  // 组合查询关闭与开启
  change() {
    this.setData({
      pull: false,
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

    util.qgroupdeliver(querysign, this)
  },

})