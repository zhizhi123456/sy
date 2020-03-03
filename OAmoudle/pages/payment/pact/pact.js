// pages/pact/pact.js
import {
  getPayment,
  groupPayment,
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
    // list = [];
    wx.showLoading({
      title: '加载中',
    });
    // this.setData({
    //   pages: 1
    // })
    getPayment({
      applyman: this.data.seach
    }).then(res => {
      // console.log(res)
      if (res.code == 10000) {
        // item = res.List;
        // list = util.listData(item.reverse(), app.globalData.department, this.data.pages, list,this,'paymentapproval');
        let item = res.List;
        util.listData(item, app.globalData.department, '', '', this, 'paymentapproval');
        this.setData({
          InfoList: item.reverse(),
          // item,
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
    // list = [];
    wx.showLoading({
      title: '加载中',
    });
    // 调用查询
    getPayment().then(res => {
      // console.log(res.List)
      if (res.code == 10000) {
        // item = res.List;
        // list = util.listData(item.reverse(), app.globalData.department, this.data.pages, list,this,'paymentapproval');
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
    let info = this.data.info;
    info.createman = userinfo.UserName;
    this.setData({
      info
    })
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
    // list = [];
    wx.showLoading({
      title: '加载中',
    });
    // this.setData({
    //   pages: 1
    // })
    if (this.data.info.payapproveformname || this.data.info.createman || this.data.info.department || this.data.info.starttime || this.data.info.endtime || this.data.info.processstate) {
      groupPayment(this.data.info).then(res => {
        if (res.code == 10000) {
          // item = res.List;
          // list = util.listData(item.reverse(), app.globalData.department, this.data.pages, list, this, 'paymentapproval');
          let item = res.List;
          util.listData(item, app.globalData.department, '', '', this, 'paymentapproval');
          this.setData({
            InfoList: item.reverse(),
            // item,
            info: {},
            'info.createman':userinfo.UserName,
            loading: false,
            departmenttext: ''
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
      show_time: false,
      minDate: e.detail
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