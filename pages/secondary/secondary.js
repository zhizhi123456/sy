// pages/secondary/secondary.js
import {
  queryMenu,
  getdep
} from "./../../service/getData";
var app = getApp();
var util = require("../../utils/util");
let userinfo = wx.getStorageSync("myInfo");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rid: "",
    title: "",
    chuancan: 1003,
    small: [],
    smalls: []
  },
  screen() {
    wx.showLoading({
      title: '加载中',
    })
    var zong = []
    var fen = []
    queryMenu({
      pid: this.data.chuancan,
    }).then(res => {
      // 请求所有模块    不带uid
      // console.log(res)
      zong = res.List
      zong.forEach(s => {
        s.control = true
        var path = s.pageaddres
        if (path) {
          var a = path.substring(0, 1)
          if (a != '/') {
            s.pageaddres = '/' + path
          }
          s.pageaddres = path.replace(/[\r\n]/g, "");
        }
        var nametext = s.name
        if (nametext) {
          s.name = nametext.replace(/[\r\n]/g, "");
        }
        if (s.name == '我的设计任务') {
          s.pageaddres = path + '?hadMy=1'
        }
        if (s.name == "项目例会") {
          s.name = '公司例会'
        }
        if (s.name == "项目例会") {
          s.name = '公司例会'
        }
        if (s.name == "招投标") {
          s.name = '投标'
        }
        if (s.name == '重大事故报告') {
          s.pageaddres = '/OAmoudle/pages/accident/pact/pact'
        }
        if (s.name == '安防质量验收') {
          s.pageaddres = '/OAmoudle/pages/security/pact/pact'
        }
        if (s.name == '工程质量报告') {
          s.pageaddres = '/OAmoudle/pages/quality/pact/pact'
        }
        
        // if (s.name == "办公物品") {
        //   s.pageaddres = '/OAmoudle/pages/supply/pact/pact'
        // }
        // if (s.name == "销假") {
        //   s.pageaddres = '/OAmoudle/pages/resumption/pact/pact'
        // }
        // if (s.name == "市场设计绩效") {
        //   s.pageaddres = '/OAmoudle/pages/designp/pact/pact'
        // }
      })
      // 请求当前用户模块
      queryMenu({
        pid: this.data.chuancan,
        UId: this.data.id
      }).then(ress => {
        fen = ress.List
        // 有用户的菜单
        if (ress.List == 0) {
          for (i in zong) {
            if (zong[i].menuId === null) {
              zong[i].control = true
            } else {
              zong[i].control = false
            }

          }
        } else {
          for (var i in zong) {
            if (fen.some(g => {
                // 如果有用户的菜单  和无用户的菜单 重合  赋予权限control 为true
                var c = (g.ID == zong[i].ID) || (zong[i].menuId === null)
                return c
              })) {
              zong[i].control = true
            } else {
              zong[i].control = false
            }
          }
        }
        this.setData({
          smalls: zong
        })
        wx.hideLoading()

      })
    })
  },
  back() {
    if (this.data.uponelevel) {
      util.returnMenu(this.data.uponelevel);
    } else if (this.data.chuancan == 1055) {
      // 我的信息
      util.returnMenu(1002);
    } else if (this.data.chuancan == 2055 || this.data.chuancan == 2056 || this.data.chuancan == 2057 || this.data.chuancan == 2058) {
      // 0
      util.returnMenu(2054);
    } else {
      // 工程管理
      util.returnMenu(1000);
    }

  },
  checkperson() {
    if (!this.data.userinfo) {
      wx.showToast({
        title: '请登录',
        icon: 'none',
        duration: 2000
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      uponelevel: options.num
    })
    userinfo = wx.getStorageSync("myInfo");
    if (userinfo) {
      getdep({
        UserName: userinfo.UserName
      }).then(res => {
        // console.log(res);
        let resData = JSON.parse(res);
        this.setData({
          userinfo,
        })
        if (options.id == 1055) {
          this.setData({
            userid: userinfo.UserName,
            caption: '我',
            dep: resData[0].ID,
            deptxt: resData[0].techofficename,
          })
        }
      }).catch(err => {
        if (options.id == 1055) {
          this.setData({
            userid: userinfo.UserName,
            caption: '我',
            dep: "",
            deptxt: "",
          })
        }
      })
    }
    // console.log(res.data.ID)
    this.setData({
      id: userinfo.ID
    })
    // console.log(options.title)
    // 页面初始加载 检测传入id 传入传参
    if (!options.id) {
      this.setData({
        chuancan: 1003
      })
    } else {
      this.setData({
        chuancan: options.id,
        title: options.title
      })
    }

    this.screen()
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    userinfo = wx.getStorageSync("myInfo");
  },
})