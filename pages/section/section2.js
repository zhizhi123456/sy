// pages/section/section2.js
var util = require("../../utils/util");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menu: [{
        name: "分包项目",
        menuId: null,
        icon: 'icon-zhaotoubiao',
        path: '/pages/subcontract/pact/pact'
      },
      {
        name: "分包合同",
        menuId: null,
        icon: 'icon-fenbaohetong',
        path: '/pages/contract/pact/pact'
      },
      {
        name: "费用",
        menuId: null,
        icon: 'icon-feiyong1',
        path: '/pages/cost/pact/pact'
      },
      {
        name: "考勤",
        menuId: null,
        icon: 'icon-kaoqin2',
        path: ''
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
        path: '/pages/track/task'
      },
      {
        name: "任务书",
        menuId: null,
        icon: 'icon-renwu green3',
        path: '/pages/task/pact/pact'
      },
      {
        name: "设计任务",
        menuId: null,
        icon: 'icon-lunkuodasan- .green4',
        path: '/pages/design/pact/pact'
      }
    ],
    menu2:[ {
      name: "我的分包项目",
      menuId: null,
      icon: "icon-xiangmu1 blue",
      path: "",
    },
    {
      nametext: "我的分包合同",
      icon: "icon-hetong2 blue2",
      path: "",
  
    },
    {
      nametext: "我的费用",
      icon: "icon-feiyong2 blue4",
      path: "",
    
    },
    {
      nametext: "我的考勤",
      icon: "icon-kaoqin1 red2",
      path: "/pages/sign/pact/pact",
 
    },
    {
      nametext: "我的轨迹",
      icon: "icon-guiji1 blue5",
      path: "",

    },
    {
      nametext: "我的定位",
      icon: "icon-duomeitiicon- green2",
      path: "",

    },
    {
      name: "任务书",
      menuId: null,
      icon: 'icon-renwu green3',
      path: '/pages/task/pact/pact'
    },
    {
      name: "设计任务",
      menuId: null,
      icon: 'icon-lunkuodasan- .green4',
      path: '/pages/design/pact/pact'
    }]
  },
  return () {
    if (this.data.caption == "我") {
      util.returnMenu();
    } else {
      wx.redirectTo({
        url: '/pages/section/section'
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    if (options) {
      this.setData({
        caption: options.name,
        userid: options.userid,
        dep: options.dep,
        deptxt: options.deptxt
      })
    }
    var that  = this
    if((options.my)){
      wx.getStorage({
        key: 'myInfo',
        success (res) {
          that.setData({
            caption: '我',
            userid: res.data.UserName,
            dep: '',
            deptxt: ''
          })
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})