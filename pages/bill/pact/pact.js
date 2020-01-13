// pages/bill/pact/pact.js
import {
  getBill,
  groupBill
} from '../../../service/getData';
var app = getApp();
var util = require("../../../utils/util");
let item, list;
let userinfo = wx.getStorageSync("myInfo");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    seach: '',
    loading: false,
    val: 0,
    top: '领料单',
    InfoList: [],
    show_0: false,
    currentDate: new Date().getTime(),
    show: false,
    info: {},
    totals: [],
    show_time: false,
    show_endtime: false,
    pages: 1,
    item: [],
    applyT: 0,
    hadNew: 1,
    ISconduct: 0
  },
  // 返回
  return () {
    if (this.data.applyT || this.data.ISconduct) {
      wx.redirectTo({
        url: "/pages/current/current/current?title=" + this.data.options.title + '&id=' + (this.data.options.id || this.data.options.rid)
      });
    } else {
      util.returnMenu2(this.data.options.id || this.data.options.rid, this.data.options.title);
    }
  },
  setSeach(e) {
    // console.log(e)
    this.setData({
      seach: e.detail.value
    })
  },
  // 模糊查询
  seachItem() {
    list = [];
    wx.showLoading({
      title: '加载中',
    });
    this.setData({
      pages: 1
    })
    if (this.data.hadNew) {
      getBill({
        getmaterialName: this.data.seach
      }).then(res => {
        // console.log(res)
        if (res.code == 10000) {
          item = res.List;
          list = util.listData(item.reverse(), app.globalData.department, this.data.pages, list);
          this.setData({
            InfoList: list,
            item,
            seach: ''
          })
          wx.hideLoading();
        }
      })
    } else {
      if (this.data.ISconduct) {
        if (this.data.seach) {
          groupBill({
            Goodsname: this.data.seach,
            state: this.data.info.state,
            UserName: userinfo.UserName
          }).then(res => {
            if (res.code == 10000) {
              item = res.List;
              list = util.listData(item.reverse(), app.globalData.department, this.data.pages, list);
              this.setData({
                InfoList: list,
                item,
                seach: ''
              })
              wx.hideLoading();
            }
          }).catch(err => {
            console.log(err)
          })
        } else {
          groupBill({
            state: this.data.info.state,
            UserName: userinfo.UserName
          }).then(res => {
            if (res.code == 10000) {
              item = res.List;
              list = util.listData(item.reverse(), app.globalData.department, this.data.pages, list);
              this.setData({
                InfoList: list,
                item,
                seach: ''
              })
              wx.hideLoading();
            }
          }).catch(err => {
            console.log(err)
          })
        }
      } else {
        groupBill({
          Goodsname: this.data.seach,
          applyman: this.data.info.applyman
        }).then(res => {
          // console.log(res.List)
          if (res.code == 10000) {
            item = res.List;
            list = util.listData(item.reverse(), app.globalData.department, this.data.pages, list);
            this.setData({
              InfoList: list,
              item,
              seach: ''
            })
            wx.hideLoading();
          }
        }).catch(err => {
          console.log(err)
        })
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    userinfo = wx.getStorageSync("myInfo");
    if (options.id || options.rid) {
      this.setData({
        options: options
      })
    }
    if (app.globalData.CountItem) {
      this.setData({
        totals: app.globalData.MainProject,
        states: app.globalData.states
      })
    } else {
      app.DataCallback = employ => {
        if (employ != '') {
          this.setData({
            totals: app.globalData.MainProject,
            states: app.globalData.states
          })
        }
      }
    }
    list = [];
    // 列表
    wx.showLoading({
      title: '加载中',
    });
    if (options.userid) {
      let info = this.data.info;
      info.applyman = options.userid;
      this.setData({
        top: options.caption + '的领料单',
        hadNew: 0,
        info,
        userid: options.userid,
        deptxt: options.deptxt,
        caption: options.caption,
        dep: options.dep
      })
      if (options.caption == '我申请') {
        this.setData({
          applyT: 1
        })
      }
      if (options.caption == '未处理') {
        info.state = options.caption;
        info.UserName = userinfo.UserName;
        delete info.applyman;
        this.setData({
          info,
          ISconduct: 1,
        })
        groupBill({
          state: this.data.info.state,
          UserName: userinfo.UserName
        }).then(res => {
          // console.log(res.List)
          if (res.code == 10000) {
            item = res.List;
            list = util.listData(item.reverse(), app.globalData.department, this.data.pages, list);
            this.setData({
              InfoList: list,
              item,
              seach: ''
            })
            wx.hideLoading();
          }
        }).catch(err => {
          console.log(err)
        })
      } else {
        groupBill({
          applyman: options.userid
        }).then(res => {
          // console.log(res.List)
          if (res.code == 10000) {
            item = res.List;
            list = util.listData(item.reverse(), app.globalData.department, this.data.pages, list);
            this.setData({
              InfoList: list,
              item,
              seach: ''
            })
            wx.hideLoading();
          }
        }).catch(err => {
          console.log(err)
        })
      }
    } else {
      getBill().then(res => {
        // console.log(res)
        if (res.code == 10000) {
          item = res.List;
          list = util.listData(item.reverse(), app.globalData.department, this.data.pages, list);
          this.setData({
            InfoList: list,
            item
          })
          wx.hideLoading();
        }
      }).catch(err => {
        console.log(err)
      })
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
    list = [];
    wx.showLoading({
      title: '加载中',
    });
    this.setData({
      pages: 1
    })
    if (this.data.info.Projectcode || this.data.info.getmaterialName || this.data.info.Begintime || this.data.info.state || this.data.info.applyman) {
      groupBill(this.data.info).then(res => {
        if (res.code == 10000) {
          item = res.List;
          list = util.listData(item.reverse(), app.globalData.department, this.data.pages, list);
          this.setData({
            InfoList: list,
            item,
            info: {}
          })
          if (!this.data.hadNew) {
            let info = this.data.info;
            info.applyman = this.data.userid;
            if (this.data.ISconduct) {
              delete info.applyman;
              info.state = '未处理';
              info.UserName = userinfo.UserName;
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
  // 所属项目
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
    let info = util.editInfo(e, this, e.detail.value.text);
    this.setData({
      show_0: false,
      info,
    })
  },
  // 领料名称
  getmaterialNameblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 申请人
  applymanblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
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
    let info = util.editInfo(e, this, util.datefomate(e.detail));
    this.setData({
      info,
      show_time: false
    })
  },
  // 结束时间
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
    let info = util.editInfo(e, this, util.datefomate(e.detail));
    this.setData({
      info,
      show_endtime: false
    })
  },
  // 状态
  showPopup_3() {
    let userinfo = wx.getStorageSync("myInfo");
    if (userinfo) {
      let info = this.data.info;
      info.UserName = userinfo.UserName;
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
 
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (item.length > 5 && list.length < item.length) {
      this.setData({
        loading: true
      })
      let pages = this.data.pages,
        n = Math.ceil(item.length / 5);
      if (n > pages) {
        setTimeout(() => {
          pages = pages + 1;
          list = util.listData(item, app.globalData.department, pages, list);
          this.setData({
            pages,
            InfoList: list,
          })
        }, 1000)
      }
    } else {
      this.setData({
        loading: false
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})