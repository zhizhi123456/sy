// pages/generalcontract/pact/pact.js
import {
  projectall,
  qgroupproject
} from '../../../service/getData.js';
var util = require("../../../utils/util");
var app = getApp();
let userinfo = wx.getStorageSync("myInfo");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    sections: [],
    show_o: false,
    seach: '',
    loading: false,
    val: 0,
    pact: [{
        text: '全部项目',
        value: 0
      },
      {
        text: '我的项目',
        value: 1
      },
      {
        text: '我关注的',
        value: 2
      },
    ],
    InfoList: [],
    info: {
      projectname: "",
      department: "",
      planbegindate: "",
      planenddate: "",
    },
    pull: false,
    show: false,
    currentDate: new Date().getTime(),
    currentDate1: new Date().getTime(),
    show_time: false,
    show_endtime: false,
  },
  // 返回
  return () {
    util.returnMenu(1001);
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

    var info = this.data.info
    info.projectname = this.data.seach
    var user = wx.getStorageSync("myInfo");
    info.UserName = user.UserName
    info.state = '所有'
    this.setData({
      info
    })
    util.qgroupdeliver(qgroupproject, this, '', '1')
    // wx.showLoading({
    //   title: '加载中',
    // });
    // projectall({
    //   Timestamp: app.globalData.time,
    //   projectname: this.data.seach,
    // }).then(res => {
    //   console.log(res)
    //   if (res.code == 10000) {
    //     let item = res.List;
    //     util.listData(item, app.globalData.department);
    //     this.setData({
    //       InfoList: item.reverse()
    //     })
    //     wx.hideLoading();
    //   }
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    });
    if (options.source) {
      wx.setStorageSync('carte', options)
    }
    //调用查询
    this.setData({
      seach: ""
    })
    this.seachInfo()
    // 对基础数据的处理
    var s = app.globalData.getdept
    s = s.map(r => {
      return r.text
    })
    this.setData({
      sections: s
    })
  },
  meetplaceblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
    // 数字筛选
    checknum(e) {
      let info = this.data.info;
      util.formatNum(e);
      info.projectpercent = e.detail;
      this.setData({
        info
      })
    } , 
  // 计划开工时间
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
  // 计划完工时间
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
  //项目或合同编号
  showPopup_o() {
    this.setData({
      show_o: true
    });
  },
  onClose_o() {
    this.setData({
      show_o: false
    });
  },
  onConfirm_o(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info,
      show_o: false,
      // departmenttext: e.detail.value.text
    })
  },
  onConfirm_endtime(e) {
    // console.log(e)
    // console.log(util.datefomate(e.detail))
    let info = util.editInfo(e, this, util.datefomate(e.detail));
    this.setData({
      info,
      show_endtime: false
    })
  },
  change() {
    this.setData({
      pull: true,
      show: true
    })
  },
  onClose() {
    this.setData({
      show: false
    });
  },
  // 组合查询
  seachqur() {
    var info = this.data.info
    info.state = '所有'
    info.UserName = userinfo.UserName
    this.setData({
      info
    })
    util.qgroupdeliver(qgroupproject, this)
  },
})