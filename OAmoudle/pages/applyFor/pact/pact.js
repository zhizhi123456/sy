// pages/pact/pact.js
import {
  queryapplyFor,
  qgroupapplyFor,
} from '../../../../service/getData.js';
var app = getApp();
var util = require("../../../../utils/util");
let userinfo = wx.getStorageSync("myInfo");
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
    InfoList: [],
    Times: [],
    Supplier: [],
    info: {
      createman: '',
      Companytitle: '',
      department: '',
      applynumber: '',
      itemnumber: ""
    },
    top: "申领单",
    section2: "",
    section3: '',
    section4: '',
    section5: "",
    show6: false

  },
  // 返回
  return () {
    let menus = wx.getStorageSync('menus');
    if (menus.title == '我的申请' || menus.title == '我的任务') {
      wx.redirectTo({
        url: "/pages/current/current/current?title=" + menus.title + '&id=' + (menus.id || menus.rid)
      });
    } else {
      util.returnMenu2(menus.id, menus.title);
    }
  },
  setSeach: function (event) {
    let that = this;
    var inputSearch = event.detail.value;
    that.setData({
    seach: inputSearch
    })
  },	
  // 模糊查询
  seachInfo() {
    var info = this.data.info
    info.itemnumber = this.data.seach
    var user = wx.getStorageSync("myInfo");
    info.UserName = user.UserName
    info.state = '所有'
    this.setData({
      info
    })
    util.qgroupdeliver(qgroupapplyFor, this, '', '1')
    // wx.showLoading({
    //   title: '加载中',
    // });
    // queryapplyFor({
    //   itemnumber:this.data.seach
    // }).then(res => {
    //   console.log(res)
    //   if (res.code == 10000) {
    //     let item = res.List;
    //     util.listData(item, app.globalData.department);
    //     util.outflowlist(item, this)
    //     let Times = this.data.Times;
    //     item.forEach(res => {
    //       // console.log(res.makecontactdate)
    //       if (Times.indexOf(res.makecontactdate) == -1) {
    //         Times.push(res.makecontactdate)
    //       }
    //     })
    //     this.setData({
    //       InfoList: item.reverse(),
    //       Times
    //     })
    //     // console.log(this.data.Times)
    //     wx.hideLoading();
    //   }
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(33333)
    console.log(options)
    // this.setData({
    //   status:options.status
    // })
    // if(this.data.status==1){
    //   this.data.info.ApplygetNew=true
    // }else{
    //   this.data.info.ApplygetNew=false
    // }
    userinfo = wx.getStorageSync("myInfo");
    console.log(options)
    if (options.source) {
      wx.setStorageSync('carte', options)
    }
    if (options.id || options.rid) {
      wx.setStorageSync('menus', options)
    }
    this.setData({
      Supplier: app.globalData.Supplier,
      section2: app.globalData.Principal,
      section3: app.globalData.Companytitle,
      section4: app.globalData.getdept,
      section5: app.globalData.MainProject1,
      section6: app.globalData.YesOrNo,
      section7: app.globalData.getstaff,
      states: app.globalData.states
    })
    wx.showLoading({
      title: '加载中',
    });
    // 调用查询
    this.setData({
      seach: ''
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
            text: '未处理的申领单',
            value: 0
          },
          {
            text: '已处理的申领单',
            value: 1
          },
          {
            text: '已超时的申领单',
            value: 2
          }
        ],
      })
      util.qgroupdeliver(qgroupapplyFor, this, '', '1')
    } else if (menus.caption == '我申请') {
      this.setData({
        'info.state': '',
        applyT: 1,
        'info.UserName': userinfo.UserName,
        top: '我申请的申领单'
      })
      util.qgroupdeliver(qgroupapplyFor, this, '', '1')
    }else {
      this.seachInfo()
    }
  },
  changeItem(e) {
    let StateStr = (this.data.pact[e.detail].text).slice(0, 3);
    let info = this.data.info;
    info.state = StateStr;
    this.setData({
      info
    })
    util.qgroupdeliver(qgroupapplyFor, this, '', '1')
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
      departmenttext: e.detail.value.text
    })
  },
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
    let info = util.editInfo(e, this, e.detail.value.text);
    this.setData({
      info,
      show1: false,
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
    // console.log(e)
    let info = util.editInfo(e, this, e.detail.value.value);
    this.setData({
      info,
      show2: false,
      // departmenttext: e.detail.value.text
    })
  },
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
    let info = util.editInfo(e, this, e.detail.value.text);
    this.setData({
      info,
      show3: false,
      // departmenttext: e.detail.value.text
    })
  },
  showPopup4() {
    this.setData({
      show4: true
    });
  },
  onClose4() {
    this.setData({
      show4: false
    });
  },
  onConfirm4(e) {
    let info = util.editInfo(e, this, e.detail.value.text);
    this.setData({
      info,
      show4: false,
      // departmenttext: e.detail.value.text
    })
  },
  showPopup5() {
    this.setData({
      show5: true
    });
  },
  onClose5() {
    this.setData({
      show5: false
    });
  },
  onConfirm5(e) {
    let info = util.editInfo(e, this, e.detail.value.value);
    this.setData({
      info,
      show5: false,
      // departmenttext: e.detail.value.text
    })
  },
  showPopup6() {
    this.setData({
      show6: true
    });
  },
  onClose6() {
    this.setData({
      show6: false
    });
  },
  onConfirm6(e) {
    let info = util.editInfo(e, this, e.detail.value.value);
    this.setData({
      info,
      show6: false,
      // departmenttext: e.detail.value.text
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
    info.UserName = userinfo.UserName
    this.setData({
      info
    })
    util.qgroupdeliver(qgroupapplyFor, this)
  },
})