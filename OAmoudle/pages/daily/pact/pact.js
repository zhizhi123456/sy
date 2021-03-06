// pages/generalcontract/pact/pact.js
import {
  querydaily,
  qgroupdaily,
  department
} from '../../../../service/getData';
var app = getApp();
var util = require("../../../../utils/util");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    seach: '',
    loading: false,
    InfoList: [],
    info: {

    },
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
    util.returnMenu2(2055, "日常办公")
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
    var user = wx.getStorageSync("myInfo");
    if (user) {
      var message = app.globalData.message
      console.log(app.globalData.message)
      let info = this.data.info;
      info.UserName = message.userId
      if (this.data.seach) {
        info.dailylogman = this.data.seach
      }
      this.setData({
        info
      })
    }
    console.log(this.data.info)
    if (app.globalData.message) {
      qgroupdaily(this.data.info).then(res => {
        if (res.code == 10000) {
          console.log(res)
          let item = res.List;
          util.listData(item, app.globalData.department);
          this.setData({
            InfoList: item.reverse(),
            seach: ''
          })
          wx.hideLoading();
        }
      })
    } else {
      wx.hideLoading();
      wx.showToast({
        title: '部门及公司信息获取失败',
        icon: 'none',
        duration: 3000
      })
    }
    this.setData({
      seach: "",
      "info.dailylogman": ""
    })


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      sections: app.globalData.Companytitle,
      section1: app.globalData.states,
      section2: app.globalData.department,
      section5: app.globalData.getstaff,
      section4: app.globalData.Usesealtype,
      section3: app.globalData.getdept,
      section6: app.globalData.MainProject1,
      section7: app.globalData.MainSubproject
    })
    if (options.source) {
      wx.setStorageSync('carte', options)
    }

    wx.showLoading({
      title: '加载中',
    });
    this.setData({
      seach: ""
    })
    this.seachInfo()

    //console.log(this.data.section3)

  },
  meetplaceblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // showPopup1() {
  //   this.setData({
  //     show1: true
  //   })
  // },
  // onClose1() {
  //   this.setData({
  //     show1: false
  //   })
  // },
  // onConfirm1(e) {
  //   //console.log("1")
  //   var s = this.data.section1
  //   var t = s.filter((y) => {
  //     return y.show
  //   })
  //   t = t.map((x) => {
  //     return x.text
  //   })
  //   t = t.join(",")
  //   //console.log(t)
  //   let info = util.editInfo(e, this, t);
  //   this.setData({
  //     info,
  //     show1: false,
  //   })
  // },
  // onChange(event) {
  //   // //console.log(this.data.section4)
  //   //console.log(event)
  //   // //console.log(event.currentTarget.dataset.name)
  //   // //console.log(this.data.section4)
  //   var s = this.data.section1
  //   var y = s.findIndex((r) => {
  //     return r.Value == event.currentTarget.dataset.name
  //   })
  //   // //console.log(y)
  //   s[y].show = !s[y].show
  //   this.setData({
  //     section1: s
  //   })

  // },
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
    let info = util.editInfo(e, this, e.detail.value.value);
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
  // 项目编号
  showPopup6() {
    this.setData({
      show6: true
    })
  },
  onClose6() {
    this.setData({
      show6: false
    })
  },
  onConfirm6(e) {
    // //console.log(e)
    let info = util.editInfo(e, this, e.detail.value.value);
    this.setData({
      info,
      show6: false
    })
  },
  // 
  showPopup7() {
    this.setData({
      show7: true
    })
  },
  onClose7() {
    this.setData({
      show7: false
    })
  },
  onConfirm7(e) {
    // //console.log(e)
    let info = util.editInfo(e, this, e.detail.value.value);
    this.setData({
      info,
      show7: false
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
    var user = wx.getStorageSync("myInfo");
    if (user) {
      var message = app.globalData.message
      console.log(app.globalData.message)
      let info = this.data.info;
      info.UserName = message.userId
      this.setData({
        info
      })
    }
    util.qgroupdeliver(qgroupdaily, this)
  },
})