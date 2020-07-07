// pages/pact/pact.js
import {
  qgroupapproval,
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
    info: {},
    top: "支付审批",
    section2: "",
    section3: '',
    section4: '',
    section5: "",
    show6: false,
    applyT: 0,
    leavetypetext: ''

  },
  // 返回
  return () {
    let menus = wx.getStorageSync('menus');
    if (menus.title == '我的申请' || menus.title == '我的任务') {
      wx.redirectTo({
        url: "/pages/current/current/current?title=" + this.data.options.title + '&id=' + (this.data.options.id || this.data.options.rid)
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
    if (this.data.seach) {
      var info = this.data.info
      info.payapproveformname = this.data.seach
      this.setData({
        info
      })
    }

    qgroupapproval(this.data.info).then(res => {
      if (res.code == 10000) {
        console.log(res)
        let item = res.List;
        util.listData(item, app.globalData.department);
        this.setData({
          InfoList: item.reverse()
        })
        wx.hideLoading();
      }
    })

  },
  changeItem(e) {
    console.log(e)
    let StateStr = (this.data.pact[e.detail].text).slice(0, 3);
    let info = this.data.info;
    info = {}
    info.UserName = userinfo.UserName
    info.state = StateStr;
    this.setData({
      info
    })
    this.seachInfo()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    console.log(option)
    if (option.source) {
      wx.setStorageSync('carte', option)
    }
    userinfo = wx.getStorageSync("myInfo");
    if (option.id || option.caption) {
      wx.setStorageSync('menus', option)
    }
    var options = wx.getStorageSync("menus")
    this.setData({
      options,
      Supplier: app.globalData.Supplier,
      section2: app.globalData.Principal,
      section3: app.globalData.Companytitle,
      section4: app.globalData.getdept,
      section5: app.globalData.PayType,
      section6: app.globalData.YesOrNo,
      section7: app.globalData.getstaff,
      states: app.globalData.states,
      section8: app.globalData.MainProject1
    })
    if (options.title == '我的任务') {
      let info = this.data.info;
      info = {}
      info.UserName = userinfo.UserName
      info.state = '未处理'
      this.setData({
        info,
        options,
        ISconduct: 1,
        val: 0,
        pact: [{
            text: '未处理的支付审批',
            value: 0
          },
          {
            text: '已处理的支付审批',
            value: 1
          },
          {
            text: '已超时的支付审批',
            value: 2
          }
        ]
      })
    }
    if (options.title == '我的申请') {
      let info = this.data.info;
      info = {}
      info.createman = userinfo.UserName
      this.setData({
        info,
        options,
        top: '我申请的支付审批',
        applyT: 1
      })
    }
    if (options.title == '支付审批') {
      let info = this.data.info;
      info = {}
      info.UserName = userinfo.UserName,
      info.state = '所有'
      this.setData({
        options,
        info
      })
    }

    wx.showLoading({
      title: '加载中',
    });
    // 调用查询
    this.setData({
      seach: ''
    })
    this.seachInfo()

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
    let info = util.editInfo(e, this, e.detail.value.text);
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
  showPopup7() {
    this.setData({
      show7: true
    });
  },
  onClose7() {
    this.setData({
      show7: false
    });
  },
  onConfirm7(e) {
    let info = util.editInfo(e, this, e.detail.value.value);
    this.setData({
      info,
      show7: false,
      // departmenttext: e.detail.value.text
    })
  },
  change() {
    this.showgroup11()
    this.setData({
      pull: true,
      show: true
    })
   
  },
  onClose() {
    this.setData({
      show: false
    });
    this.showgroup11()
  },
  findnew(e) {
    console.log(e)
    let index = e.currentTarget.dataset.index - 1;
    wx.pageScrollTo({
      selector: '#new' + index,
      duration: 500
    })
  },
  showgroup11() {
    var options = this.data.options
    console.log(options)
    if (options.title == '我的任务') {
      let info = this.data.info;
      info = {}
      info.UserName = userinfo.UserName
      info.state = '未处理'
      this.setData({
        info
      })
    }
    if (options.title == '我的申请') {
      let info = this.data.info;
      info = {}
      info.createman = userinfo.UserName
      this.setData({
        info
      })
    }
    if (options.title == '支付审批') {
      let info = this.data.info;
      info = {}
      info.UserName = userinfo.UserName
      info.state = '所有'
      this.setData({
        info
      })
    }

  },
  // 组合查询
  seachqur() {
    util.qgroupdeliver(qgroupapproval, this, '', '', this.showgroup11)
  },
})