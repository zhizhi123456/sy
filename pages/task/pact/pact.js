// pages/generalcontract/pact/pact.js
import {
  getTask,
  groupTask
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
    top: '任务书',
    InfoList: [],
    item: [],
    pages: 1,
    info: {},
    show: false,
    show_2: false,
    show_3: false,
    show_time: false,
    show_endtime: false,
    hadNew: 1,
    hadMy: 0,
    UserName: ''
  },
  // 返回
  return () {
    if (this.data.hadNew) {
      if (this.data.hadMy) {
        util.returnMenu2(1055, '我的信息');
      } else {
        util.returnMenu(1001);
      }
    } else {

      wx.navigateBack();

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
    if (this.data.hadNew != '0' && this.data.hadMy!='1') {
      list = [];
      wx.showLoading({
        title: '加载中',
      });
      this.setData({
        pages: 1
      })
      getTask({
        projectname: this.data.seach
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
      // console.log("0")
      let info = this.data.info;
      info.departmentID = this.data.deptxt;
      info.chargemanName = this.data.userid;
      info.keyword = this.data.seach
      this.setData({
        info
      })
      util.qgroupdeliver(groupTask, this, this.data.hadNew,this.data.hadMy)
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this
    if (options.hadMy) {
      console.log("10")
      wx.getStorage({
        key: 'myInfo',
        success(res) {
          console.log(res.data)
          // info.departmentID = options.dep;
          let info = that.data.info;
          info.chargemanName = res.data.UserName;
          that.setData({
            top: '我的任务书',
            info,
            hadMy: 1,
            userid:res.data.UserName
          })
          util.qgroupdeliver(groupTask, that, that.data.hadNew, that.data.hadMy)
        }
      })
   
    }
    list = [];
    wx.showLoading({
      title: '加载中',
    });
    if (options.userid) {
      console.log("1")
      let info = this.data.info;
      info.departmentID = options.dep;
      info.chargemanName = options.userid;
      this.setData({
        top: options.caption + '的任务书',
        hadNew: 0,
        info,
        departmenttext: options.deptxt,
        userid: options.userid,
        deptxt: options.deptxt,
      })
      var that = this
      util.qgroupdeliver(groupTask, this, this.data.hadNew)
    }
    if (options.hadNew != '0' && options.hadMy !='1') {
      console.log("we")
      this.setData({
        seach: ''
      })
      this.seachInfo()
    }

    if (app.globalData.CountItem) {
      this.setData({
        props: app.globalData.Projectprop,
        states: app.globalData.states
      })
    } else {
      app.DataCallback = employ => {
        if (employ != '') {
          this.setData({
            props: app.globalData.Projectprop,
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
    console.log(this.data.hadNew)
    console.log(this.data.hadMy)
    console.log(this.data.hadNew == '0' || this.data.hadMy=='1')
    if (this.data.hadNew == '0' || this.data.hadMy=='1') {
      let info = this.data.info;
      info.departmentID = this.data.deptxt;
      info.chargemanName = this.data.userid;
      this.setData({
        info
      })
    }
    if (this.data.info.keyword || this.data.info.Type || this.data.info.chargemanName || this.data.info.StartTime || this.data.info.state) {
      groupTask(this.data.info).then(res => {
        if (res.code == 10000) {
          item = res.List;
          list = util.listData(item.reverse(), app.globalData.department, this.data.pages, list);
          this.setData({
            InfoList: list,
            item,
            info: {},
          })
          wx.hideLoading();
          if (this.data.hadNew == '0' || this.data.hadMy=='1') {
            let info = this.data.info;
            info.departmentID = this.data.deptxt;
            info.chargemanName = this.data.userid;
            this.setData({
              info
            })
          }
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
  // 任务书编号
  keywordblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 总包项目属性
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
  // 联系人
  chargemanNameblur(e) {
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
      info[UserName] = userinfo.UserName;
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