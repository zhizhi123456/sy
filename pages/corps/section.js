// pages/section/section.js
var app = getApp();
var util = require("../../utils/util");
import {
  qgroupcontractor,
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
    employee:'',
    b:'',
  },
  return () {
    util.returnMenu(1002);
  },
  onChange(e) {
    this.setData({
      info: {}
    })
    let id = this.data.sections[e.detail].value;
    this.setData({
      dep: id,
      deptxt: this.data.sections[e.detail].text
    })
    // //console.log(id)
    qgroupcontractor({
      UserName: id
    }).then(res => {
      //console.log(res)
      var a = JSON.stringify(res.List)
      var b  = JSON.parse(a.replace(/ID/g, 'value').replace(/ConstructionName/g, 'text'));
      this.setData({
        employee: b
      })
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
  onConfirm_o(e) {
    // //console.log(e)
    let info = util.editInfo(e, this, e.detail.value.text);
    this.setData({
      info,
      show_o: false,
      activeKey: e.detail.index,
      dep: e.detail.value.value,
      deptxt: e.detail.value.text
    })
    qgroupcontractor({
      UserName: e.detail.value.value
    }).then(res => {
      let info = this.data.info;
      info.person = '';
      if (res.List) {
        var a = JSON.stringify(res.List)
        var b  = JSON.parse(a.replace(/ID/g, 'value').replace(/ConstructionName/g, 'text'));
      } else {
        var b = []
      }
      this.setData({
        info,
        employee: b
      })
    })
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
    // //console.log(app.globalData.Principal)
    var a = app.globalData.Principal[0].value
    qgroupcontractor({
      UserName: a
    }).then(res => {
      //console.log(res)
      if (res.List) {
        var a = JSON.stringify(res.List)
        var b  = JSON.parse(a.replace(/ID/g, 'value').replace(/ConstructionName/g, 'text'));
        this.setData({
          b
        })
      } else {
       var  b = ''
        this.setData({
          b
        })
      }
    })
    if (app.globalData.CountItem) {
      this.setData({
        sections: app.globalData.Principal,
        employee: this.data.b,
        Companytitle: app.globalData.Companytitle,
        dep: app.globalData.department[0].value,
        deptxt: app.globalData.department[0].text
      })
    } else {
      app.DataCallback = employ => {
        if (employ != '') {
          this.setData({
            sections: app.globalData.Principal,
            employee: this.data.b,
            Companytitle: app.globalData.Companytitle,
            dep: app.globalData.department[0].value,
            deptxt: app.globalData.department[0].text
          })
        }
      }
    }
  },
})