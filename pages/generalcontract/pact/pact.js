// pages/generalcontract/pact/pact.js
import {
  getQuery,
  groupId
} from '../../../service/getData.js';
var app = getApp();
var util = require("../../../utils/util");
let userinfo = wx.getStorageSync("myInfo");
let userName_zy = userinfo.UserName;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    sign:"",
    seach: '',
    count:0,
    loading: false,
    val: 0,
    top: '签报',
    InfoList: [],
    show_0: false,
    currentDate: new Date().getTime(),
    show: false,
    show_0: false,
    show_2: false,
    show_3: false,
    info: {},
    departmenttext: '',
    sections: [],
    show_time: false,
    show_endtime: false,
    item: [],
    pages: 1,
    colors:["red","blue","yellow","green"]
  },
  // 返回
  return () {
    let menus = wx.getStorageSync('menus');
    if (menus.title == '我的申请' || menus.title == '我的任务') {
      wx.redirectTo({
        url: "/pages/current/current/current?title=" + menus.title + '&id=' + (menus.id || menus.rid)
        
      });
    } else {
     
      util.returnMenu(1001);
    }
  },
  setSeach: function (event) {
    let that = this;
    var inputSearch = event.detail.value;
    that.setData({
    seach: inputSearch,
    count:1
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
    let  menus1  =  wx.getStorageSync('menus');
    if (menus1.title == "我的任务")     {
    info.UserName = user.UserName
    userName_zy = user.UserName;
      info.state  =  '未处理'
    }
    else if (menus1.title == "我的申请")   {
    info.chargemanName = user.UserName
    info.state = '未申请'
        }else{

    info.UserName = user.UserName
    info.state = '所有'
    }
    
    this.setData({
      info
    })
    util.qgroupdeliver(groupId, this, '', '1')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    console.log(options.source);
    console.log(this.data.info);
    if(options.rid==1){
      this.setData({
        i:0
      })
    }
    if(options.rid==2){
      this.setData({
        i:1
      })
    }
    if(options.rid==3){
      this.setData({
        i:2
      })
    }
    if(options.rid==4){
      this.setData({
        i:3
      })
    }
    if (options.source) {
      wx.setStorageSync('carte', options)
    }
    if (options.id || options.rid) {
      wx.setStorageSync('menus', options)
    }
    // 调用查询
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
            text: '未处理的签报',
            value: 0
          },
          {
            text: '已处理的签报',
            value: 1
          },
          {
            text: '已超时的签报',
            value: 2
          }
        ],
      })
      util.qgroupdeliver(groupId, this, '', '1')
    }  if (menus.caption == '我申请') {
      this.setData({
        'info.state': '',
        applyT: 1,
        'info.chargemanName': userinfo.UserName,
        top: '我申请的签报'
      })
      util.qgroupdeliver(groupId, this, '', '1')
    } 
      this.seachInfo();
    
    if (app.globalData.CountItem) {
      this.setData({
        sections: app.globalData.getdept,
        firms: app.globalData.Companytitle,
        states: app.globalData.states,
        section1: app.globalData.getstaff
      })
    } else {
      app.DataCallback = employ => {
        if (employ != '') {
          this.setData({
            sections: app.globalData.department,
            firms: app.globalData.Companytitle,
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
    console.log('124133424:'+userinfo.UserName)
    console.log(userName_zy)
    info.UserName = userName_zy;//新添加的，
    this.setData({
      info
    })
    util.qgroupdeliver(groupId, this, '', '1')
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

    info.UserName = userinfo.UserName
    this.setData({
      info
    })
    util.qgroupdeliver(groupId, this)
  },
  // 费用名称
  keywordblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 公司
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
  // 部门
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
    let info = util.editInfo(e, this, e.detail.value.value);
    this.setData({
      show_0: false,
      info,
      departmenttext: e.detail.value.text
    })
  },
  // 所有人
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
})