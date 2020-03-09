// pages/pact/pact.js
import {
  getPayment,
  groupPayment,
  getdep,
} from '../../../../service/getData';
var app = getApp();
var util = require("../../../../utils/util");
// let item, list;
let userinfo = wx.getStorageSync("myInfo");
Page({
  /**
   * 页面的初始数据
   */

  data: {
    seach: '',
    loading: false,
    top: '付款签报',
    currentDate: new Date().getTime(),
    maxDate: new Date().getTime(),
    InfoList: [],
    // item: [],
    // pages: 1,
    hadNew: 1,
    info: {}
  },
  // 返回
  return () {
    let menus = wx.getStorageSync('menus');
    if (this.data.applyT || this.data.ISconduct) {
      wx.redirectTo({
        url: "/pages/current/current/current?title=" + menus.title + '&id=' + menus.rid
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
    let menus = wx.getStorageSync('menus');
    wx.showLoading({
      title: '加载中',
    });
    if (this.data.ISconduct) {
      if (this.data.seach) {
        groupPayment({
          processstate: menus.caption,
          createman: userinfo.UserName,
          payapproveformname: this.data.seach
        }).then(res => {
          // console.log(res.List)
          if (res.code == 10000) {
            let item = res.List;
            util.listData(item, app.globalData.department, '', '', this, 'paymentapproval');
            this.setData({
              InfoList: item.reverse(),
              seach: ''
            })
            wx.hideLoading();
          }
        }).catch(err => {
          console.log(err)
        })
      } else {
        groupPayment({
          processstate: menus.caption,
          createman: userinfo.UserName
        }).then(res => {
          // console.log(res.List)
          if (res.code == 10000) {
            let item = res.List;
            util.listData(item, app.globalData.department, '', '', this, 'paymentapproval');
            this.setData({
              InfoList: item.reverse(),
              seach: ''
            })
            wx.hideLoading();
          }
        }).catch(err => {
          console.log(err)
        })
      }
    } else {
      groupPayment({
        department: this.data.userdep[0].ID,
        createman: userinfo.UserName,
        payapproveformname: this.data.seach,
      }).then(res => {
        // console.log(res.List)
        if (res.code == 10000) {
          let item = res.List;
          util.listData(item, app.globalData.department, '', '', this, 'paymentapproval');
          this.setData({
            InfoList: item.reverse(),
            seach: ''
          })
          wx.hideLoading();
        }
      }).catch(err => {
        console.log(err)
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    userinfo = wx.getStorageSync("myInfo");
    getdep({
      UserName: userinfo.UserName
    }).then(res => {
      this.setData({
        userdep: JSON.parse(res),
      })
    })
    if (options.id || options.rid) {
      wx.setStorageSync('menus', options)
    }
    wx.showLoading({
      title: '加载中',
    });
    let menus = wx.getStorageSync('menus');
    if (menus.userid) {
      this.setData({
        top: menus.caption + '的付款签报',
        hadNew: 0,
      })
      if (menus.caption == '我') {
        this.setData({
          me: 1,
        })
      }
      if (menus.caption == '我申请') {
        this.setData({
          applyT: 1
        })
      }
      if (menus.caption == '未处理') {
        let info = this.data.info;
        info.processstate = menus.caption;
        info.createman = userinfo.UserName;
        this.setData({
          info,
          val: 0,
          ISconduct: 1,
          pact: [{
              text: '未处理的付款签报',
              value: 0
            },
            {
              text: '已处理的付款签报',
              value: 1
            },
            {
              text: '已超时的付款签报',
              value: 2
            }
          ],
        })
        groupPayment(this.data.info).then(res => {
          if (res.code == 10000) {
            let item = res.List;
            util.listData(item, app.globalData.department, '', '', this, 'paymentapproval');
            this.setData({
              InfoList: item.reverse(),
              loading: false,
            })
            wx.hideLoading();
          }
        })
      } else {
        let info = this.data.info;
        info.createman = menus.userid;
        info.department = menus.dep;
        this.setData({
          info,
          departmenttext: menus.deptxt
        })
        groupPayment(this.data.info).then(res => {
          if (res.code == 10000) {
            console.log(res.List)
            let item = res.List;
            util.listData(item, app.globalData.department, '', '', this, 'paymentapproval');
            this.setData({
              InfoList: item.reverse(),
              loading: false,
            })
            wx.hideLoading();
          }
        })
      }
    } else {
      // 调用查询
      getPayment().then(res => {
        if (res.code == 10000) {
          let item = res.List;
          util.listData(item, app.globalData.department, '', '', this, 'paymentapproval');
          this.setData({
            InfoList: item.reverse(),
            // item
          })
          wx.hideLoading();
        }
      }).catch(err => {
        console.log(err)
      })
    }
    if (app.globalData.CountItem) {
      this.setData({
        sections: app.globalData.department,
        states: app.globalData.states
      })
    } else {
      app.DataCallback = employ => {
        if (employ != '') {
          this.setData({
            sections: app.globalData.department,
            states: app.globalData.states
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
    if (this.data.info.payapproveformname || this.data.info.createman || this.data.info.department || this.data.info.starttime || this.data.info.endtime || this.data.info.processstate) {
      let menus = wx.getStorageSync('menus');
      groupPayment(this.data.info).then(res => {
        if (res.code == 10000) {
          let item = res.List;
          util.listData(item, app.globalData.department, '', '', this, 'paymentapproval');
          this.setData({
            InfoList: item.reverse(),
            // item,
            info: {},
            loading: false,
            'info.createman': menus.userid,
            'info.department': menus.dep,
            departmenttext: ''
          })
          if (!this.data.hadNew) {
            let info = this.data.info;
            info.createman = menus.userid;
            if (this.data.ISconduct) {
              delete info.department
              info.processstate = '未处理';
              info.createman = userinfo.UserName;
              this.setData({
                departmenttext: ''
              })
            }
            this.setData({
              info,
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
  changeItem(e) {
    let StateStr = (this.data.pact[e.detail].text).slice(0, 3);
    let info = this.data.info;
    info.processstate = StateStr;
    this.setData({
      info
    })
    wx.showLoading({
      title: "加载中..."
    })
    groupPayment({
      processstate: StateStr,
      createman: userinfo.UserName
    }).then(res => {
      // console.log(res.List)
      if (res.code == 10000) {
        let item = res.List;
        util.listData(item, app.globalData.department, '', '', this, 'paymentapproval');
        this.setData({
          InfoList: item.reverse(),
        })
        wx.hideLoading();
      }
    }).catch(err => {
      console.log(err)
    })
  },
  // 付款签报名称
  payapproveformnameblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 创建人
  createmanblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 部门
  showPopup_0() {
    this.setData({
      show_0: true
    })
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
  },
  // 结束时间
  showPopup_endtime() {
    if (this.data.info.starttime) {
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
      info.createman = userinfo.UserName;
      if (!this.data.ISconduct) {
        this.setData({
          show_3: true,
          info
        })
      }
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
  findnew(e) {
    let index = e.currentTarget.dataset.index - 1;
    wx.pageScrollTo({
      selector: '#new' + index,
      duration: 500
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
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})