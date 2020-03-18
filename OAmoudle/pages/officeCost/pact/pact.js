// pages/generalcontract/pact/pact.js
import {
  queryofficeCost,
  qgroupofficeCost
} from '../../../../service/getData';
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
    InfoList: [],
    info: {
      chargename: "",
      Companytitle: "",
      department: "",
      usechargeman: "",
      chargetype: '',
      createman: "",
      state: "",
      UserName: "",
      begintime: "",
      endtime: ""
    },
    top:'办公费用',
    sections: '',
    pull: false,
    show: false,
    currentDate: new Date().getTime(),
    currentDate1: new Date().getTime(),
    show_time: false,
    show_endtime: false,
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
  setSeach(e) {
    // //console.log(e)
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
    info.chargename = this.data.seach
    var user = wx.getStorageSync("myInfo");
    info.UserName = user.UserName
    info.state = '所有'
    this.setData({
      info
    })
    util.qgroupdeliver(qgroupofficeCost, this, '', '1')
    // wx.showLoading({
    //   title: '加载中',
    // });
    // queryofficeCost({
    //   chargename: this.data.seach
    // }).then(res => {
    //   // //console.log(res)
    //   if (res.code == 10000) {
    //     let item = res.List;
    //     util.listData(item, app.globalData.department);
    //     util.outflowlist(item, this)
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
    this.setData({
      sections: app.globalData.Companytitle,
      section1: app.globalData.states,
      section2: app.globalData.getdept,
      section5: app.globalData.getstaff,
      section3: app.globalData.costobj,
      section4: app.globalData.costkind,
    })
    if (options.source) {
      wx.setStorageSync('carte', options)
    }
    if (options.id || options.rid) {
      wx.setStorageSync('menus', options)
    }
    wx.showLoading({
      title: '加载中',
    });
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
            text: '未处理的办公费用',
            value: 0
          },
          {
            text: '已处理的办公费用',
            value: 1
          },
          {
            text: '已超时的办公费用',
            value: 2
          }
        ],
      })
      util.qgroupdeliver(qgroupofficeCost, this, '', '1')
    } else if (menus.caption == '我申请') {
      this.setData({
        'info.state': '',
        applyT: 1,
        'info.UserName': userinfo.UserName,
        top: '我申请的办公费用'
      })
      util.qgroupdeliver(qgroupofficeCost, this, '', '1')
    } else {
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
    util.qgroupdeliver(qgroupofficeCost, this, '', '1')
  },
  meetplaceblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
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
  // 部门
  showPopup2() {
    this.setData({
      show2: true
    })
  },
  onClose2() {
    this.setData({
      show2: false
    })
  },
  onConfirm2(e) {
    // //console.log(e)
    let info = util.editInfo(e, this, e.detail.value.text);
    this.setData({
      info,
      show2: false
    })
  },
  // 费用对象
  showPopup3() {
    this.setData({
      show3: true
    })
  },
  onClose3() {
    this.setData({
      show3: false
    })
  },
  onConfirm3(e) {
    // //console.log(e)
    let info = util.editInfo(e, this, e.detail.value.text);
    this.setData({
      info,
      show3: false
    })
  },
  // 费用类型
  showPopup4() {
    this.setData({
      show4: true
    })
  },
  onClose4() {
    this.setData({
      show4: false
    })
  },
  onConfirm4(e) {
    // //console.log(e)
    let info = util.editInfo(e, this, e.detail.value.text);
    this.setData({
      info,
      show4: false
    })
  },
  // 创建人
  showPopup5() {
    this.setData({
      show5: true
    })
  },
  onClose5() {
    this.setData({
      show5: false
    })
  },
  onConfirm5(e) {
    // //console.log(e)
    let info = util.editInfo(e, this, e.detail.value.value);
    this.setData({
      info,
      show5: false
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
  //公司名称
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
    let info = util.editInfo(e, this, e.detail.value.text);
    this.setData({
      info,
      show_o: false,
      // departmenttext: e.detail.value.text
    })
  },
  onConfirm_endtime(e) {
    // //console.log(e)
    // //console.log(util.datefomate(e.detail))
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
    info.UserName = userinfo.UserName
    this.setData({
      info
    })
    util.qgroupdeliver(qgroupofficeCost, this)
  },
})