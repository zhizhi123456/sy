// pages/generalcontract/pact/pact.js
import {
  querydesign,
  qgroupdesign
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
    val: 0,
    pact: [{
        text: '全部设计任务',
        value: 0
      },
      {
        text: '我的设计任务',
        value: 1
      }
    ],
    top: '设计任务',
    InfoList: [],
    info: {
      designtaskname: "",
      designman: "",
      begindate: "",
      enddate: "",
      processstate: ''

    },
    sections: '',
    pull: false,
    show: false,
    currentDate: new Date().getTime(),
    currentDate1: new Date().getTime(),
    show_time: false,
    show_endtime: false,
    hadNew: 1
  },
  // 返回
  return () {
    if (this.data.hadNew) {
      util.returnMenu();
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
    if (this.data.hadNew) {
      wx.showLoading({
        title: '加载中',
      });
      querydesign({
        designtaskname: this.data.seach
      }).then(res => {
        // console.log(res)
        if (res.code == 10000) {
          let item = res.List;
          util.listData(item, app.globalData.department);
          util.outflowlist(item, this)
          this.setData({
            InfoList: item.reverse()
          })
          wx.hideLoading();
        }
      })
    } else {
      let info = this.data.info
      info.designtaskname= this.data.seach
      this.setData({
        info
      })
      util.qgroupdeliver(qgroupdesign, this, this.data.hadNew)
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    wx.showLoading({
      title: '加载中',
    });
    var a = app.globalData.Principal.map(s => {
      return s.text
    })
    this.setData({
      sections: a
    })
    if (options.userid) {
      let info = this.data.info;
      info.departmentID = options.dep;
      info.designman = options.userid;
      this.setData({
        top: options.caption + '的设计任务',
        hadNew: 0,
        info,
        departmenttext: options.deptxt,
        userid: options.userid,
        deptxt: options.deptxt,
      })
      // console.log(info)
      util.qgroupdeliver(qgroupdesign, this, this.data.hadNew)
    } else {
      this.setData({
        seach: ''
      })
      this.seachInfo()
    }

  },
  meetplaceblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
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

    util.qgroupdeliver(qgroupdesign, this,this.data.hadNew)
  },
})