// pages/pact/pact.js
import {
  querysecurity,
  groupPurchase
} from '../../../service/getData.js';
var app = getApp();
var util = require("../../../utils/util");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    seach: '',
    loading: false,
    show: false,
    show_time: false,
    val: 0,
    currentDate: new Date().getTime(),
    pact: [{
        text: '全部安防质量验收',
        value: 0
      },
      {
        text: '我的安防质量验收',
        value: 1
      }
    ],
    InfoList: [],
    Times: [],
    Supplier: [],
    info: {}
  },
  // 返回
  return () {
    util.returnMenu();
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
    querysecurity({
      projectName: this.data.seach
    }).then(res => {
      // console.log(res)
      if (res.code == 10000) {
        let item = res.List;
        util.listData(item, app.globalData.department);
        util.outflowlist(item,this)
        this.setData({
          InfoList: item.reverse()
        })
        wx.hideLoading();
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      Supplier: app.globalData.Supplier
    })
    wx.showLoading({
      title: '加载中',
    });
    // 调用查询
    querysecurity().then(res => {
      // console.log(res.List)
      if (res.code == 10000) {
        let item = res.List;
        util.listData(item, app.globalData.department);
        util.outflowlist(item,this)
        let Times = this.data.Times;
        item.forEach(res => {
          // console.log(res.makecontactdate)
          if (Times.indexOf(res.makecontactdate) == -1) {
            Times.push(res.makecontactdate)
          }
        })
        this.setData({
          InfoList: item.reverse(),
          Times
        })
        // console.log(this.data.Times)
        wx.hideLoading();
      }
    }).catch(err => {
      console.log(err)
    })
  },
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
    if (this.data.info.makecontactdate || this.data.info.supplier || this.data.info.purchasecontactCode) {
      groupPurchase(this.data.info).then(res => {
        if (res.code == 10000) {
          let item = res.List;
          util.listData(item, app.globalData.department);
          this.setData({
            InfoList: item.reverse(),
          })
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
  // 组合查询
  // 签订日期
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
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      show_time: false,
      info
    })
  },
  // 供应商
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
      info
    })
  },
  // 采购编号
  purchasecontactCodeblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
})