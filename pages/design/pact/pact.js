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
    hadNew: 1,
    hadMy: 0,
    UserName: ''
  },
  // 返回
  return () {
    console.log(this.data.hadNew)
    console.log(this.data.hadMy)
    if (this.data.hadNew) {
      if (this.data.hadMy) {
        util.returnMenu2(1055, '我的信息');
      } else {
        util.returnMenu2(1009,'技术管理');
      }
    } else {
      // console.log("12")
      wx.redirectTo({
        url:'/pages/section/section2?name='+this.data.caption+'&userid='+this.data.userid+'&dep='+this.data.dep+'&deptxt='+'&deptxt='+this.data.deptxt
      })
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
      info.designman = this.data.userid;
      this.setData({
        info
      })
      util.qgroupdeliver(qgroupdesign, this, this.data.hadNew,this.data.hadMy)
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
    var that = this
    if (options.hadMy) {
      // console.log("10")
      wx.getStorage({
        key: 'myInfo',
        success(res) {
          let info = that.data.info;
          info.designman = res.data.UserName;
          that.setData({
            top: '我的设计任务',
            info,
            hadMy: 1,
            userid:res.data.UserName
          })
          util.qgroupdeliver(qgroupdesign, that, that.data.hadNew, that.data.hadMy)
        }
      })
   
    }
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
        dep:options.dep,
        deptxt: options.deptxt,
        caption:options.caption
      })
      // console.log(info)
      util.qgroupdeliver(qgroupdesign, this, this.data.hadNew)
    } 
    if (options.hadNew != '0' && options.hadMy !='1') {
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
    util.qgroupdeliver(qgroupdesign, this,this.data.hadNew,this.data.hadMy)
  },
})