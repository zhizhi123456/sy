import {
  queryreport,
  qgroupreport,
  getSubItems,
  getContract,
  Companytitle
} from '../../../service/getData.js';
var app = getApp();
var util = require("../../../utils/util");
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
        text: '项目月度报表',
        value: 0
      },
      // {
      //   text: '我的台账',
      //   value: 1
      // }
    ],
    InfoList: [],
    info: {
      Companytitle: "",
      department: "",
      subprojectname: "",
      subcontactname: "",
      chargeman: "",
      begintime: "",
      endtime: ""
    },
    pull: false,
    show: false,
    show1: false,
    show2: false,
    show3: false,
    currentDate: new Date().getTime(),
    currentDate1: new Date().getTime(),
    show_time: false,
    show_endtime: false,
  },
  // 返回
  return() {
    util.returnMenu2(1008,"项目绩效");
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
    queryreport({
      chargeman: this.data.seach
    }).then(res => {
      console.log(res)
      if (res.code == 10000) {
        let item = res.List;
        util.listData(item, app.globalData.department);
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
    wx.showLoading({
      title: '加载中',
    });
    // 调用查询
    // 部门
    this.seachInfo()
    var s = app.globalData.department
    s = s.map(r => {
      return r.text
    })
    this.setData({
      sections: s
    })
    //公司
    Companytitle().then(res => {
      console.log(res)
      var w = JSON.parse(res)
      var q = w.map(s => {
        return s.Value
      })
      this.setData({
        section1: q
      })
    })
    // 分包项目
    getSubItems().then(res => {
      console.log(res)
      // var w = JSON.parse(res)
      var w = res.List
      var q = w.map(s => {
        return s.subprojectname
      })
      this.setData({
        section2: q
      })
    })
    // 分包合同
    getContract().then(res => {
      console.log(res)
      // var w = JSON.parse(res)
      var w = res.List
      var q = w.map(s => {
        return s.subcontactname
      })
      this.setData({
        section3: q
      })
    })
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
  onConfirm_endtime(e) {
    // console.log(e)
    // console.log(util.datefomate(e.detail))
    let info = util.editInfo(e, this, util.datefomate(e.detail));
    this.setData({
      info,
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
  //项目或合同编号
  showPopup1() {
    this.setData({
      show1: true
    });
  },
  onClose1() {
    this.setData({
      show1: false
    });
  },
  onConfirm1(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info,
      show1: false,
      // departmenttext: e.detail.value.text
    })
  },
  //项目或合同编号
  showPopup2() {
    this.setData({
      show2: true
    });
  },
  onClose2() {
    this.setData({
      show2: false
    });
  },
  onConfirm2(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info,
      show2: false,
      // departmenttext: e.detail.value.text
    })
  },
  //项目或合同编号
  showPopup3() {
    this.setData({
      show3: true
    });
  },
  onClose3() {
    this.setData({
      show3: false
    });
  },
  onConfirm3(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info,
      show3: false,
      // departmenttext: e.detail.value.text
    })
  },
  // 组合查询关闭与开启
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
    // console.log(this.data.info)
    if (this.data.info.Companytitle) {
      Companytitle().then(res => {
        var w = JSON.parse(res)
        w.forEach(s => {
          if (this.data.info.Companytitle == s.Value) {
            this.setData({
              "info.Companytitle": s.Key
            })
          }
        })
        util.qgroupdeliver(qgroupreport, this)
      })
    } else {
      util.qgroupdeliver(qgroupreport, this)
    }

  },
})