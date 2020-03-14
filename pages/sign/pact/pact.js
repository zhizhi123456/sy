// pages/generalcontract/pact/pact.js
import {
  querysign,
  groupSign,
} from '../../../service/getData.js';
var app = getApp();
var util = require("../../../utils/util");
let item;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    seach: '',
    loading: false,
    top: '我的考勤打卡',
    info: {
      Company: "",
      starttime: "",
      endtime: "",
      Token: "",
      TokenType: "",
      UserID: "",
    },
    InfoList: [],
    pull: false,
    show: false,
    currentDate: new Date().getTime(),
    show_time: false,
    show_endtime: false,
    Token: "",
    TokenType: "",
    UserID: "",
    starttime: "",
    endtime: "",
    hadNew: 1,
    me: 0,
    constructionteam: 0,
    show22:false
  },
  // 返回
  return () {
    if (this.data.constructionteam) {
      wx.redirectTo({
        url: "/pages/corps/section2?name=" + this.data.caption + '&dep=' + this.data.dep + '&deptxt=' + this.data.deptxt + '&userid=' + this.data.userid
      });
    }
    if (this.data.hadNew || this.data.me) {
      let menus = wx.getStorageSync('menus');
      util.returnMenu2(menus.id, menus.title);
    } else {
      wx.redirectTo({
        url: "/pages/section/section2?name=" + this.data.caption + '&dep=' + this.data.dep + '&deptxt=' + this.data.deptxt + '&userid=' + this.data.userid
      })
    }



  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.source) {
      wx.setStorageSync('carte', options)
    }
    console.log(options)
    if(options.title!="后台管理"){
      this.setData({
         show22:true
      })
    }
    if (options.constructionteam) {
      this.setData({
        constructionteam: options.constructionteam
      })
    }
    console.log(app.globalData.getdept)
    this.setData({
      sections:app.globalData.getdept,
      section7:app.globalData.getstaff

    })
    // 获取到  userid  token  tokrntype  开始时间 结束时间  设置给data
    // 获取到  userid  token  tokrntype   设置给info
    // this.setData({
    //   Token: "ww",
    //   TokenType: "ww",
    //   UserID: "c30735fb-7b21-4b6e-919c-0039d9c8945f",
    //   starttime: "2017-12-12",
    //   endtime: "2060-12-12",
    //   "info.Token": "ww",
    //   "info.TokenType": "ww",
    //   "info.UserID": "c30735fb-7b21-4b6e-919c-0039d9c8945f",
    // })
    if (options.id) {
      wx.setStorageSync('menus', options)
    }
    if (options.id || options.rid) {
      this.setData({
        options: options
      })
    }
    wx.showLoading({
      title: '加载中',
    });

    if (options.userid) {
      let info = this.data.info;
      info.department = options.dep;
      info.name = options.userid;
      this.setData({
        top: options.caption + '的考勤打卡',
        hadNew: 0,
        info,
        departmenttext: options.deptxt,
        userid: options.userid,
        deptxt: options.deptxt,
        caption: options.caption,
        dep: options.dep
      })
      if (options.caption == '我') {
        this.setData({
          me: 1,
        })
      }
      groupSign({
        name: options.userid
      }).then(res => {
        if (res.code == 10000) {
          item = res.Lists;
          this.setData({
            InfoList: item.reverse(),
            item,
            info: {},
            departmenttext: ""
          })
          if (!this.data.hadNew) {
            let info = this.data.info;
            info.department = this.data.dep;
            info.name = this.data.userid;
            this.setData({
              info,
              departmenttext: this.data.deptxt
            })
          }
          wx.hideLoading();
        }
      })
    } else {
      var that = this
     var userinfo = wx.getStorageSync("myInfo");


      that.setData({
        top: '我的考勤打卡',
        Token: userinfo.Token,
        TokenType: userinfo.TokenType,
        UserID: userinfo.ID,
        starttime: "2017-12-12",
        endtime: "2060-12-12",
        "info.Token": userinfo.Token,
        "info.TokenType": userinfo.TokenType,
        "info.UserID": userinfo.ID,
      })



      querysign({
        Token: this.data.Token,
        TokenType: this.data.TokenType,
        UserID: this.data.UserID,
        starttime: this.data.starttime,
        endtime: this.data.endtime
      }).then(res => {
        // console.log(res)
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
    }
  },
  meetplaceblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 部门
  showPopup_0() {
    if (this.data.hadNew) {
      this.setData({
        show_0: true
      })
    }
  },
  onClose_0() {
    this.setData({
      show_0: false
    })
  },
  onConfirm_0(e) {
    let info = util.editInfo(e, this, e.detail.value.value);
    this.setData({
      show_0: false,
      info,
      departmenttext: e.detail.value.text
    })
  },
  // 创建人
  nameblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 创建人
  showPopup6() {
    this.setData({
      show6: true
    });
  },
  onClose6() {
    this.setData({
      show6: false
    });
  },
  onConfirm6(e) {
    let info = util.editInfo(e, this, e.detail.value.value);
    this.setData({
      info,
      show6: false,
      // departmenttext: e.detail.value.text
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
    console.log(info)
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
    console.log(util.datefomate(e.detail))
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
    wx.showLoading({
      title: '加载中',
    });
    if (this.data.info.department || this.data.info.name || this.data.info.startdate || this.data.info.enddate) {
      let info = this.data.info;
      util.checkContent(info, this);
      this.setData({
        info
      })
      console.log(this.data.info)
      groupSign(this.data.info).then(res => {
        if (res.code == 10000) {
          item = res.Lists;
          console.log(item)
          this.setData({
            InfoList: item.reverse(),
            item,
            info: {},
            departmenttext: ""
          })
          if (!this.data.hadNew) {
            let info = this.data.info;
            info.department = this.data.dep;
            info.name = this.data.userid;
            this.setData({
              info,
              departmenttext: this.data.deptxt
            })
          }
          wx.hideLoading();
        }
      })
      this.setData({
        show: false
      })
    } else(
      wx.showToast({
        title: '请至少输入一项内容',
        icon: 'none',
        duration: 3000
      })
    )
  },

})