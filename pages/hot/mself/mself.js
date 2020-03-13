// pages/hot/mself/mself.js
var util = require("../../../utils/util");
let userinfo = wx.getStorageSync("myInfo");
var app = getApp();
var util = require("../../../utils/util");
import {
  hotjob
} from "../../../service/getData";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeNames: '1',
    paths: {
      subproject: 'subcontract',
      subcontact: 'contract',
      prjassignbook: 'task',
      charge: 'cost',
      getmaterial: 'bill',
      losematerial: 'returnmaterial',
      subprjcodeapply: 'pointsnumber'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    userinfo = wx.getStorageSync("myInfo");
    if (options.source) {
      wx.setStorageSync('carte', options)
    }
    hotjob({
      UserName: userinfo.UserName
    }).then(res => {
      // console.log(res)
      if (res.code == 10000) {
        this.setData({
          modulekinds: res.urgentTaskList.List
        })
      }
    })
  },
  return () {
    util.returnMenu(1002);
  },
  onChange(e) {
    // console.log(e.detail)
    this.setData({
      activeNames: e.detail,
    })
    // console.log(this.data.activeNames)
  },
  onShow: function () {
    userinfo = wx.getStorageSync("myInfo");
  },
})