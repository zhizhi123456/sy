// pages/new/new.js
import Toast from 'vant-weapp/dist/toast/toast';
import {
  Personal,
  login
} from "../../../service/getData";
var util = require("../../../utils/util");
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    info: {
      UserName: '',
      Password: '',
      Email: "",
      MobilePIN: '',
      PasswordQuestion: '',
      PasswordAnswer: '',
      IslockedOut: '',
      Memo: '',
      EmpCode: '',
      EmpName: '',
      EmpCode: '',
      EmpName: '',
      API_Picurl: []
    },
    Password: '',
    IslockedOut: '',
    show_nature1: false,
    section2: [],
    show_photo: false,
    ConstructionTeamIDtext: '',
    check_photo: [{
      name: "拍照"
    }, {
      name: "从相册选择"
    }],
    section2: ['是', '否']
  },
  // 照片
  // 照片
  showPopup_photo() {
    this.setData({
      show_photo: true
    })
  },
  onClose_photo() {
    this.setData({
      show_photo: false
    })
  },
  onSelect_photo(e) {
    util.upImage(this);
  },
  delimg(e) {
    util.deleteImg(this, e)
  },
  tap_pic(e) {
    util.preview(this, e)
  },
  projectcodelur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },

  // 分包项目属性
  showPopup1() {
    this.setData({
      show_nature1: true
    })
  },
  onClose1() {
    this.setData({
      show_nature1: false
    })
  },
  onConfirm1(e) {
    // console.log(e)
    let info = util.editInfo(e, this, e.detail.value);

    this.setData({
      info,
      show_nature1: false,
    })
  },
  // 编辑的确定和返回
  editreturn() {
    util.returnPrev('Personal')
  },
  editconfirm() {
    let info = this.data.info;
    if (info.Password) {
      if (info.Password != this.data.password) {
        // 改变密码
        info.LastPasswordChangedDate = util.format(new Date())
        wx.setStorageSync("password", info.Password)
      } else {
        // 没有改变密码
        info.Password = this.data.password
      }
      info.IslockedOut = util.whether(info.IslockedOut)
      // console.log("12")
      // console.log(info.IslockedOut != this.data.IslockedOut)
      // console.log(info.IslockedOut)
      // console.log((info.IslockedOut != this.data.IslockedOut) && info.IslockedOut)
      // console.log("12111")
      if ((info.IslockedOut != this.data.IslockedOut) && info.IslockedOut) {
        info.LastLockoutDate = util.format(new Date())
      }

      info.LUD = util.format(new Date()),
      info.Timestamp = util.format(new Date())
      // util.checkChange(info, this, app.globalData.department);
      // util.intro(info, this)
      this.setData({
        info
      })
      console.log(this.data.info)
      Personal(this.data.info).then(res => {
        console.log(res)
        if (res.value) {
          wx.showToast({
            title: '编辑成功',
            icon: 'success',
            duration: 3000
          })
          login({
            username: this.data.info.UserName,
            password: this.data.info.Password
          }).then(res => {
            // console.log(res)
            if (res.code == 10000) {
              // app.globalData.userInfo = res.Item;
              wx.setStorageSync("myInfo", res.Item)
              util.returnPrev('Personal')
            }
          })

        }
      })
    } else {
      Toast({
        message: '请输入正确的密码',
        mask: true
      });
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    let username = wx.getStorageSync("username");
    this.setData({
      username: username
    })
    let password = wx.getStorageSync("password");
    this.setData({
      password: password
    })
    let userinfo = wx.getStorageSync("myInfo");
    var s = userinfo
    for (var key in s) {
      if (s[key] === null) {
        s[key] = ''
      }
    }
    userinfo.IslockedOut = util.whethercontent(userinfo.IslockedOut)
    that.setData({
      'info.ID': userinfo.ID,
      'info.UserName': userinfo.UserName,
      'info.Password': that.data.password,
      'info.Email': userinfo.Email,
      'info.MobilePIN': userinfo.MobilePIN,
      'info.PasswordQuestion': userinfo.PasswordQuestion,
      'info.PasswordAnswer': userinfo.PasswordAnswer,
      'info.IslockedOut': userinfo.IslockedOut,
      'IslockedOut': userinfo.IslockedOut,
      'info.Memo': userinfo.Memo,
      'info.EmpCode': userinfo.EmpCode,
      'info.EmpName': userinfo.EmpName,
      'info.LastLoginDate': userinfo.LastLoginDate,
      'info.LastPasswordChangedDate': userinfo.LastPasswordChangedDate,
      'info.LastLockoutDate': userinfo.LastLockoutDate,
      'info.FCD': userinfo.FCD,
      'info.LUD': userinfo.LUD,
      'info.ReportViewPermissions': userinfo.ReportViewPermissions,
      "info.Timestamp": util.format(new Date()),
      "info.Token": userinfo.Token,
      "info.TokenType": userinfo.TokenType,
    })
    var IslockedOut = util.whether(that.data.IslockedOut)
    that.setData({
      IslockedOut
    })
    wx.hideLoading();

  },

})