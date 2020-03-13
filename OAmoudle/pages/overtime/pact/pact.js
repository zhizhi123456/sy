// pages/pact/pact.js
import {
  getOvertime,
  groupOvertime,
  getdep,
  getLeader,
  employee
} from '../../../../service/getData';
var app = getApp();
var util = require("../../../../utils/util");
let userinfo = wx.getStorageSync("myInfo");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    seach: '',
    loading: false,
    top: '加班',
    currentDate: new Date().getTime(),
    maxDate: new Date().getTime(),
    InfoList: [],
    hadNew: 1,
    info: {}
  },
  // 返回
  return () {
    let menus = wx.getStorageSync('menus');
    util.returnMenu2(menus.id, menus.title);
  },
  setSeach(e) {
    // console.log(e)
    this.setData({
      seach: e.detail.value
    })
  },
  // 模糊查询
  seachInfo() {
    wx.showLoading({
      title: '加载中',
    });
    getOvertime({
      applyman: this.data.seach
    }).then(res => {
      // console.log(res)
      if (res.code == 10000) {
        let item = res.List;
        util.listData(item, app.globalData.department, '', '', this, 'workovertime');
        this.setData({
          InfoList: item.reverse(),
          seach: ''
        })
        wx.hideLoading();
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    userinfo = wx.getStorageSync("myInfo");
    if (options.id) {
      wx.setStorageSync('menus', options)
    }
    getdep({
      UserName: userinfo.UserName
    }).then(res => {
      console.log(JSON.parse(res))
      this.setData({
        userdep: JSON.parse(res),
        'info.department': JSON.parse(res)[0].ID,
        departmenttext: JSON.parse(res)[0].techofficename
      })
    })
    getLeader({
      UserName: userinfo.UserName
    }).then(res => {
      this.setData({
        Leader: JSON.parse(res)
      })
      if (JSON.parse(res).length) {
        employee({
          ID: JSON.parse(res)[0].ID
        }).then(res => {
          console.log(res)
          let person = res.replace(/name/g, 'text');
          console.log(JSON.parse(person))
          this.setData({
            persons: JSON.parse(person)
          })
        })
      } else {
        this.setData({
          'info.applyman': userinfo.UserName,
        })
      }
    })
    wx.showLoading({
      title: '加载中',
    });
    // 调用查询
    getOvertime().then(res => {
      // console.log(res.List)
      if (res.code == 10000) {
        let item = res.List;
        util.listData(item, app.globalData.department, '', '', this, 'workovertime');
        this.setData({
          InfoList: item.reverse(),
        })
        wx.hideLoading();
      }
    }).catch(err => {
      console.log(err)
    })
    if (app.globalData.CountItem) {
      this.setData({
        sections: app.globalData.department,
        GetOverworktype: app.globalData.GetOverworktype,
        GetOvertimeperiod: app.globalData.GetOvertimeperiod,
      })
    } else {
      app.DataCallback = employ => {
        if (employ != '') {
          this.setData({
            sections: app.globalData.department,
            GetOverworktype: app.globalData.GetOverworktype,
            GetOvertimeperiod: app.globalData.GetOvertimeperiod,
          })
        }
      }
    }
  },
  // 组合查询
  showgroup() {
    this.setData({
      show: true
    })
  },
  onClose() {
    this.setData({
      show: false
    })
  },
  onConfirm_seach() {
    wx.showLoading({
      title: '加载中',
    });
    if (this.data.info.applyman || this.data.info.overworktype || this.data.info.department || this.data.info.overtimeperiod || this.data.info.begintime) {
      let info = this.data.info;
      if (info.overworktype) {
        this.data.GetOverworktype.forEach(res => {
          if (info.overworktype == res.text) {
            info.overworktype = res.value;
          }
        })
      }
      if (info.overtimeperiod) {
        this.data.GetOvertimeperiod.forEach(res => {
          if (info.overtimeperiod == res.text) {
            info.overtimeperiod = res.value;
          }
        })
      }
      this.setData({
        info
      })
      groupOvertime(this.data.info).then(res => {
        if (res.code == 10000) {
          let item = res.List;
          util.listData(item, app.globalData.department, '', '', this, 'workovertime');
          this.setData({
            InfoList: item.reverse(),
            info: {},
            'info.department': this.data.userdep[0].ID,
            departmenttext: this.data.userdep[0].techofficename,
            loading: false,
          })
          if (!this.data.Leader.length) {
            this.setData({
              'info.applyman': userinfo.UserName,
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
  // 申请人
  // applymanblur(e) {
  //   let info = util.editInfo(e, this, e.detail.value);
  //   this.setData({
  //     info
  //   })
  // },
  showPopup_9() {
    this.setData({
      show_9: true
    })
  },
  onClose_9() {
    this.setData({
      show_9: false
    })
  },
  onConfirm_9(e) {
    let info = util.editInfo(e, this, e.detail.value.text);
    this.setData({
      show_9: false,
      info
    })
  },
  // 加班类型
  showPopup_1() {
    this.setData({
      show_1: true
    })
  },
  onClose_1() {
    this.setData({
      show_1: false
    })
  },
  onConfirm_1(e) {
    let info = util.editInfo(e, this, e.detail.value.text);
    this.setData({
      show_1: false,
      info
    })
  },
  // 部门
  showPopup_0() {
    if (!this.data.departmenttext) {
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
  // 加班时期
  showPopup_2() {
    this.setData({
      show_2: true
    })
  },
  onClose_2() {
    this.setData({
      show_2: false
    })
  },
  onConfirm_2(e) {
    let info = util.editInfo(e, this, e.detail.value.text);
    this.setData({
      show_2: false,
      info
    })
  },
  // 开始时间
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
    this.setData({
      minDate: e.detail
    })
    let info = util.editInfo(e, this, util.datefomate(e.detail));
    this.setData({
      info,
      show_time: false
    })
    if (this.data.info.begintime && this.data.info.endtime) {
      var duration = (new Date(this.data.info.endtime).getTime()) - (new Date(this.data.info.begintime).getTime())
      if (duration < 0) {
        wx.showToast({
          title: '开始时间应小于结束时间',
          icon: 'none',
          duration: 3000
        })
        this.setData({
          "info.begintime":'',
          "info.endtime":'',
          currentDate: new Date().getTime(),
          maxDate: new Date().getTime(),
        })}}
  },
  // 结束时间
  showPopup_endtime() {
    if (this.data.info.begintime) {
      this.setData({
        show_endtime: true
      })
    } else {
      wx.showToast({
        title: '请先选择开始时间',
        icon: 'none',
        duration: 3000
      })
    }
  },
  onClose_endtime() {
    this.setData({
      show_endtime: false
    })
  },
  onConfirm_endtime(e) {
    let info = util.editInfo(e, this, util.datefomate(e.detail));
    this.setData({
      info,
      show_endtime: false
    })
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
    userinfo = wx.getStorageSync("myInfo");
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
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // if (item.length > 5 && list.length < item.length) {
    //   this.setData({
    //     loading: true
    //   })
    //   let pages = this.data.pages,
    //     n = Math.ceil(item.length / 5);
    //   if (n > pages) {
    //     setTimeout(() => {
    //       pages = pages + 1;
    //       list = util.listData(item, app.globalData.department, pages, list);
    //       this.setData({
    //         pages,
    //         InfoList: list,
    //       })
    //     }, 1000)
    //   }
    // } else {
    //   this.setData({
    //     loading: false
    //   })
    // }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})