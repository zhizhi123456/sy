// pages/login/login.js
import {
  login,
  register,
  only,
  getdep
} from "../../service/getData";
var app = getApp();
var util = require("../../utils/util");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    ifenter: true,
    username: "",
    password: "",
    confirmpwd: '',
    MobilePIN: "",
    Email: "",
    showpwd: true,
    hidepwd: true,
    showpwd1: true,
    hidepwd1: true
  },
  return () {
    util.returnMenu();
  },
  setUser(e) {
    if (!this.data.ifenter) {
      if (e.detail.value) {
        only({
          username: e.detail.value
        }).then(res => {
          // console.log(res)
          if (res.code == 10000) {
            if (res.value) {
              this.setData({
                username: e.detail.value
              })
            } else {
              wx.showToast({
                title: '用户名已存在',
                icon: "none",
                duration: 2000
              })
            }
          }
        })
      } else {
        wx.showToast({
          title: '请输入用户名',
          icon: "none",
          duration: 2000
        })
      }
    } else {
      if (e.detail.value) {
        this.setData({
          username: e.detail.value
        })
      } else {
        wx.showToast({
          title: '请输入用户名',
          icon: "none",
          duration: 2000
        })
      }
    }
  },
  setpwd(e) {
    if (e.detail.value) {
      this.setData({
        password: e.detail.value
      })
    } else {
      wx.showToast({
        title: '请输入密码',
        icon: "none",
        duration: 2000
      })
    }
  },
  setconfirmpwd(e) {
    this.setData({
      confirmpwd: e.detail.value
    })
    if (this.data.password != this.data.confirmpwd) {
      wx.showToast({
        title: '两次输入密码不一致',
        icon: "none",
        duration: 2000
      })
    }
  },
  setphone(e) {
    if (e.detail.value) {
      let phone = e.detail.value,
        reg = /1[3-8][0-9]{9}/;
      if (reg.test(phone)) {
        this.setData({
          MobilePIN: phone
        })
      } else {
        wx.showToast({
          title: '手机号码格式不正确',
          icon: "none",
          duration: 2000
        })
      }
    } else {
      wx.showToast({
        title: '请输入手机号',
        icon: "none",
        duration: 2000
      })
    }
  },
  setemail(e) {
    if (e.detail.value) {
      let email = e.detail.value,
        reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (reg.test(email)) {
        this.setData({
          Email: email
        })
      } else {
        wx.showToast({
          title: '无效的邮箱',
          icon: "none",
          duration: 2000
        })
      }
    } else {
      wx.showToast({
        title: '请输入邮箱',
        icon: "none",
        duration: 2000
      })
    }
  },
  // 登录
  enter() {
    // console.log(this.data.username, this.data.password)
    if (!this.data.username || !this.data.password) {
      wx.showToast({
        title: '请输入用户名/密码',
        icon: "none",
        duration: 2000
      })
    } else {
      login({
        username: this.data.username,
        password: this.data.password
      }).then(res => {
        // console.log(res)
        if (res.code == 10000) {
          // app.globalData.userInfo = res.Item;
          wx.setStorageSync("myInfo", res.Item)
          wx.setStorageSync("username", this.data.username)
          wx.setStorageSync("password", this.data.password)
          // 跳转到首页
          var user = wx.getStorageSync("myInfo");
          if (user) {
            getdep({
              UserName: user.UserName
            }).then(res => {
              // console.log(res)
              if (res) {
                var s = JSON.parse(res)
                var info = {
                  Companytitle:s[0].company,
                  Companytitletext:s[0].value,
                  department: s[0].ID,
                  departmenttext: s[0].techofficename,
                  userId:s[0].userId
                }
                wx.setStorageSync("message",info)

              }
            })
          }
          util.returnMenu();

        } else {
          wx.showToast({
            title: '用户名或密码错误',
            icon: "none",
            duration: 2000
          })
        }
      })
    }
  },
  // 注册
  enroll() {
    if (!this.data.ifenter) {
      if (this.data.username && this.data.password && this.data.MobilePIN && this.data.Email) {
        register({
          UserName: this.data.username,
          Password: this.data.password,
          Email: this.data.Email,
          MobilePIN: this.data.MobilePIN,
          FCD: app.globalData.time,
        }).then(res => {
          console.log(res)
          if (res.code == 10000) {
            // 转到登录页面
            wx.showToast({
              title: '注册成功请登录',
              icon: "success",
              duration: 2000
            })
            let that = this;
            setTimeout(function () {
              that.setData({
                ifenter: true
              })
            }, 1000)
          }
        })
      } else {
        wx.showToast({
          title: '请正确填写注册信息',
          icon: "none",
          duration: 2000
        })
      }
    } else {
      this.setData({
        ifenter: false,
        username: "",
        password: "",
        confirmpwd: '',
        MobilePIN: "",
        Email: "",
        hidepwd: true
      })
    }
  },
  // 返回登录页面
  returnlogin() {
    this.setData({
      ifenter: true,
      username: '',
      password: '',
      hidepwd: true
    })
  },
  //密码的显示隐藏
  showpwd() {
    this.setData({
      showpwd: false,
      hidepwd: true
    })
  },
  hidepwd() {
    this.setData({
      hidepwd: false,
      showpwd: true
    })
  },
  //密码的显示隐藏
  showpwd1() {
    this.setData({
      showpwd1: false,
      hidepwd1: true
    })
  },
  hidepwd1() {
    this.setData({
      hidepwd1: false,
      showpwd1: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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