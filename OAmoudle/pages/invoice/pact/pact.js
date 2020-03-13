// pages/pact/pact.js
import {
  getInvoice,
  groupInvoice,
} from '../../../../service/getData';
var app = getApp();
var util = require("../../../../utils/util");
let item, list;
let userinfo = wx.getStorageSync("myInfo");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    seach: '',
    loading: false,
    top: '发票',
    currentDate: new Date().getTime(),
    InfoList: [],
    item: [],
    pages: 1,
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

    var info = this.data.info
    info.keyword = this.data.seach
    var user = wx.getStorageSync("myInfo");
    info.UserName = user.UserName
    info.state = '所有'
    this.setData({
      info
    })

    util.qgroupdeliver(groupInvoice, this, '', '1')
    // this.setData({
    //   pages: 1
    // })
    // getInvoice({
    //   invoicename: this.data.seach
    // }).then(res => {
    //   // console.log(res)
    //   if (res.code == 10000) {
    //     item = res.List;
    //     list = util.listData(item.reverse(), app.globalData.department, this.data.pages, list,this,'invoice');
    //     this.setData({
    //       InfoList: list,
    //       item,
    //       seach: ''
    //     })
    //     wx.hideLoading();
    //   }
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    userinfo = wx.getStorageSync("myInfo");
    if (options.source) {
      wx.setStorageSync('carte', options)
    }
    if (options.id || options.rid) {
      wx.setStorageSync('menus', options)
    }
    wx.showLoading({
      title: '加载中',
    });
    // 调用查询
    this.setData({
      seach: ""
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
            text: '未处理的发票',
            value: 0
          },
          {
            text: '已处理的发票',
            value: 1
          },
          {
            text: '已超时的发票',
            value: 2
          }
        ],
      })
      util.qgroupdeliver(groupInvoice, this, '', '1')
    } else {
      this.seachInfo()
    }
    if (app.globalData.CountItem) {
      this.setData({
        sections: app.globalData.getdept,
        Invoicetype: app.globalData.Invoicetype,
        MaincontactAll: app.globalData.MaincontactAll,
        MainProject: app.globalData.MainProject,
        states: app.globalData.states,
        section1: app.globalData.getstaff
      })
    } else {
      app.DataCallback = employ => {
        if (employ != '') {
          this.setData({
            sections: app.globalData.department,
            Invoicetype: app.globalData.Invoicetype,
            MaincontactAll: app.globalData.MaincontactAll,
            MainProject: app.globalData.MainProject,
            states: app.globalData.states,
            section1: app.globalData.getstaff
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
    util.qgroupdeliver(groupInvoice, this, '', '1')
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
    var info = this.data.info
    info.state = '所有'
    info.UserName = userinfo.UserName
    this.setData({
      info
    })
    util.qgroupdeliver(groupInvoice, this)
  },
  // 发票名称
  invoicenameblur(e) {
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
  // 合同
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
  // 项目
  showPopup_4() {
    this.setData({
      show_4: true
    })
  },
  onClose_4() {
    this.setData({
      show_4: false
    })
  },
  onConfirm_4(e) {
    let info = util.editInfo(e, this, e.detail.value.text);
    this.setData({
      show_4: false,
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
  // 开票类别
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
  showPopup_5() {
    this.setData({
      show_5: true
    })
  },
  onClose_5() {
    this.setData({
      show_5: false
    })
  },
  onConfirm_5(e) {
    let info = util.editInfo(e, this, e.detail.value.value);
    this.setData({
      show_5: false,
      info
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
})