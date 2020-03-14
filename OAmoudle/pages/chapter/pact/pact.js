// pages/pact/pact.js
import {
  getChapter,
  groupChapter,
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
    top: '用章',
    currentDate: new Date().getTime(),
    maxDate: new Date().getTime(),
    InfoList: [],
    item: [],
    pages: 1,
    hadNew: 1,
    info: {}
  },
  // 返回
  return () {
    let menus = wx.getStorageSync('menus');
    if (menus.title == '我的申请' || menus.title == '我的任务') {
      wx.redirectTo({
        url: "/pages/current/current/current?title=" + menus.title + '&id=' + (menus.id || menus.rid)
      });
    } else {
      util.returnMenu2(menus.id, menus.title);
    }
  },
  setSeach(e) {
    this.setData({
      seach: e.detail.value
    })
  },
  // 模糊查询
  seachInfo() {
    wx.showLoading({
      title: '加载中',
    });
    groupChapter(this.data.info).then(res => {
      if (res.code == 10000) {
        let item = res.List;
        util.listData(item, app.globalData.department, '', '', this, 'usesealform');
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
    if (options.id || options.rid) {
      wx.setStorageSync('menus', options)
    }
    this.setData({
      'info.state': '所有',
      'info.UserName': userinfo.UserName
    })
    getdep({
      UserName: userinfo.UserName
    }).then(res => {
      console.log(JSON.parse(res))
      this.setData({
        userdep: JSON.parse(res),
        'info.departmentID': JSON.parse(res)[0].ID,
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
          'info.chargemanName': userinfo.UserName,
        })
      }
    })
    let menus = wx.getStorageSync('menus');
    if (menus.caption == '未处理') {
      let info = this.data.info;
      info.state = menus.caption;
      info.UserName = userinfo.UserName;
      this.setData({
        info,
        val: 0,
        ISconduct: 1,
        pact: [{
            text: '未处理的用章',
            value: 0
          },
          {
            text: '已处理的用章',
            value: 1
          },
          {
            text: '已超时的用章',
            value: 2
          }
        ],
      })
    }
    if (menus.caption == '我申请') {
      this.setData({
        'info.state': '',
        applyT: 1,
        'info.UserName': userinfo.UserName,
        top: '我申请的用章'
      })
    }
    // 调用查询
    this.seachInfo();
    if (app.globalData.CountItem) {
      this.setData({
        sections: app.globalData.department,
        Usesealtype: app.globalData.Usesealtype,
        states: app.globalData.states
      })
    } else {
      app.DataCallback = employ => {
        if (employ != '') {
          this.setData({
            sections: app.globalData.department,
            Usesealtype: app.globalData.Usesealtype,
            states: app.globalData.states
          })
        }
      }
    }
  },
  changeItem(e) {
    let StateStr = (this.data.pact[e.detail].text).slice(0, 3);
    let info = this.data.info;
    info.state = StateStr;
    this.setData({
      info
    })
    wx.showLoading({
      title: "加载中..."
    })
    this.seachInfo();
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
    if (this.data.info.Type || this.data.info.departmentID || this.data.info.keyword || this.data.info.chargemanName || this.data.info.StartTime || this.data.info.state) {
      let info = this.data.info;
      if (info.Type) {
        this.data.Usesealtype.forEach(res => {
          if (info.Type == res.text) {
            info.Type = res.value;
          }
        })
        this.setData({
          info
        })
      }
      groupChapter(this.data.info).then(res => {
        if (res.code == 10000) {
          let item = res.List;
          util.listData(item, app.globalData.department, '', '', this, 'usesealform');
          this.setData({
            InfoList: item.reverse(),
            info: {},
            'info.state': '所有',
            'info.UserName': userinfo.UserName,
            'info.departmentID': this.data.userdep[0].ID,
            departmenttext: this.data.userdep[0].techofficename,
            loading: false,
          })
          if (!ISconduct) {
            this.setData({
              'info.state': '所有',
            })
          }
          if (!this.data.Leader.length) {
            this.setData({
              'info.chargemanName': userinfo.UserName,
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
  // 用章类型
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
  // 用途
  keywordblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 分包项目创建人
  // chargemanNameblur(e) {
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
    if (this.data.info.StartTime && this.data.info.EndTime) {
      var duration = (new Date(this.data.info.EndTime).getTime()) - (new Date(this.data.info.StartTime).getTime())
      if (duration < 0) {
        wx.showToast({
          title: '开始时间应小于结束时间',
          icon: 'none',
          duration: 3000
        })
        this.setData({
          "info.StartTime": '',
          "info.EndTime": '',
          currentDate: new Date().getTime(),
          maxDate: new Date().getTime(),
        })
      }
    }
  },
  // 结束时间
  showPopup_endtime() {
    if (this.data.info.StartTime) {
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
  // 状态
  showPopup_3() {
    if (userinfo) {
      let info = this.data.info;
      info.UserName = userinfo.UserName;
      this.setData({
        show_3: true,
        info
      })
    } else {
      wx.showToast({
        title: '请登录',
        icon: 'none',
        duration: 2000
      })
    }
  },
  onClose_3() {
    this.setData({
      show_3: false
    })
  },
  onConfirm_3(e) {
    let info = util.editInfo(e, this, e.detail.value.text);
    this.setData({
      show_3: false,
      info
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