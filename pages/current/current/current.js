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
      subproject: 'subcontract',
      subcontact: 'contract',
      prjassignbook: 'task',
      charge: 'cost',
      getmaterial: 'bill',
      losematerial: 'returnmaterial',
      subprjcodeapply: 'pointsnumber',
      paymentapproval: 'payment',
      leaveapplyform: 'vacate',
    }
  },
  return () {
    util.returnMenu(1002);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    wx.showLoading({
      title: '加载中',
    });
    userinfo = wx.getStorageSync("myInfo");
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
        let resData = JSON.parse(res);
        this.setData({
          userinfo,
        })
        if (options.id&&resData.length) {
          this.setData({
            userid: userinfo.UserName,
            dep: resData[0].ID,
            deptxt: resData[0].techofficename,
          })
        }
      })
      let NAnum = 0;
      if (options.id == 1058) {
        this.setData({
          caption: '未处理',
        })
        getTaskTNUm({
          UserName: userinfo.UserName
        }).then(res => {
          // console.log(res)
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
      if (options.id == 1056) {
        this.setData({
          caption: '我申请',
        })
        getapply({
          UserName: userinfo.UserName
        }).then(res => {
          // console.log(res)
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
          // console.log(res)
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