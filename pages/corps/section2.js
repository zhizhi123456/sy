// pages/section/section2.js
var util = require("../../utils/util");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "",
    menu: [
      // {
      //   name: "分包项目",
      //   menuId: null,
      //   icon: 'icon-zhaotoubiao',
      //   path: '/pages/subcontract/pact/pact'
      // },
      // {
      //   name: "分包合同",
      //   menuId: null,
      //   icon: 'icon-fenbaohetong',
      //   path: '/pages/contract/pact/pact'
      // },
      {
        name: "费用",
        menuId: null,
        icon: 'icon-feiyong1',
        path: '/pages/cost/pact/pact'
      },
      {
        name: "考勤",
        menuId: null,
        icon: 'icon-kaoqin1',
        path: '/pages/sign/pact/pact'
      },
      {
        name: "定位",
        menuId: null,
        icon: 'icon-renyuandingwei',
        path: '/pages/location/location'
      },
      {
        name: "轨迹",
        menuId: null,
        icon: 'icon-guiji1',
        path: '/pages/track/track'
      },
      // {
      //   name: "任务书",
      //   menuId: null,
      //   icon: 'icon-renwu green3',
      //   path: '/pages/task/pact/pact'
      // },
      // {
      //   name: "设计任务",
      //   menuId: null,
      //   icon: 'icon-lunkuodasan- .green4',
      //   path: '/pages/design/pact/pact'
      // }
    ],
  },
  return () {
    wx.redirectTo({
      url: "/pages/corps/members/members?name=" + this.data.title
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    console.log(options)
    if (options) {
      this.setData({
        caption: options.name,
        userid: options.userid,
        dep: options.dep,
        deptxt: options.deptxt,
        title: options.title
      })
    }
  },

})