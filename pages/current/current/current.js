// pages/current/current/current.js
var util = require("../../../utils/util");
import {
  getTaskTNUm,
  getapply,
  getdep
} from "../../../service/getData";
let userinfo = wx.getStorageSync("myInfo");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    paths: ['subcontract', 'contract', 'task', 'cost', 'bill', 'returnmaterial', 'pointsnumber']
  },
  return () {
    util.returnMenu(1002);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if (options.title) {
      this.setData({
        options: options
      })
    }
    if (userinfo) {
      getdep({
        UserName: userinfo.UserName
      }).then(res => {
        // console.log(res);
        let resData = JSON.parse(res);
        this.setData({
          userinfo,
        })
        if (options.id == 1056) {
          this.setData({
            userid: userinfo.UserName,
            caption: '我申请',
            dep: resData[0].ID,
            deptxt: resData[0].techofficename,
          })
        }
      })
      let NAnum = 0;
      if (options.id == 1058) {
        getTaskTNUm({
          UserName: userinfo.UserName
        }).then(res => {
          // console.log(res)
          if (res.code == 10000) {
            let item = res.List;
            this.setData({
              taskData: item,
              Nhint: true
            })
            item.forEach(element => {
              NAnum += element.Number;
            });
            this.setData({
              NAnum
            })
          }
        })
      }
      if (options.id == 1056) {
        getapply({
          UserName: userinfo.UserName
        }).then(res => {
          console.log(res)
          let ele = res.List;
          this.setData({
            taskData: ele
          })
          ele.forEach(element => {
            NAnum += element.Number;
          });
          this.setData({
            NAnum
          })
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
})