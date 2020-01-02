// pages/generalcontract/pact/pact.js
import {
  getContract,
  groupContract
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
    top: '分包合同',
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
    hadNew: 1
  },
  // 返回
  return () {
    if (this.data.hadNew) {
      util.returnMenu();
    } else {
      util.backprev();
    }
  },
  setSeach(e) {
    // console.log(e)
    this.setData({
      seach: e.detail.value
    })
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
    if (this.data.hadNew) {
      getContract({
        subcontactname: this.data.seach
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
      groupContract({
        subcontactname: this.data.seach,
        createman: this.data.info.createman
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
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    list = [];
    wx.showLoading({
      title: '加载中',
    });
    if (options.userid) {
      let info = this.data.info;
      info.departmentID = options.dep;
      info.createman = options.userid;
      this.setData({
        top: options.caption + '的分包合同',
        hadNew: 0,
        info,
        departmenttext: options.deptxt,
        userid: options.userid,
        deptxt: options.deptxt,
      })
      // 综合查询
      groupContract({
        createman: options.userid
      }).then(res => {
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
    } else {
      // 调用查询
      getContract().then(res => {
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
    }
    if (app.globalData.CountItem) {
      this.setData({
        sections: app.globalData.department,
        firms: app.globalData.Companytitle,
        states: app.globalData.states
      })
    } else {
      app.DataCallback = employ => {
        if (employ != '') {
          this.setData({
            sections: app.globalData.department,
            firms: app.globalData.Companytitle,
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
    list = [];
    wx.showLoading({
      title: '加载中',
    });
    this.setData({
      pages: 1
    })
    if (this.data.info.department || this.data.info.subcontactname || this.data.info.createman || this.data.info.begintime) {
      groupContract(this.data.info).then(res => {
        if (res.code == 10000) {
          item = res.List;
          list = util.listData(item.reverse(), app.globalData.department, this.data.pages, list);
          this.setData({
            InfoList: list,
            item,
            info: {},
            departmenttext: ""
          })
          if (!this.data.hadNew) {
            let info = this.data.info;
            info.departmentID = this.data.dep;
            info.createman = this.data.userid;
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
  // 合同名称
  subcontactnameblur(e) {
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
    // console.log(e)
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