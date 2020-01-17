// pages/section/section.js
var app = getApp();
var util = require("../../utils/util");
import {
  qgroupcontractor,
  getdep,
  referDeal
} from "../../service/getData";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show_o: false,
    info: {},
    InfoList: [],
    activeKey: 0,
    employee: '',
    b: '',
    title:''
  },
  return () {
    util.returnMenu(1002);
  },
  // 根据用户名得到部门
  updep(id, that) {
    getdep({
      UserName: id
    }).then(res => {
      if (res !== '[]') {
        var s = JSON.parse(res)
        that.setData({
          dep: s[0].ID,
          deptxt: s[0].techofficename
        })
        // console.log(that.data.dep, that.data.deptxt)
      }
    })
    // 根据用户名得到 施工队
    qgroupcontractor({
      UserName: id
    }).then(res => {
      if (res.List) {
        var a = JSON.stringify(res.List)
        var b = JSON.parse(a.replace(/ID/g, 'value').replace(/ConstructionName/g, 'text'));
      } else {
        var b = []
      }
      that.setData({
        employee: b
      })
    })
  },
  onChange(e) {
    let id = this.data.sections[e.detail].value;
    // 用户名
    this.updep(id, this)
    this.setData({
      info: {}
    })
  },
  //部门
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
  // 点击确定
  onConfirm_o(e) {
    let info = util.editInfo(e, this, e.detail.value.text);
    this.setData({
      info,
      show_o: false,
      activeKey: e.detail.index,
    })

    // e.detail.value.value 用户名
    this.updep(e.detail.value.value, this)
  },
  //员工
  showPopup_1() {
    if (!this.data.info.department) {
      wx.showToast({
        title: '请先选择部门经理',
        icon: 'none',
        duration: 2000
      })
      this.setData({
        show_1: false
      });
    } else if (this.data.employee[0]) {
      this.setData({
        show_1: true
      });
    } else {
      wx.showToast({
        title: '无施工队信息',
        icon: 'none',
        duration: 2000
      })
    }
  },
  onClose_1() {
    this.setData({
      show_1: false
    });
  },
  onConfirm_1(e) {
    let info = util.editInfo(e, this, e.detail.value.text);
    this.setData({
      info,
      show_1: false,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var a
    var that = this
    wx.getStorage({
      key: 'myInfo',
      success(res) {
        // console.log(res.data.UserName)
        if (res.data.UserName) {
    
          app.globalData.Principal.forEach(s => {
            if (s.value == res.data.UserName) {
              a = s.value
              var c = []
              c.push(s)
              // console.log(c)
              that.setData({
                sections:c
              })
              that.updep(res.data.UserName, that)
            }
          })
        }
      }
    })

    // 请求数据
  
    // if (app.globalData.CountItem) {
    //   this.setData({
    //     sections: app.globalData.Principal,
    //     Companytitle: app.globalData.Companytitle,
    //   })
    // } else {
    //   app.DataCallback = employ => {
    //     if (employ != '') {
    //       this.setData({
    //         sections: app.globalData.Principal,
    //         Companytitle: app.globalData.Companytitle,
    //       })
    //     }
      // }
    // }
  },
})