// pages/current/current/current.js
var util = require("../../../utils/util");
import {
  getTaskTNUm,
  getapply,
  getdep,
  getapplyNEWinfo
} from "../../../service/getData";
let userinfo = wx.getStorageSync("myInfo");
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    paths: {
      subproject: '/pages/subcontract',
      subcontact: '/pages/contract',
      prjassignbook: '/pages/task',
      charge: '/pages/cost',
      getmaterial: '/pages/bill',
      losematerial: '/pages/returnmaterial',
      subprjcodeapply: '/pages/pointsnumber',
      paymentapproval: '/OAmoudle/pages/payment',
      leaveapplyform: '/OAmoudle/pages/vacate',


      workovertime: '/OAmoudle/pages/overtime',
      applybuyform: '/OAmoudle/pages/apply',

      usesealform: '/OAmoudle/pages/chapter',
      applyform: '/OAmoudle/pages/applyFor',
      invoice: '/OAmoudle/pages/invoice',
      
      debitnote: '/OAmoudle/pages/iou',
      OfficeCharge: '/OAmoudle/pages/officeCost',
      maincontact: '/pages/generalcontract',
    }
  },
  return () {
    util.returnMenu(1002);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.source) {
      wx.setStorageSync('carte', options)
    }
    console.log(options)
    wx.showLoading({
      title: '加载中',
    });
    var userinfo = wx.getStorageSync("myInfo");
    // console.log(options)
    if (options.title) {
      this.setData({
        options: options
      })
    }
    if (userinfo) {
      getdep({
        UserName: userinfo.UserName
      }).then(res => {
        console.log(res);
        let resData = JSON.parse(res);
        this.setData({
          userinfo,
        })
        if (options.id && resData.length) {
          this.setData({
            userid: userinfo.UserName,
            dep: resData[0].ID,
            deptxt: resData[0].techofficename,
          })
        }
      })
      let NAnum = 0;
      if (options.id == 2124) {
        this.setData({
          caption: '未处理',
        })
        getTaskTNUm({
          UserName: userinfo.UserName
        }).then(res => {
          console.log(res)
          if (res.code == 10000) {
            let item = res.List;
            this.setData({
              taskData: item,
              Nhint: true,
            })
            item.forEach(element => {
              NAnum += element.Number;
            });
            this.setData({
              NAnum
            })
            wx.hideLoading();
          }
        })
      }
      if (options.id == 2123) {
        this.setData({
          caption: '我申请',
        })
        getapply({
          UserName: userinfo.UserName
        }).then(res => {
          console.log(res)
          let ele = res.List || [];
          this.setData({
            taskData: ele
          })
          ele.forEach(element => {
            NAnum += element.Number;
          });
          this.setData({
            NAnum
          })
          wx.hideLoading();
        })
        getapplyNEWinfo({
          UserName: userinfo.UserName
        }).then(res => {
          if (res.code == 10000) {
            this.setData({
              NEWnum: res.List
            })
          }
        })
      }
    } else {
      wx.showToast({
        title: '请登录',
        icon: 'none',
        duration: 3000
      })
    }
  },
  onShow: function () {
    userinfo = wx.getStorageSync("myInfo");
  },
})