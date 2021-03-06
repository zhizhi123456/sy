// pages/count/pact/pact.js
import {
  getCount,
  groupCount,
  referCount,
  checkCount
} from '../../../service/getData.js';
var app = getApp();
var util = require("../../../utils/util");
let item, list;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    seach: '',
    loading: false,
    val: 0,
    top:'工程统计',
    InfoList: [],
    show_0: false,
    currentDate: new Date().getTime(),
    show: false,
    info: {},
    departmenttext: '',
    sections: [],
    show_time: false,
    show_endtime: false,
    item: [],
    pages: 1,
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
  lookCost(e) {
    // console.log(e)
    let code = e.currentTarget.dataset.code;
    wx.redirectTo({
      url: "/pages/count/money/money?code=" + code
    })
  },
  chargemore(e) {
    let code = e.currentTarget.dataset.code,
      i = e.currentTarget.dataset.i;
    if (this.data.InfoList[i].projectcost > 0) {
      checkCount({
        mainprojcectCode: code,
        chargetype: 'chargetype4'
      }).then(res => {
        // console.log(res)
        wx.showToast({
          title: '加载失败',
          icon: 'none',
          duration: 2000
        })
      })
    } else {
      wx.showToast({
        title: '暂无更多',
        icon: 'none',
        duration: 2000
      })
    }
  },
  chargemore1(e) {
    let code = e.currentTarget.dataset.code,
      i = e.currentTarget.dataset.i;
    if (this.data.InfoList[i].harmonizecost > 0) {
      checkCount({
        mainprojcectCode: code,
        chargetype: 'chargetype5'
      }).then(res => {
        // console.log(res)
        wx.showToast({
          title: '加载失败',
          icon: 'none',
          duration: 2000
        })
      })
    } else {
      wx.showToast({
        title: '暂无更多',
        icon: 'none',
        duration: 2000
      })
    }
  },
  chargemore2(e) {
    let code = e.currentTarget.dataset.code,
      i = e.currentTarget.dataset.i;
    if (this.data.InfoList[i].installcost > 0) {
      checkCount({
        mainprojcectCode: code,
        chargetype: 'chargetype6'
      }).then(res => {
        // console.log(res)
        wx.showToast({
          title: '加载失败',
          icon: 'none',
          duration: 2000
        })
      })
    } else {
      wx.showToast({
        title: '暂无更多',
        icon: 'none',
        duration: 2000
      })
    }
  },
  // 模糊查询
  seachInfo() {
    list = [];
    wx.showLoading({
      title: '加载中',
    });
    this.setData({
      pages: 1
    })
    groupCount({
      projectName: this.data.seach
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
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id) {
      wx.setStorageSync('menus', options)
    }
    list = [];
    if (app.globalData.CountItem) {
      this.setData({
        sections: app.globalData.department,
      })
    } else {
      app.DataCallback = employ => {
        if (employ != '') {
          this.setData({
            sections: app.globalData.department,
          })
        }
      }
    }
    wx.showLoading({
      title: '加载中',
    });
    // 调用查询
    getCount().then(res => {
      // console.log(res.List)
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
    if (this.data.info.projectName || this.data.info.planbegindate) {
      let info = this.data.info;
      util.checkContent(info, this);
      this.setData({
        info
      })
      groupCount(this.data.info).then(res => {
        if (res.code == 10000) {
          item = res.List;
          list = util.listData(item.reverse(), app.globalData.department, this.data.pages, list);
          this.setData({
            InfoList: list,
            item,
            info: {}
          })
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
  // 费用名称
  projectNameblur(e) {
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
  onPullDownRefresh: function () {},

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